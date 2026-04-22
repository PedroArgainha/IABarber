import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";
import { isWeb, MAX_WIDTH } from "../../constants/responsive";
import { useResponsive } from "../../constants/responsive";

const TIPS = [
  { icon: "☀️", label: "Boa luz" },
  { icon: "👤", label: "Rosto visível" },
  { icon: "🔳", label: "Fundo neutro" },
];

export default function AppUpload() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const { isMd } = useResponsive();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria para continuar.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      if (result.assets[0].base64) {
        await AsyncStorage.setItem("photoBase64", result.assets[0].base64);
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.9,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      if (result.assets[0].base64) {
        await AsyncStorage.setItem("photoBase64", result.assets[0].base64);
      }
    }
  };

  const inner = (
    <>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Sair</Text>
        </TouchableOpacity>
        <View style={s.steps}>
          <View style={[s.stepDot, s.stepActive]} />
          <View style={s.stepLine} />
          <View style={s.stepDot} />
          <View style={s.stepLine} />
          <View style={s.stepDot} />
        </View>
        <Text style={s.stepLabel}>1 de 3</Text>
      </View>

      {/* Content */}
      <View style={[s.content, isWeb && s.contentWeb]}>
        <View style={isWeb && !isMd ? s.webCard : undefined}>
          <Text style={[s.title, isWeb && !isMd && s.titleWeb]}>A tua selfie</Text>
          <Text style={s.sub}>Para um resultado realista, usa uma foto com boa qualidade.</Text>

          {/* Upload zone */}
          {image ? (
            <View style={s.previewWrap}>
              <Image source={{ uri: image }} style={[s.preview, isWeb && s.previewWeb]} />
              <TouchableOpacity style={s.changeBtn} onPress={pickImage}>
                <Text style={s.changeBtnText}>Trocar foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={s.uploadZone}>
              <View style={s.uploadIcon}>
                <Text style={{ fontSize: 32 }}>📸</Text>
              </View>
              <Text style={s.uploadLabel}>Envia a tua foto</Text>
              <Text style={s.uploadHint}>JPG ou PNG • Máx. 10MB</Text>

              <View style={s.uploadBtns}>
                <TouchableOpacity style={s.uploadBtn} onPress={pickImage} activeOpacity={0.8}>
                  <Text style={s.uploadBtnText}>🖼️  Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[s.uploadBtn, s.uploadBtnAccent]}
                  onPress={takePhoto}
                  activeOpacity={0.8}
                >
                  <Text style={[s.uploadBtnText, s.uploadBtnTextAccent]}>📷  Câmara</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Tips */}
          <View style={s.tipsRow}>
            {TIPS.map((tip, i) => (
              <View key={i} style={s.tipCard}>
                <Text style={s.tipIcon}>{tip.icon}</Text>
                <Text style={s.tipLabel}>{tip.label}</Text>
              </View>
            ))}
          </View>

          <Text style={s.privacyNote}>
            🔒 A tua foto não é guardada nos nossos servidores.
          </Text>

          {/* CTA inline on web */}
          {isWeb && (
            <View style={s.webFooter}>
              <TouchableOpacity
                style={[s.nextBtn, !image && s.nextBtnDisabled]}
                onPress={() => image && router.push("/app/style")}
                activeOpacity={image ? 0.85 : 1}
              >
                <Text style={[s.nextBtnText, !image && s.nextBtnTextDisabled]}>
                  Escolher estilo →
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* CTA native */}
      {!isWeb && (
        <View style={s.footer}>
          <TouchableOpacity
            style={[s.nextBtn, !image && s.nextBtnDisabled]}
            onPress={() => image && router.push("/app/style")}
            activeOpacity={image ? 0.85 : 1}
          >
            <Text style={[s.nextBtnText, !image && s.nextBtnTextDisabled]}>
              Escolher estilo →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  if (isWeb) {
    return (
      <View style={s.root}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={s.webOuter}>
            {inner}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={{ flex: 1 }}>
        {inner}
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  // Web wrapper — centered column
  webOuter: {
    minHeight: '100vh' as any,
    alignItems: 'center',
    paddingTop: 80, // nav height
    paddingBottom: 60,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    width: "100%",
    maxWidth: isWeb ? 560 : undefined,
    alignSelf: isWeb ? 'center' as any : undefined,
  },
  backBtn: { paddingRight: 16, paddingVertical: 8 },
  backText: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary },
  steps: { flexDirection: "row", alignItems: "center", gap: 0 },
  stepDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  stepActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  stepLine: { width: 24, height: 0.5, backgroundColor: COLORS.border },
  stepLabel: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary },

  content: { flex: 1, paddingHorizontal: 24, paddingTop: 8 },
  contentWeb: { width: '100%', maxWidth: 560, alignSelf: 'center' as any, flex: undefined },

  webCard: {},

  title: {
    fontFamily: FONTS.display,
    fontSize: 32,
    color: COLORS.white,
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  titleWeb: { fontSize: 40 },
  sub: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 28,
  },

  uploadZone: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.xl,
    padding: 32,
    alignItems: "center",
    backgroundColor: COLORS.accentDim,
    marginBottom: 20,
  },
  uploadIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: "rgba(181,245,66,0.1)",
    alignItems: "center", justifyContent: "center",
    marginBottom: 12,
  },
  uploadLabel: {
    fontFamily: FONTS.displayBold,
    fontSize: 16, color: COLORS.white, marginBottom: 4,
  },
  uploadHint: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary, marginBottom: 20 },
  uploadBtns: { flexDirection: "row", gap: 10, width: "100%" },
  uploadBtn: {
    flex: 1, paddingVertical: 13, borderRadius: RADIUS.md,
    alignItems: "center",
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  uploadBtnAccent: { backgroundColor: COLORS.accent },
  uploadBtnText: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary },
  uploadBtnTextAccent: { color: "#0a0a0a" },

  previewWrap: { alignItems: "center", marginBottom: 20 },
  preview: {
    width: "100%", height: 320,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.bgElevated,
  },
  previewWeb: { height: 380 },
  changeBtn: {
    marginTop: 12,
    borderWidth: 0.5, borderColor: COLORS.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  changeBtnText: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.textSecondary },

  tipsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  tipCard: {
    flex: 1, backgroundColor: COLORS.bgCard,
    borderWidth: 0.5, borderColor: COLORS.border,
    borderRadius: RADIUS.md, padding: 12, alignItems: "center",
  },
  tipIcon: { fontSize: 18, marginBottom: 4 },
  tipLabel: { fontFamily: FONTS.bodyMedium, fontSize: 11, color: COLORS.textSecondary, textAlign: "center" },

  privacyNote: {
    fontFamily: FONTS.body, fontSize: 12,
    color: COLORS.textTertiary, textAlign: "center",
    marginBottom: 8,
  },

  webFooter: { marginTop: 20, marginBottom: 8 },
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
  nextBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 17, borderRadius: RADIUS.md, alignItems: "center",
  },
  nextBtnDisabled: { backgroundColor: COLORS.bgElevated },
  nextBtnText: { fontFamily: FONTS.displayBold, fontSize: 16, color: "#0a0a0a" },
  nextBtnTextDisabled: { color: COLORS.textTertiary },
});
