/**
 * Family Bond Australia Content Seed Script
 * 
 * This script:
 * 1. Backs up current Redis content to a local JSON file
 * 2. Seeds Redis with the new Family Bond Australia content
 * 
 * Usage: node scripts/seed-content.mjs
 * 
 * Requires environment variables:
 * - KV_REST_API_URL
 * - KV_REST_API_TOKEN
 */

import { Redis } from '@upstash/redis';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Content keys
const CONTENT_KEYS = {
  hero: "content:hero",
  features: "content:features",
  process: "content:process",
  pricing: "content:pricing",
  serviceAreas: "content:serviceAreas",
  about: "content:about",
  contact: "content:contact",
  footer: "content:footer",
  siteSettings: "content:siteSettings",
  services: "content:services",
};

// New Family Bond Australia content
const newContent = {
  hero: {
    heading: "Building Safe Bridges for",
    headingHighlight: "Growing Hearts",
    subheading: "Thoughtfully delivered Child Contact Services across Melbourne.",
    badge1: "Weekday & Weekend Availability",
    badge2: "Metropolitan Melbourne",
    imageUrl: "/children-central-how-to-nurture-your-parent-child-relationship.jpg",
    imageAlt: "Happy family spending quality time together",
    ctaButtonText: "Get in Touch",
    ctaButtonHref: "#contact",
  },
  features: {
    sectionTitle: "What We Offer",
    features: [
      {
        icon: "Shield",
        title: "Supported Contact (Supervised Visits)",
        description: "A trained supervisor is present throughout visits to ensure they run smoothly while allowing natural interaction.",
      },
      {
        icon: "Users",
        title: "Structured Changeovers",
        description: "Supervised handovers where direct contact isn't appropriate, managed calmly and efficiently.",
      },
      {
        icon: "Heart",
        title: "Virtual Support",
        description: "Online supervision for families where in-person services aren't suitable.",
      },
      {
        icon: "FileText",
        title: "Observation & Documentation",
        description: "Clear, factual observation records prepared after each service.",
      },
    ],
    highlights: [
      { icon: "CheckCircle", text: "A calm, modern approach to supervision" },
      { icon: "Users", text: "Skilled supervisors who put people at ease" },
      { icon: "MapPin", text: "Flexible, mobile services across Melbourne" },
      { icon: "CheckCircle", text: "Clear communication and dependable follow-through" },
      { icon: "Heart", text: "A service that feels organised without feeling cold" },
    ],
    bestPracticeHeading: "Our Approach",
    bestPracticeParagraph1: "We take a considered, modern approach to Child Contact Services. That means thoughtful planning, clear communication, and supervisors who know how to read a room — not just follow a checklist.",
    bestPracticeParagraph2: "Our supervisors are highly trained, calm, and personable. They know how to support families without making children or parents feel uneasy. Supervision is present when needed, subtle when possible, and always focused on helping time together feel natural rather than staged. This balance is what sets our service apart.",
    ctaButtonText: "View all of our Services",
    ctaButtonHref: "/services",
  },
  process: {
    sectionTitle: "How It Works",
    sectionSubtitle: "A clear, structured approach to delivering quality Child Contact Services",
    steps: [
      {
        number: "01",
        title: "Intake & Review",
        timeframe: "Initial consultation",
        subtitle: "Understanding Your Situation",
        content: "We take time to understand the arrangements, court orders, and individual circumstances.",
      },
      {
        number: "02",
        title: "Planning & Setup",
        timeframe: "Service preparation",
        subtitle: "Scheduling & Coordination",
        content: "Services are scheduled thoughtfully, with locations and supervision needs agreed in advance.",
      },
      {
        number: "03",
        title: "Service Delivery",
        timeframe: "Supervised sessions",
        subtitle: "Professional Support",
        content: "Contact or changeovers take place with a trained supervisor present.",
      },
      {
        number: "04",
        title: "Ongoing Support & Reporting",
        timeframe: "Documentation",
        subtitle: "Continuous Care",
        content: "Documentation is completed and services continue as required.",
      },
    ],
  },
  about: {
    sectionLabel: "About Us",
    heading: "Family Bond Australia exists to bring structure, ease, and reassurance to families navigating separation.",
    paragraph1: "We approach each matter with care and clarity, understanding how important it is for children to feel settled and for parents to feel confident in the process. Our work is guided by recognised industry principles and Attorney-General guidelines, and shaped by real-world experience working alongside families, children, and family law professionals. Every service is delivered with consistency, discretion, and attention to detail.",
    paragraph2: "We are Melbourne-based and operate as a fully mobile service, offering weekday and weekend availability across metropolitan areas. Our flexible model allows us to meet families in environments that feel familiar, appropriate, and comfortable for children.",
    features: [
      "Guided by industry principles & Attorney-General guidelines",
      "Fully mobile service across Melbourne",
      "Weekday & weekend availability",
    ],
    imageUrl: "/children-central-how-to-nurture-your-parent-child-relationship.jpg",
    imageAlt: "Family spending quality time together",
  },
  serviceAreas: {
    sectionTitle: "Service Areas",
    sectionSubtitle: "Family Bond Australia operates across metropolitan Melbourne as a mobile service. We meet families in agreed public locations that suit the child and the arrangement — removing the need for centre-based visits and helping services feel more natural.",
    helperText: "View full list of Council service areas below:",
    areas: [
      {
        region: "Metropolitan South",
        councils: [
          { name: "City of Kingston", example: "e.g. Cheltenham" },
          { name: "City of Greater Dandenong", example: null },
          { name: "City of Frankston", example: null },
          { name: "City of Casey", example: "e.g. Narre Warren" },
          { name: "Shire of Mornington Peninsula", example: "e.g. Rosebud" },
        ],
      },
      {
        region: "Inner Metropolitan South East",
        councils: [
          { name: "City of Bayside", example: "e.g. Sandringham" },
          { name: "City of Boroondara", example: "e.g. Camberwell" },
          { name: "City of Glen Eira", example: "e.g. Caulfield North" },
          { name: "City of Melbourne", example: null },
          { name: "City of Port Phillip", example: "e.g. St Kilda" },
          { name: "City of Stonnington", example: "e.g. Malvern" },
          { name: "City of Yarra", example: "e.g. Richmond" },
        ],
      },
      {
        region: "Metropolitan West",
        councils: [
          { name: "City of Brimbank", example: "e.g. Sunshine" },
          { name: "City of Hobsons Bay", example: "e.g. Altona" },
          { name: "City of Melton", example: null },
          { name: "City of Moonee Valley", example: "e.g. Moonee Ponds" },
          { name: "City of Maribyrnong", example: "e.g. Footscray" },
          { name: "City of Wyndham", example: "e.g. Werribee" },
        ],
      },
      {
        region: "Metropolitan North",
        councils: [
          { name: "City of Banyule", example: "e.g. Greensborough" },
          { name: "City of Darebin", example: "e.g. Preston" },
          { name: "City of Hume", example: "e.g. Broadmeadows" },
          { name: "City of Merri-bek", example: "e.g. Coburg" },
          { name: "Shire of Nillumbik", example: "e.g. Eltham" },
          { name: "City of Whittlesea", example: "e.g. South Morang" },
        ],
      },
      {
        region: "Metropolitan East",
        councils: [
          { name: "City of Knox", example: "e.g. Wantirna South" },
          { name: "City of Manningham", example: "e.g. Doncaster" },
          { name: "City of Maroondah", example: "e.g. Ringwood" },
          { name: "City of Monash", example: "e.g. Glen Waverley" },
          { name: "City of Whitehorse", example: "e.g. Nunawading" },
          { name: "Shire of Yarra Ranges", example: "e.g. Lilydale" },
        ],
      },
    ],
  },
  contact: {
    sectionTitle: "Contact Us",
    sectionSubtitle: "If you're looking for a composed, capable Child Contact Service that does things thoughtfully, we're here to help. Get in touch to discuss next steps or begin the intake process.",
    enquiryOptions: [
      { value: "supervision", label: "I want to proceed with Child Contact Services" },
      { value: "availability", label: "I want to learn about current availability" },
      { value: "questions", label: "I have some questions about your services" },
      { value: "employment", label: "I am interested in employment" },
      { value: "solicitor", label: "I am a family law solicitor" },
    ],
    successHeading: "Thank you for your enquiry!",
    successMessage: "We will respond within 24 hours. If you have any urgent questions, please call us at",
    phoneNumber: "0493 429 730",
  },
  footer: {
    tagline: "Thoughtfully delivered Child Contact Services across Melbourne. Building safe bridges for growing hearts.",
    getInTouchTitle: "Get In Touch",
    quickLinksTitle: "Quick Links",
    contactTitle: "Contact",
    phone: "0493 429 730",
    email: "contact@familyfathers.com.au",
    copyrightText: "Family Bond Australia",
    navLinks: [
      { href: "#about", label: "About Us" },
      { href: "/services", label: "Our Services" },
      { href: "#process", label: "How It Works" },
      { href: "#pricing", label: "Fees" },
      { href: "#contact", label: "Contact Us" },
    ],
  },
  siteSettings: {
    siteName: "Family Bond Australia",
    siteDescription: "Thoughtfully delivered Child Contact Services across Melbourne",
    phone: "0493 429 730",
    email: "contact@familyfathers.com.au",
  },
  services: {
    pageTitle: "What We Offer",
    pageSubtitle: "Thoughtfully delivered Child Contact Services across Melbourne",
    services: [
      {
        title: "Supported Contact (Supervised Visits)",
        shortDescription: "A trained supervisor is present throughout visits to ensure they run smoothly while allowing natural interaction.",
        fullDescription: "Supported contact involves a trained supervisor remaining present throughout a parent's time with their child. The role of the supervisor is to ensure the visit runs smoothly while allowing space for genuine interaction. Our supervisors are warm, approachable, and experienced in creating relaxed environments. Their presence is designed to provide reassurance - not interruption - so parents and children can focus on being together.",
      },
      {
        title: "Structured Changeovers",
        shortDescription: "Supervised handovers where direct contact isn't appropriate, managed calmly and efficiently.",
        fullDescription: "Structured changeovers are available where direct handovers are not appropriate. This service removes the need for parents to interact and ensures transitions are handled calmly and efficiently. The supervisor manages timing, communication, and the exchange itself, helping children move between parents in a predictable and supported way.",
      },
      {
        title: "Virtual Support",
        shortDescription: "Online supervision for families where in-person services aren't suitable.",
        fullDescription: "Virtual supervision offers an alternative where in-person services aren't suitable. Sessions are conducted online with oversight provided throughout, ensuring continuity of contact while maintaining independent supervision.",
      },
      {
        title: "Observation & Documentation",
        shortDescription: "Clear, factual observation records prepared after each service.",
        fullDescription: "Following each service, a clear and factual observation record is prepared. These summaries can be shared with legal representatives or used to support ongoing arrangements. Reports are objective, well-structured, and written with care.",
      },
    ],
    feeSectionTitle: "Fees",
    feeSectionSubtitle: "Transparent pricing for all our services",
    feePlans: [
      {
        title: "Supervised Contact (Supported Visits)",
        price: "$250",
        description: "per 2 hour session",
      },
      {
        title: "Structured Changeovers",
        price: "$125",
        description: "per changeover",
      },
      {
        title: "Virtual Supervision",
        price: "$125",
        description: "per session",
      },
      {
        title: "Observation & Documentation",
        price: "Included",
        description: "with each service",
      },
    ],
    travelTitle: "Travel",
    travelText: "Travel is charged separately based on location and distance and will be confirmed prior to service delivery.",
    additionalServicesTitle: "Additional Services",
    additionalServicesText: "These services are quoted individually, based on the scope and time involved.",
    additionalServicesList: [
      "Home safety checks",
      "Affidavits",
      "Subpoena responses",
      "Court appearances",
    ],
    paymentTitle: "Payment & Invoicing",
    paymentText: "Invoices are issued in line with scheduled services and must be finalised prior to service delivery, unless otherwise agreed. We aim to keep payment processes straightforward and consistent. If you have questions about fees or would like a tailored estimate, we're happy to talk things through as part of the intake process.",
  },
};

