import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "barber_access";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): string {
  const s = process.env.ACCESS_TOKEN_SECRET;
  if (!s || s.length < 16) throw new Error("ACCESS_TOKEN_SECRET missing");
  return s;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function signAccessToken(): string {
  const payload = JSON.stringify({ scope: "barber-test-access", exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS });
  const payloadB64 = b64url(payload);
  const sig = createHmac("sha256", getSecret()).update(payloadB64).digest();
  return `${payloadB64}.${b64url(sig)}`;
}

export function verifyAccessToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  const expected = createHmac("sha256", getSecret()).update(payloadB64).digest();
  let received: Buffer;
  try {
    received = Buffer.from(sigB64.replace(/-/g, "+").replace(/_/g, "/"), "base64");
  } catch { return false; }
  if (received.length !== expected.length) return false;
  if (!timingSafeEqual(received, expected)) return false;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    if (payload.scope !== "barber-test-access") return false;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch { return false; }
}

export function buildAccessCookie(token: string): string {
  // SameSite=None + Secure so the cookie works inside the Lovable preview iframe
  // (third-party context). Requires HTTPS, which preview + production both use.
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=${MAX_AGE_SECONDS}`;
}

export function readAccessCookie(cookieHeader: string | null | undefined): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === COOKIE_NAME) return rest.join("=");
  }
  return null;
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ACCESS_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
