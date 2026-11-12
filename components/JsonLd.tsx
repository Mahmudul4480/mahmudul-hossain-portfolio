import { jsonLd } from "@/lib/seo";
import { siteJsonLd } from "@/lib/structured-data";

export default function JsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd()) }} />
  );
}
