import buzzcutAsset from "@/assets/hairstyles/buzzcut.png";
import corteSocialAsset from "@/assets/hairstyles/cortesocial.png";
import highFadeAsset from "@/assets/hairstyles/highfade.png";
import lowFadeAsset from "@/assets/hairstyles/lowfade.png";
import midFadeAsset from "@/assets/hairstyles/midfade.png";
import moicanoDisfarcadoAsset from "@/assets/hairstyles/moicanodisfarcado.png";
import mulletAsset from "@/assets/hairstyles/mullet.png";
import oldMoneyAsset from "@/assets/hairstyles/oldmoney.png";
import shortFringeAsset from "@/assets/hairstyles/shortfringe.png";
import taperFadeAsset from "@/assets/hairstyles/taperfade.png";

export type HairstyleId =
  | "taper_fade"
  | "moicano_disfarcado"
  | "buzzcut"
  | "short_fringe"
  | "mullet"
  | "old_money"
  | "corte_social"
  | "low_fade"
  | "mid_fade"
  | "high_fade";

export interface Hairstyle {
  id: HairstyleId;
  name: string;
  short: string;
  prompt: string;
  gradient: string;
  imageUrl: string;
}

export const HAIRSTYLES: Hairstyle[] = [
  {
    id: "taper_fade",
    name: "Taper Fade",
    short: "Discreto e versátil",
    prompt: "Transform the hair in this photo into a taper fade haircut: subtle taper around the sideburns and neckline, clean contours, natural length on top. Keep the face identical.",
    gradient: "linear-gradient(135deg,#1f2937,#0f172a)",
    imageUrl: taperFadeAsset,
  },
  {
    id: "moicano_disfarcado",
    name: "Moicano Disfarçado",
    short: "Atrevido e moderno",
    prompt: "Transform the hair in this photo into a disguised mohawk haircut: short faded sides with a more defined strip of volume through the center, modern and wearable. Keep the face identical.",
    gradient: "linear-gradient(135deg,#3b0764,#1e1b4b)",
    imageUrl: moicanoDisfarcadoAsset,
  },
  {
    id: "buzzcut",
    name: "Buzzcut",
    short: "Prático e marcante",
    prompt: "Transform the hair in this photo into a buzz cut: very short, even length all around, clean and masculine. Keep the face identical.",
    gradient: "linear-gradient(135deg,#451a03,#1c1917)",
    imageUrl: buzzcutAsset,
  },
  {
    id: "short_fringe",
    name: "Short Fringe",
    short: "Jovem e descontraído",
    prompt: "Transform the hair in this photo into a short fringe haircut: short textured top with a light fringe in the front, clean sides, modern casual finish. Keep the face identical.",
    gradient: "linear-gradient(135deg,#064e3b,#022c22)",
    imageUrl: shortFringeAsset,
  },
  {
    id: "mullet",
    name: "Mullet",
    short: "Irreverente e estiloso",
    prompt: "Transform the hair in this photo into a modern mullet: shorter on the sides and front, longer in the back, textured and stylish. Keep the face identical.",
    gradient: "linear-gradient(135deg,#7c2d12,#431407)",
    imageUrl: mulletAsset,
  },
  {
    id: "old_money",
    name: "Old Money",
    short: "Elegante e clássico",
    prompt: "Transform the hair in this photo into an old money haircut: classic, refined, medium-length top with neat side shape, elegant and timeless. Keep the face identical.",
    gradient: "linear-gradient(135deg,#1e3a8a,#0c1e4d)",
    imageUrl: oldMoneyAsset,
  },
  {
    id: "corte_social",
    name: "Corte Social",
    short: "Clássico e profissional",
    prompt: "Transform the hair in this photo into a social haircut: neat, classic, professional, balanced top and sides, clean finish. Keep the face identical.",
    gradient: "linear-gradient(135deg,#334155,#0f172a)",
    imageUrl: corteSocialAsset,
  },
  {
    id: "low_fade",
    name: "Low Fade",
    short: "Limpo e equilibrado",
    prompt: "Transform the hair in this photo into a low fade haircut: clean fade starting low near the ears, natural length on top, sharp and balanced look. Keep the face identical.",
    gradient: "linear-gradient(135deg,#0c4a6e,#082f49)",
    imageUrl: lowFadeAsset,
  },
  {
    id: "mid_fade",
    name: "Mid Fade",
    short: "Moderno e versátil",
    prompt: "Transform the hair in this photo into a mid fade haircut: fade starting around the middle of the sides, balanced contrast with the top, modern and versatile. Keep the face identical.",
    gradient: "linear-gradient(135deg,#365314,#1a2e05)",
    imageUrl: midFadeAsset,
  },
  {
    id: "high_fade",
    name: "High Fade",
    short: "Marcante e definido",
    prompt: "Transform the hair in this photo into a high fade haircut: strong high fade beginning near the temple area, sharp contrast between the sides and the top. Keep the face identical.",
    gradient: "linear-gradient(135deg,#831843,#4c0519)",
    imageUrl: highFadeAsset,
  },
];

export function getHairstyle(id: string): Hairstyle | undefined {
  return HAIRSTYLES.find(h => h.id === id);
}

export function buildFullPrompt(styleName: string, stylePrompt: string): string {
  return `Create a photorealistic hairstyle simulation for a men's portrait photo using the selected haircut: ${styleName}. Preserve the person's identity, face shape, skin tone, facial features, expression, pose, clothing, and background. Only change the hairstyle and hair volume. Do not change the face. The result must look realistic, natural, high-quality, and suitable as a barber preview. Keep correct anatomy, consistent lighting, natural hair texture, realistic shadows, and clean haircut lines. Do not add hats, accessories, extra people, extra text, logos, or watermark. ${stylePrompt}`;
}

