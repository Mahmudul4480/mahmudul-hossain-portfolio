import Image from "next/image";
import Link from "next/link";

export default function HomeUrgent() {
  return (
    <section className="h-urgent" id="php2shell" data-tone="dark" aria-labelledby="h-urgent-title">
      <div className="h-urgent-inner">
        <div className="h-urgent-text">
        <p className="h-urgent-tag">
          <span className="h-urgent-dot" aria-hidden="true" /> Security advisory · 21 Oct 2026
        </p>
        <h2 id="h-urgent-title" className="h-urgent-title">
          PHP2Shell emergency patch &amp; security audit
        </h2>
        <p className="h-urgent-copy">
          CVE-2026-109618 and CVE-2026-109619 allow unauthenticated remote code execution in PHP
          itself. WordPress or plugin updates don&apos;t fix it. I upgrade PHP to a patched release,
          check your site for compromise and harden it, for WordPress, WooCommerce, Laravel and
          custom PHP sites in the US, UK, EU and Canada.
        </p>
        <div className="h-urgent-ctas">
          <Link href="/services/php2shell-emergency-patch" className="btn h-urgent-btn">
            See the PHP2Shell service
          </Link>
          <Link href="/?service=php2shell-emergency-patch#contact" className="h-urgent-link">
            Get help now →
          </Link>
        </div>
        </div>
        <div className="h-urgent-portrait">
          <span className="h-urgent-glow" aria-hidden="true" />
          <Image
            src="/assets/mahmudul-security.webp"
            alt="Mahmudul Hossain, PHP security engineer"
            width={800}
            height={880}
            sizes="(max-width: 860px) 220px, 380px"
          />
          <span className="h-urgent-chip">I patch it myself, no outsourcing</span>
        </div>
      </div>
    </section>
  );
}
