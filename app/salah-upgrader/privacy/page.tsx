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
    "Privacy policy for Salah Upgrader by Mahmudul Hossain. Precise location stays on device; Google Analytics for Firebase collects limited analytics and measurement data only.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Salah Upgrader Privacy Policy",
    description: "How Salah Upgrader handles data. Publisher: Mahmudul Hossain.",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Salah Upgrader Privacy Policy",
    description: "How Salah Upgrader handles data. Publisher: Mahmudul Hossain.",
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
                  Salah Upgrader is a free, ad-free prayer-time reminder. It has no ads, no login or
                  account, and no in-app payments. We do not sell personal data.
                </p>

                <h2>2. Data that stays on your device</h2>
                <ul>
                  <li>
                    <strong>Location (approximate or precise):</strong> used only on your phone to
                    calculate prayer times. Your precise location is never sent to us or anyone else
                    (Analytics only infers an approximate country or region from your IP address; see
                    section 3). You can choose a city manually instead.
                  </li>
                  <li>
                    <strong>App data you enter:</strong> prayer status, reminder settings, duas/asks,
                    Tahajjud settings, history and the monthly report card. Stored only on your
                    device.
                  </li>
                  <li>
                    <strong>Alarms and notifications:</strong> prayer alarms and nudge notifications
                    are scheduled and generated locally on your device.
                  </li>
                </ul>

                <h2>3. Analytics (Google Analytics for Firebase)</h2>
                <p>
                  We use Google Analytics for Firebase to understand how the app is used, to improve
                  it, and for measurement (advertising or marketing measurement linked to the
                  advertising ID). The app shows no ads. There is no login. Analytics collects only:
                </p>
                <ul>
                  <li>
                    <strong>App activity:</strong> these events: app opened, reminder shown, reminder
                    action, prayer logged, onboarding completed, monthly report shown. They carry
                    only fixed values (prayer name, status, action). Screen views are also recorded.
                  </li>
                  <li>
                    <strong>App info and diagnostics:</strong> app version, sessions, device model,
                    operating system version and device language.
                  </li>
                  <li>
                    <strong>Approximate location:</strong> country or region, which Google derives
                    from your IP address.
                  </li>
                  <li>
                    <strong>Device or other IDs:</strong> the Firebase app instance ID and your
                    device&apos;s Android advertising ID.
                  </li>
                </ul>
                <p>
                  We <strong>never</strong> send your name, your dua or need text, or your precise
                  location or coordinates. Precise location stays on your device.
                </p>
                <p>
                  This data is encrypted in transit (HTTPS) and is <strong>not sold</strong>. It is
                  not shared with anyone except Google acting as our service provider (processor).
                </p>
                <p>
                  Learn how Google uses this data:{" "}
                  <a
                    href="https://firebase.google.com/support/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    firebase.google.com/support/privacy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policies.google.com/technologies/partner-sites
                  </a>
                  .
                </p>
                <p>
                  <strong>Advertising ID and opt-out:</strong> The app has no in-app analytics
                  opt-out. You can reset or delete your advertising ID, or opt out of ads
                  personalization, in <strong>Android Settings &gt; Google &gt; Ads</strong>. Clearing
                  app data or uninstalling resets the app instance ID.
                </p>

                <h2>4. Data downloaded from our servers</h2>
                <p>
                  The app may download a public list of reminder messages and voice audio from our
                  Firebase project (Cloud Firestore / Storage). This is a read-only download; no
                  personal data is uploaded. Voices are generated in advance by the publisher using
                  ElevenLabs text-to-speech; no user data is sent to ElevenLabs.
                </p>

                <h2>5. Sharing and selling</h2>
                <p>
                  We do not sell personal data and do not share it with advertisers or other third
                  parties. Service provider: Google (Firebase).
                </p>

                <h2>6. Children</h2>
                <p>
                  The app is intended for users aged 13 and over and is not directed to children
                  under 13.
                </p>

                <h2>7. Retention and deletion</h2>
                <p>
                  On-device data is deleted when you clear the app&apos;s data or uninstall the app.
                  For analytics data questions or deletion requests, email{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
                </p>

                <h2>8. Security</h2>
                <p>All network traffic uses HTTPS.</p>

                <h2>9. Changes</h2>
                <p>
                  We will update this page and the last-updated date when our practices change.
                </p>

                <h2>10. Contact</h2>
                <p>
                  Mahmudul Hossain —{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> —{" "}
                  <a href={siteConfig.url}>{siteConfig.url}</a>
                </p>

                <hr />

                <h2>বাংলা সারাংশ</h2>
                <ul>
                  <li>
                    Salah Upgrader একটি ফ্রি, বিজ্ঞাপনমুক্ত নামাজের রিমাইন্ডার। কোনো লগইন বা
                    পেমেন্ট নেই। প্রকাশক: মাহমুদুল হোসাইন।
                  </li>
                  <li>
                    আপনার সঠিক লোকেশন শুধু ফোনেই নামাজের সময় হিসাবে ব্যবহার হয়, কোথাও পাঠানো হয়
                    না।
                  </li>
                  <li>
                    নামাজের হিসাব, দোয়া, মাসিক রিপোর্ট, সেটিংস ও নাজ নোটিফিকেশন সব ফোনেই থাকে।
                  </li>
                  <li>
                    অ্যাপ উন্নত করা ও পরিমাপের জন্য Google Analytics for Firebase ব্যবহার করা হয়।
                    এটি সংগ্রহ করে: অ্যাপ খোলা, রিমাইন্ডার দেখানো, রিমাইন্ডারে অ্যাকশন, নামাজ লগ,
                    অনবোর্ডিং শেষ, মাসিক রিপোর্ট দেখার মতো ইভেন্ট (শুধু নামাজ, স্ট্যাটাস আর
                    অ্যাকশনের নির্দিষ্ট মান), কোন স্ক্রিন দেখা হলো, অ্যাপ ভার্সন ও সেশন, ডিভাইস
                    মডেল, OS ও ভাষা, IP থেকে আনুমানিক দেশ বা অঞ্চল, অ্যাপ ইনস্ট্যান্স আইডি আর Android
                    বিজ্ঞাপন আইডি।
                  </li>
                  <li>
                    আপনার নাম, দোয়ার লেখা বা সঠিক লোকেশন (কোঅর্ডিনেট) কখনো পাঠানো হয় না। সঠিক
                    লোকেশন শুধু ফোনেই থাকে।
                  </li>
                  <li>
                    এসব তথ্য এনক্রিপ্টেড অবস্থায় পাঠানো হয়, বিক্রি হয় না, আর Google (সেবাদাতা) ছাড়া
                    কারো সঙ্গে শেয়ার হয় না। অ্যাপে কোনো বিজ্ঞাপন নেই।
                  </li>
                  <li>
                    অ্যাপের ভেতরে অ্যানালিটিক্স বন্ধের অপশন নেই। বিজ্ঞাপন আইডি রিসেট বা বন্ধ করতে:
                    Android Settings &gt; Google &gt; Ads। বিস্তারিত:{" "}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      policies.google.com/technologies/partner-sites
                    </a>
                    ।
                  </li>
                  <li>
                    অ্যাপ আমাদের সার্ভার থেকে রিমাইন্ডার মেসেজ ও ভয়েস ডাউনলোড করতে পারে; আপনার
                    কোনো তথ্য আপলোড হয় না।
                  </li>
                  <li>১৩ বছর বা তার বেশি বয়সীদের জন্য।</li>
                  <li>
                    অ্যাপ ডেটা মুছতে অ্যাপ আনইনস্টল করুন বা ডেটা ক্লিয়ার করুন। যোগাযোগ:{" "}
                    {siteConfig.email}
                  </li>
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
