import type { Service, ServiceFaq, ServiceProcessStep } from "@/data/services";

export const chittagongMeta = {
  title: "Web Developer in Chittagong (Chattogram) | Mahmudul Hossain",
  description:
    "Hire a web developer in Chittagong (Chattogram) for business websites, landing pages, SaaS, ERP and Android apps. Solo full-stack — ask for a quote.",
};

export const chittagongKeywords = [
  "web developer in Chittagong",
  "website developer in Chattogram",
  "web developer Chittagong",
  "website design in Chittagong",
  "custom software development Chittagong",
  "Mahmudul Hossain",
  "মাহমুদুল হোসাইন",
];

export const chittagongProcess: ServiceProcessStep[] = [
  {
    step: "01",
    title: "Tell me the job",
    description:
      "WhatsApp, email, or the quote form. What the business does, who uses it, and what is awkward today.",
  },
  {
    step: "02",
    title: "A written scope",
    description:
      "I reply with what I will build, what I will not, and how we will know it is done. If the fit is wrong, I say so before a deposit.",
  },
  {
    step: "03",
    title: "Build in the open",
    description:
      "You get a link you can click, not a weekly PDF. Web in Next.js and React, data in Supabase or Firebase, Android in Flutter.",
  },
  {
    step: "04",
    title: "Launch, then stay",
    description:
      "Domain, hosting, and a short handover. After that I am still the person you message when something needs to change.",
  },
];

export const chittagongFaqs: ServiceFaq[] = [
  {
    question: "How much does a website cost in Chittagong?",
    answer:
      "It depends on the scope. A business site, a landing page, a school portal, and a rental app are different jobs, so I don't publish a price. WhatsApp me, email hello@mahmudulhossain.com, or use the quote form, and I'll reply with a scope and a quote.",
  },
  {
    question: "Are you a web development company in Chattogram?",
    answer:
      "No. I'm a solo developer. There's no account manager, and nobody else inherits the project after the sale. If you want the person who designs it to also deploy it, that's the arrangement.",
  },
  {
    question: "Can we meet in person in Chittagong?",
    answer:
      "Yes. I live in Chattogram, so a meeting in Agrabad, GEC, Nasirabad, or elsewhere in the city is normal. Clients outside the city use WhatsApp and video.",
  },
  {
    question: "Do you build Android apps as well as websites?",
    answer:
      "Yes. Websites are the usual start. When it should live on a phone, I build the Android app in Flutter and help with the Play Console steps.",
  },
  {
    question: "Do you only take clients inside Chittagong?",
    answer:
      "No. I'm based here, and I also work remotely across Bangladesh and with founders in Europe, the United States, and Canada. Meeting in person is optional.",
  },
  {
    question: "What happens after the site goes live?",
    answer:
      "You get the domain, hosting, and a way to ask for changes. Later fixes and features are scoped when you need them, not bundled into a retainer on day one.",
  },
  {
    lang: "bn",
    question: "চট্টগ্রামে ওয়েবসাইট বানাতে কত টাকা লাগে?",
    answer:
      "সেটা কাজের পরিধির উপর নির্ভর করে। একটি সাধারণ সাইট, একটি ল্যান্ডিং পেজ, আর স্কুল বা ভাড়ার সফটওয়্যার এক জিনিস নয়। এখানে কোনো নির্দিষ্ট দাম লেখা নেই। কী দরকার হোয়াটসঅ্যাপ বা ইমেইলে বলুন, আমি স্কোপ দেখে কোট পাঠাব।",
  },
  {
    lang: "bn",
    question: "আপনি কি চট্টগ্রামে সরাসরি দেখা করতে পারবেন?",
    answer:
      "হ্যাঁ। আমি চট্টগ্রামে থাকি। আগ্রাবাদ, নাসিরাবাদ, জিইসি, হালিশহর, পাঁচলাইশ, খুলশী বা চকবাজার — যেখানে আপনার সুবিধা, সেখানে বসতে পারি। অন্য জেলা বা দেশের বাইরে থেকে হলে দূর থেকেই কাজ হয়।",
  },
];

