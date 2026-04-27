import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="de">
      <body className="bg-cream min-h-screen flex items-center justify-center text-center font-sans">
        <div>
          <div className="text-6xl font-serif text-rose-deep mb-4">404</div>
          <p className="text-charcoal/70 mb-6">
            Diese Seite konnten wir nicht finden.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-rose-deep text-cream"
          >
            Zur Startseite
          </Link>
        </div>
      </body>
    </html>
  );
}
