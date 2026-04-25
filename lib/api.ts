import { Platform } from "react-native";

function normalizeBaseUrl(value: string) {
  return value.replace(/\/$/, "");
}

export function getApiBaseUrl() {
  const explicitBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

  if (explicitBaseUrl) {
    return normalizeBaseUrl(explicitBaseUrl);
  }

  if (Platform.OS === "web") {
    return "";
  }

  throw new Error(
    "EXPO_PUBLIC_API_BASE_URL não está definido. Para mobile, aponta este valor para o teu backend/Vercel deployment."
  );
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