export const chittagongOfferings: {
  title: string;
  body: string;
  links?: { label: string; href: string }[];
}[] = [
  {
    title: "Business websites",
    body: "A clear site for a company, clinic, school, or shop — fast on a phone, with one obvious way to call or message you.",
  },
  {
    title: "Landing pages",
    body: "When the page exists to collect leads from ads or WhatsApp, I build it on its own instead of sending people to a homepage that tries to say everything.",
    links: [{ label: "Landing page development", href: "/services/landing-page-development" }],
  },
  {
    title: "Website design in Chittagong",
    body: "I set the type, spacing, and the order of the page, then I code it. You don't pay a designer and then pay again for someone to reinterpret the file.",
  },
  {
    title: "Custom software development in Chittagong",
    body: "SaaS, school portals, rental management, and small tools for fees, stock, or staff. Supabase or Firebase, and the data stays in an account you control.",
    links: [
      { label: "School management write-up", href: "/blog/school-management-software" },
      {
        label: "Rental software write-up",
        href: "/blog/rental-property-management-software-for-small-landlords",
      },
    ],
  },
  {
    title: "Android apps with Flutter",
    body: "When it should live on a phone, I build the Android app in Flutter, including signing, closed testing, and a Play listing that matches the app.",
    links: [
      {
        label: "Notes on publishing a Flutter app",
        href: "/blog/publish-flutter-app-google-play-closed-testing",
      },
    ],
  },
  {
    title: "Domain, email, and search",
    body: "A new site still needs a domain, hosting, SSL, and a real inbox. If it should also show up on Google, I can do that in the same codebase.",
    links: [
      { label: "Domain, hosting and email", href: "/services/domain-hosting-business-email" },
      { label: "SEO", href: "/services/seo" },
    ],
  },
];

export const chittagongReasons: { title: string; body: string }[] = [
  {
    title: "We can meet",
    body: "If a whiteboard would save a week of messages, we sit down in Agrabad, GEC, Nasirabad, Khulshi, or somewhere else in the city. I live here.",
  },
  {
    title: "We can speak Bangla",
    body: "Requirements, and the awkward “this isn't what I meant”, can happen in Bangla. English is fine too. Many of my clients are abroad and we work entirely in English.",
  },
  {
    title: "Local businesses, already",
    body: "School fees, bKash, tenant forms for Chattogram and Dhaka, a site for a port-city shipping agency. Those are in products I've already shipped, not a pitch.",
  },
  {
    title: "Same morning as you",
    body: "Bangladesh Standard Time. When a shop in Halishahar opens, I'm in that same morning — not at the start of someone else's workday.",
  },
  {
    title: "Support from the same person",
    body: "Fixes and the next small feature stay with the person who wrote the first version. I don't hand you to someone new next month.",
  },
];

export const chittagongWork: {
  title: string;
  kicker: string;
  body: string;
  image: string;
  imageAlt: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Bariwala Pro",
    kicker: "Rental management",
    body: "A landlord app for buildings, tenants, part-payments, utility bills, and deposits. It's Bangla-first, with English one click away, and it fills the tenant information forms used in Chattogram and Dhaka.",
    image: "/assets/project-bariwala.jpg",
    imageAlt: "Bariwala Pro rental management app, showing the Bangla pricing page",
    links: [
      {
        label: "Read the write-up",
        href: "/blog/rental-property-management-software-for-small-landlords",
      },
      {
        label: "Open the demo",
        href: "https://www.socialmediacaring.com/bariowala",
        external: true,
      },
    ],
  },
  {
    title: "School Management ERP",
    kicker: "Four portals",
    body: "Admin, Teacher, Parent, and Student on Firebase — the system shown on my homepage. The write-up covers admissions, fee invoices, a cash book, and a guardian portal.",
    image: "/assets/school-management-software.png",
    imageAlt:
      "Case study cover for the school management software, with an admissions and fees dashboard",
    links: [
      { label: "How the school system works", href: "/blog/school-management-software" },
      { label: "Project site", href: "https://www.socialmediacaring.com", external: true },
    ],
  },
  {
    title: "Tide Way Shipping OPC",
    kicker: "Chittagong maritime site",
    body: "The public site for a liner and NVOCC agency in Chittagong, with service pages and a freight rate estimator. The case study covers the operations demo behind that kind of work.",
    image: "/assets/project-tideway.jpg",
    imageAlt: "Tide Way Shipping homepage for a maritime agency based in Chittagong",
    links: [
      { label: "Shipping case study", href: "/blog/shipping-management-software-case-study" },
      { label: "tidewayshipping.com", href: "https://www.tidewayshipping.com", external: true },
    ],
  },
];

