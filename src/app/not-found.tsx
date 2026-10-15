import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found wrap">
      <p className="eyebrow">M&T · A LITTLE DETOUR</p>
      <h1>
        This find is a little
        <br />
        <em>out of the way.</em>
      </h1>
      <p>
        We couldn’t find that page. There are lovely things waiting back at the
        store.
      </p>
      <Link href="/" className="button button-primary">
        Back to the collection →
      </Link>
    </main>
  );
}
