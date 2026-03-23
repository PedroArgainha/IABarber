# 777 HairVision — React Native App

Aplicação mobile + web com IA para simulação de cortes de cabelo.

## Estrutura do projeto

```
hairvision/
├── app/
│   ├── _layout.tsx          ← Root layout (fontes, navegação)
│   ├── index.tsx            ← Landing page
│   ├── about.tsx            ← Página sobre o fundador
│   └── app/
│       ├── _layout.tsx      ← Layout do flow da app
│       ├── index.tsx        ← Passo 1: Upload da foto
│       ├── style.tsx        ← Passo 2: Escolha do estilo
│       ├── loading.tsx      ← Passo 3: Loading + chamada à API
│       └── result.tsx       ← Passo 4: Resultado antes/depois
├── constants/
│   └── theme.ts             ← Cores, fontes, estilos, prompts por estilo
└── package.json
```

## Setup rápido

### 1. Instalar dependências

```bash
npm install
```

Se der erro no AsyncStorage:
```bash
npx expo install @react-native-async-storage/async-storage
```

### 2. Configurar a API (Replicate)

1. Vai a https://replicate.com e cria conta
2. Copia o teu API Token
3. Abre `app/app/loading.tsx`
4. Substitui `"YOUR_REPLICATE_API_TOKEN_HERE"` pelo teu token

```typescript
const REPLICATE_API_TOKEN = "r8_xxxx..."; // o teu token aqui
```

### 3. Correr a app

```bash
# Web (para testar no browser)
npm run web

# iOS (precisa de Mac + Xcode)
npm run ios

# Android (precisa de Android Studio)
npm run android

# Expo Go (mais fácil para testar no telemóvel)
npx expo start
# → scan do QR code com o app Expo Go
```

## Como adicionar a tua foto na página About

Abre `app/about.tsx` e substitui:
- `"O Teu Nome Aqui"` → o teu nome
- `"Founder & CEO"` → o teu título
- O texto do `founderBio` → a tua história
- Os links sociais → os teus handles reais

Para adicionar foto real:
```tsx
// Substitui o <View style={s.avatar}> por:
<Image 
  source={require('../../assets/founder.jpg')} 
  style={s.avatar} 
/>
```

## Personalizar os prompts por estilo

Abre `constants/theme.ts` e edita o campo `prompt` de cada estilo:

```typescript
{
  id: "low_fade",
  name: "Low Fade",
  emoji: "✂️",
  desc: "Clássico e limpo",
  prompt: "O teu prompt personalizado aqui...", // ← edita isto
},
```

## Publicar nas lojas

### App Store (iOS)
```bash
npx expo build:ios
# ou com EAS:
npx eas build --platform ios
```

### Google Play (Android)
```bash
npx expo build:android
# ou com EAS:
npx eas build --platform android
```

## Modelos alternativos no Replicate

| Modelo | Qualidade | Velocidade | Custo |
|--------|-----------|------------|-------|
| `lucataco/hair-fast-gan` | Boa | Rápida | ~0.01€ |
| `stability-ai/sdxl` | Excelente | Média | ~0.05€ |
| `fofr/face-to-sticker` | Criativa | Rápida | ~0.02€ |

---

Feito com ❤️ em Portugal 🇵🇹