export const chittagongAreas = [
  "Agrabad",
  "Nasirabad",
  "GEC",
  "Halishahar",
  "Panchlaish",
  "Khulshi",
  "Chawkbazar",
];

export const chittagongPrep = [
  "What the business does, in a few sentences",
  "Who will use it — customers, staff, parents, landlords",
  "The page or process that is painful today",
  "Any site you already have, and one example you like",
  "A deadline, even a rough one",
  "Whether you'd rather meet in Chattogram or work on WhatsApp",
];

export const chittagongBangla = {
  heading: "চট্টগ্রামে ওয়েব ডেভেলপার",
  paragraphs: [
    "চট্টগ্রামে ওয়েব ডেভেলপার খুঁজলে আমি মাহমুদুল হোসাইন। চট্টগ্রামে থাকি, এবং একা কাজ করি। কোনো এজেন্সি নেই, বিক্রির পর প্রজেক্ট অন্য কারো হাতে চলে যায় না।",
    "ব্যবসার ওয়েবসাইট, ল্যান্ডিং পেজ, স্কুল বা ভাড়া ব্যবস্থাপনার সফটওয়্যার, এবং অ্যান্ড্রয়েড অ্যাপ আমি নিজেই বানাই। Next.js, React, Supabase, Firebase ও Flutter দিয়ে। কথা বাংলায় বলতে পারেন, ইংরেজিতেও। সাক্ষাৎ করতে চাইলে চট্টগ্রামে সময় করে নিতে পারি। দাম কাজ দেখে বলি — এই পাতায় নির্দিষ্ট রেট নেই।",
  ],
};

export const webDeveloperChittagong: Service = {
  slug: "web-developer-chittagong",
  name: "Web Developer in Chittagong",
  shortDescription:
    "Solo full-stack developer in Chattogram. Websites, landing pages, SaaS, ERP, and Android apps — you work with me directly.",
  icon: "MapPin",
  eyebrow: "Chattogram · Solo developer",
  heroHeadline: "Web Developer in Chittagong (Chattogram) Who Builds Real Products",
  metaTitle: chittagongMeta.title,
  metaDescription: chittagongMeta.description,
  absoluteTitle: true,
  seoKeywords: chittagongKeywords,
  ctaHref: "/?service=web-developer-chittagong#contact",
  ctaLabel: "Request a quote",
  whatIsIncluded: [
    "Business websites and landing pages in Next.js",
    "Website design coded by the same person who designs it",
    "Custom software: SaaS, school portals, rental management, and small ERP tools",
    "Android apps with Flutter",
    "Domain, hosting, business email, and on-page SEO when the site needs them",
    "A written scope before the build, and the same person after launch",
  ],
  process: chittagongProcess,
  idealFor: [
    "Businesses in Chattogram who want to meet the developer",
    "Schools, landlords, and local companies replacing spreadsheets",
    "Founders elsewhere who still want one engineer, not an agency bench",
  ],
  startingPrice: "Custom quote",
  faqs: chittagongFaqs,
  relatedProjectSlugs: ["bariwala-pro", "school-management-erp", "tideway-shipping"],
};
