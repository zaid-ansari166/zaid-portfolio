import Link from "next/link";
import Button from "@/components/ui/Button";
import { Index, Label } from "@/components/ui/Index";
import { IconArrow } from "@/components/ui/Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <section data-theme="dark" className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))", minHeight: "70vh" }}>
        <div className="container">
          <div className="section-label enter" style={{ "--i": 0 }}>
            <Index>404</Index>
            <Label>Page not found</Label>
          </div>
          <h1 className="h-section mt-8 enter" style={{ "--i": 1 }}>
            That page doesn&apos;t exist — but the work does.
          </h1>
          <p className="lead prose mt-6 enter" style={{ "--i": 2 }}>
            The link may be old or mistyped. Head back to the selected work or get in touch.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 enter" style={{ "--i": 3 }}>
            <Button href="/#work" size="lg" icon={<IconArrow />}>
              Explore my work
            </Button>
            <Link href="/" className="btn btn-secondary btn-lg">
              <span className="btn-label">Back home</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
