import { promises as fs } from "node:fs";
import path from "node:path";
import { categorizePost, type CategoryKey } from "./categories";

export interface InstagramPost {
  id: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  category: CategoryKey;
}

interface RawMedia {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

const GRAPH_ENDPOINT = "https://graph.instagram.com/me/media";
const FIELDS = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
const REVALIDATE_SECONDS = 1800;
const CACHE_FILE = path.join(process.cwd(), "data", "instagram-cache.json");
const EXCLUDED_FILE = path.join(process.cwd(), "data", "excluded-posts.json");
const MOCK_FILE = path.join(process.cwd(), "data", "mock-instagram.json");

async function readJsonSafe<T>(file: string): Promise<T | null> {
  try {
    const text = await fs.readFile(file, "utf8");
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function loadExcludedIds(): Promise<Set<string>> {
  const data = await readJsonSafe<{ ids: string[] }>(EXCLUDED_FILE);
  return new Set(data?.ids ?? []);
}

function mapToPost(raw: RawMedia): InstagramPost {
  return {
    id: raw.id,
    mediaType: (raw.media_type as InstagramPost["mediaType"]) ?? "IMAGE",
    mediaUrl: raw.media_url,
    thumbnailUrl: raw.thumbnail_url,
    permalink: raw.permalink,
    caption: raw.caption,
    timestamp: raw.timestamp,
    category: categorizePost(raw.caption),
  };
}

async function fetchFromGraphApi(): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const url = `${GRAPH_ENDPOINT}?fields=${FIELDS}&limit=50&access_token=${encodeURIComponent(
    token,
  )}`;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.warn(`[instagram] Graph API responded ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { data?: RawMedia[] };
    if (!json.data) return null;
    const posts = json.data.map(mapToPost);

    // Best-effort cache write
    fs.mkdir(path.dirname(CACHE_FILE), { recursive: true })
      .then(() =>
        fs.writeFile(
          CACHE_FILE,
          JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2),
          "utf8",
        ),
      )
      .catch(() => {});

    return posts;
  } catch (err) {
    console.warn("[instagram] Graph API fetch failed:", err);
    return null;
  }
}

async function loadCache(): Promise<InstagramPost[] | null> {
  const data = await readJsonSafe<{ posts: InstagramPost[] }>(CACHE_FILE);
  return data?.posts ?? null;
}

async function loadMock(): Promise<InstagramPost[]> {
  const data = await readJsonSafe<{ posts: InstagramPost[] }>(MOCK_FILE);
  return data?.posts ?? [];
}

export interface GalleryPayload {
  posts: InstagramPost[];
  source: "live" | "cache" | "mock";
}

export async function getInstagramPosts(): Promise<GalleryPayload> {
  const excluded = await loadExcludedIds();

  const live = await fetchFromGraphApi();
  if (live && live.length > 0) {
    return {
      posts: live.filter((p) => !excluded.has(p.id)),
      source: "live",
    };
  }

  const cached = await loadCache();
  if (cached && cached.length > 0) {
    return {
      posts: cached.filter((p) => !excluded.has(p.id)),
      source: "cache",
    };
  }

  const mock = await loadMock();
  return {
    posts: mock.filter((p) => !excluded.has(p.id)),
    source: "mock",
  };
}

export async function getFeaturedPosts(limit = 6): Promise<GalleryPayload> {
  const all = await getInstagramPosts();
  return { ...all, posts: all.posts.slice(0, limit) };
}
