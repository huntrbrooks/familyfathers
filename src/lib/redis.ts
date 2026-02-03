import { Redis } from "@upstash/redis";

// Validate environment variables
const redisUrl = process.env.KV_REST_API_URL;
const redisToken = process.env.KV_REST_API_TOKEN;

if (!redisUrl || !redisToken) {
  console.error(
    "Redis configuration error: KV_REST_API_URL and KV_REST_API_TOKEN must be set in environment variables"
  );
}

// Create Redis client using environment variables
export const redis = new Redis({
  url: redisUrl || "",
  token: redisToken || "",
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
  resources: "content:resources",
} as const;

export type ContentKey = keyof typeof CONTENT_KEYS;
