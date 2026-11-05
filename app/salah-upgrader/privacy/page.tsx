import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Breadcrumb, { breadcrumbJsonLd } from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site";

const pageUrl = `${siteConfig.url}/salah-upgrader/privacy`;
const lastUpdated = "November 5, 2026";
const packageName = "com.mahmudulhossain.salahupgrader";

export const metadata: Metadata = {
  title: "Salah Upgrader Privacy Policy",
  description:
    "Privacy policy for Salah Upgrader by Mahmudul Hossain. Location stays on device; no Firebase, Crashlytics, social features, or donation link in this version.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Salah Upgrader Privacy Policy",
    description:
      "How Salah Upgrader handles data. Most data stays on your device. Publisher: Mahmudul Hossain.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Salah Upgrader Privacy Policy",
    description:
      "How Salah Upgrader handles data. Most data stays on your device. Publisher: Mahmudul Hossain.",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Salah Upgrader", href: "/salah-upgrader" },
  { label: "Privacy Policy" },
];

export default function SalahUpgraderPrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems, siteConfig.url)),
        }}
      />
      <Link href="#main" className="skip-link">
        Skip to content
      </Link>
      <Nav />
      <main id="main">
        <section className="section">
          <div className="wrap" style={{ maxWidth: 820 }}>
            <Breadcrumb items={breadcrumbItems} />
            <Reveal>
              <p className="eyebrow">Salah Upgrader</p>
              <h1>Privacy Policy</h1>
              <p className="services-hero-lede" style={{ marginTop: 12 }}>
                App package <code className="mono">{packageName}</code>
                <br />
                Publisher / Developer: Mahmudul Hossain
                <br />
                Last updated: {lastUpdated}
              </p>
            </Reveal>

            <div style={{ marginTop: 36 }}>
            <Reveal className="blog-prose">
              <h2>1. Summary</h2>
              <p>
                Salah Upgrader is a free, ad-free prayer-time reminder. It has no ads, no account
                sign-up for users, and does not sell personal data. Most data stays on your device.
              </p>

              <h2>2. Data processed on your device</h2>
              <ul>
                <li>
                  <strong>Location (approximate or precise):</strong> used only on your phone to
                  calculate prayer times for where you are. You can choose a city manually instead.
                  Location is not uploaded to any server.
                </li>
                <li>
                  <strong>App data you enter:</strong> prayer status, reminder settings, duas/needs
                  (&quot;asks&quot;), wishes, Tahajjud settings, history and reports. Stored locally
                  (on-device database / app preferences; some items encrypted on device).
                </li>
                <li>
                  <strong>Notifications and alarms:</strong> scheduled locally on your device.
                </li>
              </ul>

              <h2>3. Permissions</h2>
              <p>
                The app does <strong>not</strong> use the <code>SYSTEM_ALERT_WINDOW</code> (draw
                over other apps) permission.
              </p>

              <h2>4. Crash reporting</h2>
              <p>
                The app does <strong>not</strong> use Firebase Crashlytics or other crash-reporting
                SDKs.
              </p>

              <h2>5. Online services and social features</h2>
              <p>
                This version of the app does <strong>not</strong> use Firebase, does{" "}
                <strong>not</strong> include social features (such as circle/mosque or gentle
                nudge), and does <strong>not</strong> upload personal data to the publisher&apos;s
                servers.
              </p>

              <h2>6. Donations</h2>
              <p>
                This version of the app does <strong>not</strong> include a donation link or in-app
                donations.
              </p>

              <h2>7. Sharing and selling</h2>
              <p>We do not sell personal data. We do not share data with advertisers.</p>

              <h2>8. Children</h2>
              <p>
                The app is intended for users aged 13 and over. It is not directed to children under
                13.
              </p>

              <h2>9. Retention and deletion</h2>
              <p>
                On-device data is deleted when you clear the app&apos;s data or uninstall it.
              </p>

              <h2>10. Security</h2>
              <p>
                Sensitive on-device items use Android secure storage / encryption where applicable.
              </p>

              <h2>11. Changes</h2>
              <p>
                We will update this page and the last-updated date when practices change.
              </p>

              <h2>12. Contact</h2>
              <p>
                Mahmudul Hossain —{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> —{" "}
                <a href={siteConfig.url}>{siteConfig.url}</a>
              </p>

              <hr />

              <h2>বাংলা সারাংশ</h2>
              <ul>
                <li>
                  Salah Upgrader একটি ফ্রি, বিজ্ঞাপনমুক্ত নামাজের সময়ের রিমাইন্ডার। প্রকাশক:
                  মাহমুদুল হোসাইন।
                </li>
                <li>
                  আপনার লোকেশন শুধু ফোনেই নামাজের সময় হিসাবের জন্য ব্যবহার হয়, কোনো সার্ভারে
                  পাঠানো হয় না।
                </li>
                <li>নামাজের হিসাব, দোয়া, সেটিংস সব আপনার ফোনেই থাকে।</li>
                <li>
                  এই ভার্সনে Firebase, Crashlytics, সোশ্যাল ফিচার বা ডোনেশন লিংক নেই।{" "}
                  <code>SYSTEM_ALERT_WINDOW</code> পারমিশনও নেই।
                </li>
                <li>আমরা কোনো তথ্য বিক্রি করি না, বিজ্ঞাপনদাতাকে দিই না।</li>
                <li>১৩ বছর বা তার বেশি বয়সীদের জন্য।</li>
                <li>যোগাযোগ: {siteConfig.email}</li>
              </ul>

              <p style={{ marginTop: 32 }}>
                <Link href="/salah-upgrader">← Back to Salah Upgrader</Link>
              </p>
            </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