async function main() {
  console.log('🚀 Family Bond Australia Content Seed Script\n');

  // Check for environment variables
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.error('❌ Error: Missing environment variables KV_REST_API_URL and/or KV_REST_API_TOKEN');
    console.log('   Please ensure these are set before running the script.');
    process.exit(1);
  }

  // Step 1: Backup current content
  console.log('📦 Step 1: Backing up current Redis content...');
  
  const backup = {};
  for (const [key, redisKey] of Object.entries(CONTENT_KEYS)) {
    try {
      const data = await redis.get(redisKey);
      backup[key] = data;
      console.log(`   ✓ Backed up ${key}`);
    } catch (error) {
      console.log(`   ⚠ No existing content for ${key}`);
      backup[key] = null;
    }
  }

  // Write backup to file
  const backupDir = join(__dirname, '../backups');
  if (!existsSync(backupDir)) {
    mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = join(backupDir, `content-backup-${timestamp}.json`);
  writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  console.log(`   📁 Backup saved to: ${backupPath}\n`);

  // Step 2: Seed new content
  console.log('🌱 Step 2: Seeding new Family Bond Australia content...');
  
  for (const [key, content] of Object.entries(newContent)) {
    const redisKey = CONTENT_KEYS[key];
    if (!redisKey) {
      console.log(`   ⚠ Skipping unknown key: ${key}`);
      continue;
    }
    
    try {
      await redis.set(redisKey, content);
      console.log(`   ✓ Seeded ${key}`);
    } catch (error) {
      console.error(`   ❌ Failed to seed ${key}:`, error.message);
    }
  }

  console.log('\n✅ Content seeding complete!');
  console.log('   The website now displays Family Bond Australia content.');
  console.log(`   Backup available at: ${backupPath}`);
}

main().catch(console.error);
