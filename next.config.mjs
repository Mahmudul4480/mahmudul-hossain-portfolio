/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/blog/multi-tenant-rls-postgresql",
        destination: "/blog/why-row-level-security-multi-tenant",
        permanent: true,
      },
      {
        source: "/blog/nextjs-landing-pages-that-convert",
        destination: "/blog/nextjs-app-router-vs-pages-router-production",
        permanent: true,
      },
      {
        source: "/blog/seo-for-saas-founders",
        destination: "/blog/questions-before-hiring-full-stack-freelancer",
        permanent: true,
      },
      {
        source: "/blog/ai-native-workflow-without-corner-cutting",
        destination: "/blog/nextjs-app-router-vs-pages-router-production",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
