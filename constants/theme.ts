export const COLORS = {
  bg: "#0a0a0a",
  bgCard: "#141414",
  bgElevated: "#1a1a1a",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.15)",
  accent: "#b5f542",
  accentDim: "rgba(181,245,66,0.12)",
  accentBorder: "rgba(181,245,66,0.3)",
  white: "#ffffff",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255,255,255,0.55)",
  textTertiary: "rgba(255,255,255,0.3)",
  overlay: "rgba(0,0,0,0.6)",
};

export const FONTS = {
  display: "Syne_800ExtraBold",
  displayBold: "Syne_700Bold",
  body: "DMSans_400Regular",
  bodyMedium: "DMSans_500Medium",
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};



export const STYLES = {
  hairStyles: [
    {
      id: "taper_fade",
      name: "Taper Fade",
      desc: "Discreto e versátil",
      image: require("../assets/taperfade.png"),
      prompt:
        "Transform the hair in this photo into a taper fade haircut: subtle taper around the sideburns and neckline, clean contours, natural length on top. Keep the face identical.",
    },
    {
      id: "moicano_disfarcado",
      name: "Moicano Disfarçado",
      desc: "Atrevido e moderno",
      image: require("../assets/moicanodisfarcado.png"),
      prompt:
        "Transform the hair in this photo into a disguised mohawk haircut: short faded sides with a more defined strip of volume through the center, modern and wearable. Keep the face identical.",
    },
    {
      id: "buzzcut",
      name: "Buzzcut",
      desc: "Prático e marcante",
      image: require("../assets/buzzcut.png"),
      prompt:
        "Transform the hair in this photo into a buzz cut: very short, even length all around, clean and masculine. Keep the face identical.",
    },
    {
      id: "short_fringer",
      name: "Short Fringer",
      desc: "Jovem e descontraído",
      image: require("../assets/shortfringe.png"),
      prompt:
        "Transform the hair in this photo into a short fringe haircut: short textured top with a light fringe in the front, clean sides, modern casual finish. Keep the face identical.",
    },
    {
      id: "mullet",
      name: "Mullet",
      desc: "Irreverente e estiloso",
      image: require("../assets/mullet.png"),
      prompt:
        "Transform the hair in this photo into a modern mullet: shorter on the sides and front, longer in the back, textured and stylish. Keep the face identical.",
    },
    {
      id: "old_money",
      name: "Old Money",
      desc: "Elegante e clássico",
      image: require("../assets/oldmoney.png"),
      prompt:
        "Transform the hair in this photo into an old money haircut: classic, refined, medium-length top with neat side shape, elegant and timeless. Keep the face identical.",
    },
    {
      id: "corte_social",
      name: "Corte Social",
      desc: "Clássico e profissional",
      image: require("../assets/cortesocial.png"),
      prompt:
        "Transform the hair in this photo into a social haircut: neat, classic, professional, balanced top and sides, clean finish. Keep the face identical.",
    },
    {
      id: "low_fade",
      name: "Low Fade",
      desc: "Limpo e equilibrado",
      image: require("../assets/lowfade.png"),
      prompt:
        "Transform the hair in this photo into a low fade haircut: clean fade starting low near the ears, natural length on top, sharp and balanced look. Keep the face identical.",
    },
    {
      id: "mid_fade",
      name: "Mid Fade",
      desc: "Moderno e versátil",
      image: require("../assets/midfade.png"),
      prompt:
        "Transform the hair in this photo into a mid fade haircut: fade starting around the middle of the sides, balanced contrast with the top, modern and versatile. Keep the face identical.",
    },
    {
      id: "high_fade",
      name: "High Fade",
      desc: "Marcante e definido",
      image: require("../assets/highfade.png"),
      prompt:
        "Transform the hair in this photo into a high fade haircut: strong high fade beginning near the temple area, sharp contrast between the sides and the top. Keep the face identical.",
    },
  ],
};