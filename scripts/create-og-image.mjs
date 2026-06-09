import sharp from "sharp";

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050505"/>

  <rect x="465" y="190" width="270" height="120" rx="28" fill="#A3FF12"/>
  <text x="600" y="268"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="72"
        font-weight="900"
        fill="#111111">
    777
  </text>

  <text x="600" y="390"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="58"
        font-weight="800"
        fill="#FFFFFF">
    777 HairVision
  </text>

  <text x="600" y="445"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="28"
        font-weight="400"
        fill="#A3A3A3">
    Experimenta cortes de cabelo com IA
  </text>
</svg>
`;

await sharp(Buffer.from(svg))
  .png()
  .toFile("public/og-image.png");

console.log("Imagem criada em public/og-image.png");