import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <main className="page-wrap">
      <div className="mx-auto flex min-h-dvh max-w-200 flex-col items-start justify-center gap-6">
        <Eyebrow>M&T · A LITTLE DETOUR</Eyebrow>
        <h1 className="text-[clamp(48px,8vw,80px)] leading-none tracking-[-2px] text-wine">
          This find is a little
          <br />
          <em>out of the way.</em>
        </h1>
        <p className="max-w-105 text-muted">
          We couldn’t find that page. There are lovely things waiting back at
          the store.
        </p>
        <Link href="/" className={buttonVariants()}>
          Back to the collection →
        </Link>
      </div>
    </main>
  );
}
