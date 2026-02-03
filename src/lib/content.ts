import { redis, CONTENT_KEYS, ContentKey } from "./redis";

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface HeroContent {
  heading: string;
  headingHighlight: string;
  subheading: string;
  badge1: string;
  badge2: string;
  imageUrl: string;
  imageAlt: string;
}

export interface FeatureItem {
  icon: string; // Icon name from lucide-react
  title: string;
  description: string;
}

export interface HighlightItem {
  icon: string;
  text: string;
}

export interface FeaturesContent {
  sectionTitle: string;
  features: FeatureItem[];
  highlights: HighlightItem[];
  bestPracticeHeading: string;
  bestPracticeParagraph1: string;
  bestPracticeParagraph2: string;
  ctaButtonText: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  timeframe: string;
  subtitle: string;
  content: string;
}

export interface ProcessContent {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: ProcessStep[];
}

export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  highlight: boolean;
}

export interface PricingContent {
  sectionTitle: string;
  sectionSubtitle: string;
  plans: PricingPlan[];
  additionalInfoTitle: string;
  additionalInfoText: string;
  ctaHeading: string;
  ctaButtonText: string;
  priceSuffix: string;
}

export interface Council {
  name: string;
  example: string | null;
}

export interface ServiceArea {
  region: string;
  councils: Council[];
}

