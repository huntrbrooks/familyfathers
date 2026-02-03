import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// Simple hash function for session token
function createSessionToken(password: string): string {
  const timestamp = Date.now();
  const data = `${password}:${timestamp}`;
  // Simple base64 encoding for session token
  return Buffer.from(data).toString("base64");
}

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable not set");
    return false;
  }
  return password === adminPassword;
}

export async function createSession(): Promise<string> {
  const token = createSessionToken(process.env.ADMIN_PASSWORD!);
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  
  return token;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionToken?.value) {
    return false;
  }
  
  try {
    // Decode and verify the session token contains the correct password
    const decoded = Buffer.from(sessionToken.value, "base64").toString();
    const [password] = decoded.split(":");
    return password === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function getSessionStatus(): Promise<{ authenticated: boolean }> {
  const isValid = await verifySession();
  return { authenticated: isValid };
}
