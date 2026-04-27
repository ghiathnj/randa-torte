export type CategoryKey =
  | "wedding"
  | "birthday"
  | "cupcakes"
  | "cookies"
  | "cakepops"
  | "other";

export const ALL_CATEGORIES: CategoryKey[] = [
  "wedding",
  "birthday",
  "cupcakes",
  "cookies",
  "cakepops",
  "other",
];

const KEYWORD_MAP: Record<Exclude<CategoryKey, "other">, RegExp[]> = {
  wedding: [
    /\bhochzeit/i,
    /\bbraut/i,
    /\bwedding/i,
    /\bbride/i,
    /حفل\s*زفاف/i,
    /\bعرس/i,
  ],
  birthday: [
    /geburtstag/i,
    /birthday/i,
    /\b\d{1,2}\.?\s*(geburtstag|jahre)/i,
    /عيد\s*ميلاد/i,
  ],
  cupcakes: [/cupcake/i, /muffin/i, /كاب\s*كيك/i],
  cookies: [/cookie/i, /\bkeks/i, /plätzchen/i, /كوكيز/i],
  cakepops: [/cakepop/i, /cake\s*pop/i, /كيك\s*بوب/i],
};

export function categorizePost(caption: string | undefined | null): CategoryKey {
  if (!caption) return "other";
  for (const cat of Object.keys(KEYWORD_MAP) as Array<keyof typeof KEYWORD_MAP>) {
    if (KEYWORD_MAP[cat].some((re) => re.test(caption))) {
      return cat;
    }
  }
  return "other";
}
