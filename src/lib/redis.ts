import { Redis } from "@upstash/redis";

// Create Redis client using environment variables
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// Content keys for each section
export const CONTENT_KEYS = {
  hero: "content:hero",
  features: "content:features",
  process: "content:process",
  pricing: "content:pricing",
  serviceAreas: "content:serviceAreas",
  about: "content:about",
  contact: "content:contact",
  footer: "content:footer",
  navigation: "content:navigation",
  siteSettings: "content:siteSettings",
} as const;

export type ContentKey = keyof typeof CONTENT_KEYS;