export interface ServiceAreasContent {
  sectionTitle: string;
  sectionSubtitle: string;
  helperText: string;
  areas: ServiceArea[];
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface EnquiryOption {
  value: string;
  label: string;
}

export interface ContactContent {
  sectionTitle: string;
  sectionSubtitle: string;
  enquiryOptions: EnquiryOption[];
  successHeading: string;
  successMessage: string;
  phoneNumber: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterContent {
  tagline: string;
  getInTouchTitle: string;
  quickLinksTitle: string;
  contactTitle: string;
  phone: string;
  email: string;
  copyrightText: string;
  navLinks: NavLink[];
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
}

export interface ResourceDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface ResourcesContent {
  sectionTitle: string;
  sectionSubtitle: string;
  documents: ResourceDocument[];
}

// ============================================
// DEFAULT VALUES (Fallbacks)
// ============================================

export const defaultHeroContent: HeroContent = {
  heading: "Specialists in child-centred supervision to support",
  headingHighlight: "your family",
  subheading: "At Family Fathers, we provide innovative, specialised child contact services for family law matters. Our professional and caring supervisors facilitate court ordered time arrangements between parents and children for your peace of mind.",
  badge1: "Weekday & Weekend Visits",
  badge2: "Metropolitan Melbourne",
  imageUrl: "/hero-family.jpg",
  imageAlt: "Family playing together outdoors in the sunshine",
};

export const defaultFeaturesContent: FeaturesContent = {
  sectionTitle: "We Provide",
  features: [
    {
      icon: "Shield",
      title: "Safe environment for children",
      description: "to develop important relationships",
    },
    {
      icon: "Users",
      title: "Access for children",
      description: "to spend time with their non-custodial parent",
    },
    {
      icon: "Heart",
      title: "Peace of mind",
      description: "for custodial parents during family law supervised visits",
    },
    {
      icon: "FileText",
      title: "Upholding federal court orders",
      description: "and providing necessary documentation",
    },
  ],
  highlights: [
    { icon: "Scale", text: "Experience in family law court orders" },
    { icon: "Brain", text: "Trauma-informed care and practice" },
    { icon: "AlertTriangle", text: "Contingency plans for family violence" },
  ],
  bestPracticeHeading: "We operate within industry best-practice standards to provide better support and professional service.",
  bestPracticeParagraph1: "We operate within industry best-practice standards to provide better support and professional service from your initial intake until your final report. As specialist providers in family law supervision, our services are specifically tailored to families in the midst of family law litigation.",
  bestPracticeParagraph2: "Our supervised services are conducted as a mobile outreach service at locations across Melbourne including parks, play centres, and shopping centres. We believe that family is important, and we provide a safe and secure platform for parents and children to spend time together during court ordered visitations.",
  ctaButtonText: "Get in touch",
};

export const defaultProcessContent: ProcessContent = {
  sectionTitle: "Our Process",
  sectionSubtitle: "We follow a streamlined process to minimise your stress",
  steps: [
    {
      number: "01",
      title: "Contact Family Fathers",
      timeframe: "Within 24 hours",
      subtitle: "Understand Your Options",
      content: `Send in your enquiry and we will respond within 24 hours. We understand that your child is your life, and we are here to talk through your concerns and gain an understanding of your unique situation.

We can answer questions such as whether supervision is available in your area and when time can commence. In the event that no services are immediately available, we may place you on our waitlist.`,
    },
    {
      number: "02",
      title: "Intake Assessment",
      timeframe: "Within 7 days",
      subtitle: "Intake Assessments Scheduled",
      content: `Once your matter has been allocated to a suitable supervisor, both parents are required to undertake an initial assessment to determine the specific requirements of your situation and any interventions required to ensure reliable service provision.

The appointed supervisor will proceed to develop a plan as to how supervised time will proceed based on the best interests of the child, the preferences of the parents, and any court ordered requirements. Intakes can progress more quickly if both parties pay the relevant fees and have the relevant availability.`,
    },
    {
      number: "03",
      title: "Supervised Visits",
      timeframe: "Within 14 days",
      subtitle: "Supervised Visit Scheduled",
      content: `Once your matter has been deemed suitable for supervised contact to proceed, the appointed supervisor will schedule supervised time with the non-resident parent and the child to proceed.

Based on the information provided during the initial assessment, an appropriate plan will be developed with relevant interventions required depending on your unique situation and the particular needs of your child. Supervised visits will be directed at the discretion of the supervisor and can be provided on an ongoing basis if required.`,
    },
    {
      number: "04",
      title: "Observation Report",
      timeframe: "Within 7 days",
      subtitle: "Observation Report Prepared",
      content: `These reports provide the Court with detailed observations on your child, interactions with both parents, and any areas of concern identified by the contact supervisor during your engagement with Family Fathers. We understand that an observation report can make or break your case, and we do not charge any extra fees for a formal observation report to be provided if this is required by the Federal Circuit and Family Court of Australia.

We request that you provide the request for an Observational Report more than 7 days before you need the document. This report will be provided on a template affidavit for your solicitor to sign directly as a witness with your appointed supervisor.`,
    },
  ],
};

export const defaultPricingContent: PricingContent = {
  sectionTitle: "Our Professional Fees",
  sectionSubtitle: "Industry best-practice assistance with simple fixed fee services for you and your child",
  plans: [
    {
      title: "Intake Assessment",
      price: "$250",
      description: "Fixed fee per parent",
      highlight: false,
    },
    {
      title: "Weekday Supervision",
      price: "$250",
      description: "Fixed fee per 120 minute session",
      highlight: false,
    },
    {
      title: "Weekend Supervision",
      price: "$250",
      description: "Fixed fee per 120 minute session",
      highlight: false,
    },
    {
      title: "Additional Supervision",
      price: "$125",
      description: "Fixed fee per hour of additional supervision",
      highlight: false,
    },
  ],
  additionalInfoTitle: "Supervised Observation Reports",
  additionalInfoText: "Available upon request ($75 per session) with a minimum of four session reports ($300 minimum fee) for family law proceedings.",
  ctaHeading: "You and your children are in safe hands",
  ctaButtonText: "Enquire Here",
  priceSuffix: "inc GST",
};

export const defaultServiceAreasContent: ServiceAreasContent = {
  sectionTitle: "Our Service Areas",
  sectionSubtitle: "Family Fathers provides specialist family law child contact supervision services to families across Metropolitan Melbourne.",
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
};

export const defaultAboutContent: AboutContent = {
  sectionLabel: "About Us",
  heading: "Family Law experts who provide secure child supervision during court ordered family interventions.",
  paragraph1: "Family Fathers is a metropolitan Melbourne-based service providing qualified supervisors and experienced professionals to support your family while you navigate the family court process. We facilitate court ordered times, work with family lawyers, and develop a plan to move your matter forward with support and relevant interventions to protect your child and their relationship with both parents.",
  paragraph2: "We understand that family law clients require assistance to navigate the difficulties of family violence, narcissism, and the resulting trauma to reestablish and nurture positive relationships. This process can be complex and emotionally challenging. Our caring team provides secure, reliable support for children to maintain key relationships in their lives.",
  features: [
    "Qualified & experienced supervisors",
    "Confidential & impartial service",
    "Child Safe Practice Compliant",
  ],
  imageUrl: "/about-team.jpg",
  imageAlt: "Professional team providing caring support services",
};

export const defaultContactContent: ContactContent = {
  sectionTitle: "Contact Us",
  sectionSubtitle: "Reach out today to register your interest and start the conversation.",
  enquiryOptions: [
    { value: "supervision", label: "I want to proceed with family law supervision" },
    { value: "availability", label: "I want to learn about current availability" },
    { value: "questions", label: "I have some questions about supervision" },
    { value: "employment", label: "I am interested in employment" },
    { value: "solicitor", label: "I am a family law solicitor" },
  ],
  successHeading: "Thank you for your enquiry!",
  successMessage: "We will respond within 24 hours. If you have any urgent questions, please call us at",
  phoneNumber: "0493 429 730",
};

export const defaultFooterContent: FooterContent = {
  tagline: "Specialists in child-centred supervision to support your child in the midst of family law proceedings.",
  getInTouchTitle: "Get In Touch",
  quickLinksTitle: "Quick Links",
  contactTitle: "Contact",
  phone: "0493 429 730",
  email: "contact@familyfathers.com.au",
  copyrightText: "Family Fathers",
  navLinks: [
    { href: "#about", label: "About Our Service" },
    { href: "#process", label: "Our Process" },
    { href: "#pricing", label: "Our Fees" },
    { href: "/resources", label: "Resources" },
    { href: "#contact", label: "Contact Us" },
  ],
};

export const defaultSiteSettings: SiteSettings = {
  siteName: "Family Fathers",
  siteDescription: "Specialists in child-centred supervision to support your family",
  phone: "0493 429 730",
  email: "contact@familyfathers.com.au",
};

export const defaultResourcesContent: ResourcesContent = {
  sectionTitle: "Resources",
  sectionSubtitle: "Important documents and policies for our services",
  documents: [],
};

// ============================================
// CONTENT FETCHING UTILITIES
// ============================================

type ContentTypeMap = {
  hero: HeroContent;
  features: FeaturesContent;
  process: ProcessContent;
  pricing: PricingContent;
  serviceAreas: ServiceAreasContent;
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
  navigation: NavLink[];
  siteSettings: SiteSettings;
  resources: ResourcesContent;
};

const defaultContentMap: Record<ContentKey, unknown> = {
  hero: defaultHeroContent,
  features: defaultFeaturesContent,
  process: defaultProcessContent,
  pricing: defaultPricingContent,
  serviceAreas: defaultServiceAreasContent,
  about: defaultAboutContent,
  contact: defaultContactContent,
  footer: defaultFooterContent,
  navigation: defaultFooterContent.navLinks,
  siteSettings: defaultSiteSettings,
  resources: defaultResourcesContent,
};

export async function getContent<K extends ContentKey>(
  key: K
): Promise<ContentTypeMap[K]> {
  try {
    const data = await redis.get<ContentTypeMap[K]>(CONTENT_KEYS[key]);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error(`Error fetching content for ${key}:`, error);
  }
  return defaultContentMap[key] as ContentTypeMap[K];
}

export async function setContent<K extends ContentKey>(
  key: K,
  content: ContentTypeMap[K]
): Promise<boolean> {
  try {
    await redis.set(CONTENT_KEYS[key], content);
    return true;
  } catch (error) {
    console.error(`Error saving content for ${key}:`, error);
    return false;
  }
}

export async function getAllContent(): Promise<{
  hero: HeroContent;
  features: FeaturesContent;
  process: ProcessContent;
  pricing: PricingContent;
  serviceAreas: ServiceAreasContent;
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
  siteSettings: SiteSettings;
}> {
  const [hero, features, process, pricing, serviceAreas, about, contact, footer, siteSettings] = await Promise.all([
    getContent("hero"),
    getContent("features"),
    getContent("process"),
    getContent("pricing"),
    getContent("serviceAreas"),
    getContent("about"),
    getContent("contact"),
    getContent("footer"),
    getContent("siteSettings"),
  ]);

  return {
    hero,
    features,
    process,
    pricing,
    serviceAreas,
    about,
    contact,
    footer,
    siteSettings,
  };
}
