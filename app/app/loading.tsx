import { useEffect, useRef } from "react";
import {
  View, Text, StyleSheet, Animated, Easing,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";

// ─── REPLICATE CONFIG ───────────────────────────────────────────────────────
// Replace with your actual Replicate API token
const REPLICATE_API_TOKEN = "YOUR_REPLICATE_API_TOKEN_HERE";

// Hair style transfer model on Replicate
// https://replicate.com/lucataco/sdxl-controlnet
const MODEL_VERSION = "lucataco/hair-fast-gan:latest";

async function runHairStyleTransfer(imageBase64: string, prompt: string): Promise<string> {
  // 1. Create prediction
  const createRes = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input: {
        image: `data:image/jpeg;base64,${imageBase64}`,
        prompt: prompt,
        negative_prompt: "blurry, low quality, distorted face",
        num_inference_steps: 30,
      },
    }),
  });

  const prediction = await createRes.json();
  if (!prediction.id) throw new Error("Failed to create prediction");

  // 2. Poll until done
  let result = prediction;
  while (result.status !== "succeeded" && result.status !== "failed") {
    await new Promise((r) => setTimeout(r, 1500));
    const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
      headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
    });
    result = await pollRes.json();
  }

  if (result.status === "failed") throw new Error("Prediction failed");
  return result.output[0] as string; // URL of generated image
}
// ────────────────────────────────────────────────────────────────────────────

const LOADING_MESSAGES = [
  "A analisar o teu rosto...",
  "A aplicar o estilo escolhido...",
  "A IA está a trabalhar...",
  "Quase pronto...",
];

export default function Loading() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const messageIndex = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(1)).current;
  const currentMsgIndex = useRef(0);
  const currentMsg = useRef(LOADING_MESSAGES[0]);

  useEffect(() => {
    // Spinner
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar
    Animated.timing(progress, {
      toValue: 0.9,
      duration: 8000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Cycle messages
    const msgInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(messageAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(messageAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
      currentMsgIndex.current = (currentMsgIndex.current + 1) % LOADING_MESSAGES.length;
      currentMsg.current = LOADING_MESSAGES[currentMsgIndex.current];
      messageIndex.setValue(currentMsgIndex.current);
    }, 2500);

    // Run API
    (async () => {
      try {
        const photoBase64 = await AsyncStorage.getItem("photoBase64");
        const stylePrompt = await AsyncStorage.getItem("selectedStylePrompt");

        if (!photoBase64 || !stylePrompt) throw new Error("Missing data");

        const resultUrl = await runHairStyleTransfer(photoBase64, stylePrompt);
        await AsyncStorage.setItem("resultImageUrl", resultUrl);

        // Complete progress bar
        Animated.timing(progress, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          router.replace("/app/result");
        });
      } catch (error) {
        console.error("API Error:", error);
        // For demo/testing without API key, go to result with placeholder
        await AsyncStorage.setItem("resultImageUrl", "demo");
        setTimeout(() => router.replace("/app/result"), 3000);
      }
    })();

    return () => clearInterval(msgInterval);
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe}>
        <View style={s.content}>
          {/* Spinner */}
          <View style={s.spinnerWrap}>
            <View style={s.spinnerOuter} />
            <Animated.View style={[s.spinnerInner, { transform: [{ rotate: spin }] }]}>
              <View style={s.spinnerArc} />
            </Animated.View>
            <Text style={s.spinnerEmoji}>✂️</Text>
          </View>

          <Text style={s.title}>A criar o teu{"\n"}novo look</Text>

          <Animated.Text style={[s.message, { opacity: messageAnim }]}>
            {currentMsg.current}
          </Animated.Text>

          {/* Progress */}
          <View style={s.progressBar}>
            <Animated.View style={[s.progressFill, { width: progressWidth }]} />
          </View>

          {/* Steps */}
          <View style={s.stepsList}>
            {["Foto recebida ✓", "Estilo carregado ✓", "IA a processar...", "Resultado"].map((step, i) => (
              <View key={i} style={s.stepRow}>
                <View style={[s.stepIndicator, i < 2 && s.stepDone, i === 2 && s.stepCurrent]} />
                <Text style={[s.stepText, i < 2 && s.stepTextDone, i === 2 && s.stepTextCurrent]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  safe: { flex: 1 },
  content: {
    flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32,
  },

  spinnerWrap: {
    width: 96, height: 96, alignItems: "center",
    justifyContent: "center", marginBottom: 32,
  },
  spinnerOuter: {
    position: "absolute", width: 96, height: 96, borderRadius: 48,
    borderWidth: 2, borderColor: "rgba(181,245,66,0.12)",
  },
  spinnerInner: {
    position: "absolute", width: 96, height: 96,
    borderRadius: 48, overflow: "hidden",
  },
  spinnerArc: {
    position: "absolute", top: 0, left: 0,
    width: 96, height: 96, borderRadius: 48,
    borderWidth: 2.5,
    borderColor: "transparent",
    borderTopColor: COLORS.accent,
    borderRightColor: COLORS.accent,
  },
  spinnerEmoji: { fontSize: 28 },

  title: {
    fontFamily: FONTS.display,
    fontSize: 30, color: COLORS.white,
    letterSpacing: -0.8, textAlign: "center",
    lineHeight: 38, marginBottom: 16,
  },
  message: {
    fontFamily: FONTS.body,
    fontSize: 14, color: COLORS.textSecondary,
    marginBottom: 32, textAlign: "center",
  },

  progressBar: {
    width: "100%", height: 3,
    backgroundColor: COLORS.bgElevated,
    borderRadius: 3, overflow: "hidden",
    marginBottom: 40,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },

  stepsList: { width: "100%", gap: 12 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepIndicator: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  stepDone: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  stepCurrent: {
    backgroundColor: "rgba(181,245,66,0.4)",
    borderColor: COLORS.accentBorder,
  },
  stepText: {
    fontFamily: FONTS.body, fontSize: 13, color: COLORS.textTertiary,
  },
  stepTextDone: { color: COLORS.accent },
  stepTextCurrent: { color: COLORS.textSecondary },
});
