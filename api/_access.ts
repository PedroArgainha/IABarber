import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "barber_access";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_PASSWORD || "";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function createAccessToken() {
  const payload = Buffer.from(
    JSON.stringify({
      scope: "barber-test-access",
      exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
    })
  ).toString("base64url");

  const signature = sign(payload);

  return `${payload}.${signature}`;
}

export function verifyAccessToken(token?: string) {
  if (!token || !getSecret()) {
    return false;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = sign(payload);

  if (!safeEqual(signature, expectedSignature)) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    if (!data.exp || Date.now() / 1000 > data.exp) {
      return false;
    }

    return data.scope === "barber-test-access";
  } catch {
    return false;
  }
}

export function getCookie(req: any, name: string) {
  const cookieHeader = req.headers.cookie || "";

  const cookies = cookieHeader.split(";").map((cookie: string) => cookie.trim());

  const cookie = cookies.find((cookie: string) =>
    cookie.startsWith(`${name}=`)
  );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
}

export function setAccessCookie(res: any, token: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${encodeURIComponent(
      token
    )}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_SECONDS}${secure}`
  );
}

export function clearAccessCookie(res: any) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`
  );
}

export function hasAccess(req: any) {
  const token = getCookie(req, COOKIE_NAME);

  return verifyAccessToken(token || undefined);
}

export function requireAccess(req: any, res: any) {
  if (hasAccess(req)) {
    return true;
  }

  res.status(401).json({
    error: "Acesso não autorizado.",
  });

  return false;
}