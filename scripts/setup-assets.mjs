import { mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(root, "assets");

const projects = [
  {
    file: "project-bariwala.jpg",
    url: "https://www.socialmediacaring.com/bariowala",
    label: "Bariwala Pro",
  },
  {
    file: "project-tideway.jpg",
    url: "https://www.tidewayshipping.com",
    label: "Tide Way Shipping",
  },
  {
    file: "project-school.jpg",
    url: "https://www.socialmediacaring.com",
    label: "School Management ERP",
  },
];

async function createLogoMark() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="#090D16"/>
    <text x="50" y="68" font-size="54" font-family="monospace" fill="#5EEAD4" text-anchor="middle">M</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .resize(52, 52)
    .png()
    .toFile(join(assets, "logo-mark.png"));
}

async function createHeadshot() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#121a2c"/>
        <stop offset="55%" stop-color="#0E1424"/>
        <stop offset="100%" stop-color="#161f34"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="35%" r="55%">
        <stop offset="0%" stop-color="#5EEAD4" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#5EEAD4" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="800" height="1000" fill="url(#bg)"/>
    <rect width="800" height="1000" fill="url(#glow)"/>
    <circle cx="400" cy="360" r="150" fill="#161f34" stroke="#232d47" stroke-width="4"/>
    <text x="400" y="395" font-family="Arial, sans-serif" font-size="118" font-weight="700" fill="#5EEAD4" text-anchor="middle">MH</text>
    <text x="400" y="620" font-family="Arial, sans-serif" font-size="34" fill="#8D97AE" text-anchor="middle">Mahmudul Hossain</text>
    <text x="400" y="670" font-family="Arial, sans-serif" font-size="24" fill="#5C6680" text-anchor="middle">Full-Stack Engineer</text>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(join(assets, "headshot.jpg"));
}

async function createFallbackProject(label, file) {
  const safe = label.replace(/&/g, "&amp;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#121a2c"/>
        <stop offset="100%" stop-color="#0E1424"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="600" fill="url(#bg)"/>
    <g opacity="0.35" stroke="#232d47" stroke-width="1">
      ${Array.from({ length: 22 }, (_, i) => `<line x1="${i * 56}" y1="0" x2="${i * 56}" y2="600"/>`).join("")}
      ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 56}" x2="1200" y2="${i * 56}"/>`).join("")}
    </g>
    <rect x="80" y="80" width="1040" height="440" rx="18" fill="#161f34" stroke="#232d47" stroke-width="2"/>
    <text x="600" y="310" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#5EEAD4" text-anchor="middle">${safe}</text>
    <text x="600" y="360" font-family="Arial, sans-serif" font-size="22" fill="#8D97AE" text-anchor="middle">Production SaaS Platform</text>
  </svg>`;

  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(join(assets, file));
}

async function captureScreenshots(browser) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  for (const project of projects) {
    const out = join(assets, project.file);
    try {
      await page.goto(project.url, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: out, type: "jpeg", quality: 82, fullPage: false });
      console.log(`✓ Screenshot: ${project.file}`);
    } catch (err) {
      console.warn(`! Fallback for ${project.file}: ${err.message}`);
      await createFallbackProject(project.label, project.file);
    }
  }

  await page.close();
}

async function main() {
  await mkdir(assets, { recursive: true });
  console.log("Creating logo...");
  await createLogoMark();

  const headshotPath = join(assets, "headshot.jpg");
  try {
    await access(headshotPath, constants.F_OK);
    console.log("Keeping existing headshot.jpg");
  } catch {
    console.log("Creating headshot placeholder...");
    await createHeadshot();
  }

  console.log("Capturing project screenshots...");
  const browser = await chromium.launch({ headless: true });
  try {
    await captureScreenshots(browser);
  } finally {
    await browser.close();
  }

  console.log("Assets ready in ./assets");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
