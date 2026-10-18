import Link from "next/link";

export default function NotFound() {
  return (
    <section className="legal-page">
      <div className="wrap">
        <h1>404</h1>
        <p>Diese Seite wurde nicht gefunden. · This page could not be found.</p>
        <p>
          <Link className="btn btn-primary" href="/de">Zur Startseite</Link>{" "}
          <Link className="btn btn-ghost" href="/en">Home page</Link>
        </p>
      </div>
    </section>
  );
}
