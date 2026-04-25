import { useEffect, useRef, useState } from "react";
import {
  View, Text, StyleSheet, Animated, Easing, TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants/theme";
import { isWeb } from "../../constants/responsive";
import { buildApiUrl } from "../../lib/api";

const LOADING_MESSAGES = [
  "A analisar o teu rosto...",
  "A adaptar o corte ao teu formato facial...",
  "A gerar uma simulação realista...",
  "A finalizar o resultado...",
];

type HairstyleResponse = {
  ok?: boolean;
  imageUrl?: string;
  error?: string;
};

async function generateHairPreview() {
  const [photoBase64, photoMimeType, stylePrompt, styleName] = await Promise.all([
    AsyncStorage.getItem("photoBase64"),
    AsyncStorage.getItem("photoMimeType"),
    AsyncStorage.getItem("selectedStylePrompt"),
    AsyncStorage.getItem("selectedStyleName"),
  ]);

  if (!photoBase64 || !stylePrompt || !styleName) {
    throw new Error("Faltam dados da foto ou do estilo selecionado.");
  }

  const apiUrl = buildApiUrl("/api/hairstyle");
  console.log("[Loading] A chamar API:", apiUrl);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageBase64: photoBase64,
      imageMimeType: photoMimeType || "image/jpeg",
      stylePrompt,
      styleName,
    }),
  });

  const data = (await response.json()) as HairstyleResponse;
  console.log("[Loading] Resposta da API:", response.status, data?.ok, data?.error);

  if (!response.ok || !data?.imageUrl) {
    throw new Error(data?.error || `Erro ${response.status} na geração da imagem.`);
  }

  return data.imageUrl;
}

export default function Loading() {
  const router = useRouter();
  const rotation = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(1)).current;
  const currentMsgIndex = useRef(0);
  const currentMsg = useRef(LOADING_MESSAGES[0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(progress, {
      toValue: 0.85,
      duration: 25000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    const msgInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(messageAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(messageAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      currentMsgIndex.current = (currentMsgIndex.current + 1) % LOADING_MESSAGES.length;
      currentMsg.current = LOADING_MESSAGES[currentMsgIndex.current];
    }, 2200);

    (async () => {
      try {
        await AsyncStorage.removeItem("resultImageUrl");
        const resultUrl = await generateHairPreview();

        if (!isMounted) return;

        await AsyncStorage.setItem("resultImageUrl", resultUrl);
        Animated.timing(progress, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          router.replace("/app/result");
        });
      } catch (error: any) {
        console.error("[Loading] Erro na geração:", error?.message || error);
        if (isMounted) {
          setErrorMsg(error?.message || "Erro desconhecido ao gerar a simulação.");
        }
      }
    })();

    return () => {
      isMounted = false;
      clearInterval(msgInterval);
    };
  }, [messageAnim, progress, rotation, router]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  if (errorMsg) {
    const body = (
      <View style={s.errorContainer}>
        <Text style={s.errorIcon}>⚠️</Text>
        <Text style={s.errorTitle}>Erro na geração</Text>
        <Text style={s.errorMessage}>{errorMsg}</Text>
        <TouchableOpacity style={s.retryBtn} onPress={() => router.replace("/app/loading")}>
          <Text style={s.retryBtnText}>Tentar novamente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.backBtn} onPress={() => router.replace("/app/style")}>
          <Text style={s.backBtnText}>← Escolher outro corte</Text>
        </TouchableOpacity>
      </View>
    );

    if (isWeb) {
      return (
        <View style={s.root}>
          <View style={s.webOuter}>{body}</View>
        </View>
      );
    }
    return (
      <View style={s.root}>
        <SafeAreaView style={s.safe}>{body}</SafeAreaView>
      </View>
    );
  }

  const body = (
    <View style={s.content}>
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

      <View style={s.progressBar}>
        <Animated.View style={[s.progressFill, { width: progressWidth }]} />
      </View>

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

      <Text style={s.timeNote}>⏱ Pode demorar até 30–60 segundos</Text>
    </View>
  );

  if (isWeb) {
    return (
      <View style={s.root}>
        <View style={s.webOuter}>{body}</View>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe}>{body}</SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  safe: { flex: 1 },

  webOuter: {
    flex: 1,
    minHeight: "100vh" as any,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 64,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center" as any,
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

  stepsList: { width: "100%", gap: 12, marginBottom: 24 },
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

  timeNote: {
    fontFamily: FONTS.body, fontSize: 12,
    color: COLORS.textTertiary, textAlign: "center",
  },

  // Error state
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center" as any,
    gap: 12,
  },
  errorIcon: { fontSize: 48, marginBottom: 8 },
  errorTitle: {
    fontFamily: FONTS.display,
    fontSize: 24, color: COLORS.white,
    textAlign: "center",
  },
  errorMessage: {
    fontFamily: FONTS.body,
    fontSize: 13, color: COLORS.textSecondary,
    textAlign: "center", lineHeight: 20,
    marginBottom: 8,
  },
  retryBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14, paddingHorizontal: 32,
    borderRadius: 12, width: "100%", alignItems: "center",
  },
  retryBtnText: {
    fontFamily: FONTS.displayBold, fontSize: 15, color: "#0a0a0a",
  },
  backBtn: { paddingVertical: 12, alignItems: "center" },
  backBtnText: {
    fontFamily: FONTS.body, fontSize: 13, color: COLORS.textSecondary,
  },
});
