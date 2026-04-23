import { useEffect, useState, useRef } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, Animated, ScrollView, Share,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";
import { isWeb } from "../../constants/responsive";
import { useResponsive } from "../../constants/responsive";

export default function Result() {
  const router = useRouter();
  const [originalUri, setOriginalUri] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [styleName, setStyleName] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const { isMd, isDesktop } = useResponsive();

  useEffect(() => {
    (async () => {
      const photo = await AsyncStorage.getItem("photoBase64");
      const result = await AsyncStorage.getItem("resultImageUrl");
      const name = await AsyncStorage.getItem("selectedStyleName");
      if (photo) setOriginalUri(`data:image/jpeg;base64,${photo}`);
      if (result && result !== "demo") setResultUrl(result);
      if (name) setStyleName(name);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    })();
  }, []);

  const handleShare = async () => {
    await Share.share({
      message: `Olha o meu novo look com ${styleName}! Gerado pela 777 HairVision 💇‍♂️✂️`,
    });
  };

  const handleRetry = async () => {
    await AsyncStorage.removeItem("resultImageUrl");
    router.replace("/app");
  };

  const compareHeight = isWeb ? (isDesktop ? 340 : 240) : 220;

  const bodyContent = (
    <>
      {/* Header */}
      <View style={[s.header, isWeb && (isMd ? s.headerWebMobile : s.headerWeb)]}>
        <TouchableOpacity onPress={() => router.push("/")} style={s.homeBtn}>
          <Text style={s.homeBtnText}>× Fechar</Text>
        </TouchableOpacity>
        <View style={s.steps}>
          <View style={[s.stepDot, s.stepDone]} />
          <View style={[s.stepLine, s.stepLineDone]} />
          <View style={[s.stepDot, s.stepDone]} />
          <View style={[s.stepLine, s.stepLineDone]} />
          <View style={[s.stepDot, s.stepActive]} />
        </View>
        <Text style={s.stepLabel}>3 de 3</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={isWeb ? s.scrollWeb : undefined}
      >
        {/* Title */}
        <Animated.View
          style={[s.titleWrap, isWeb && (isMd ? s.titleWrapWebMobile : s.titleWrapWeb), { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={s.successBadge}>
            <Text style={s.successBadgeText}>✓ Pronto!</Text>
          </View>
          <Text style={[s.title, isWeb && !isMd && s.titleWeb]}>O teu novo{"\n"}visual</Text>
          {styleName ? (
            <Text style={s.sub}>Estilo: <Text style={s.subAccent}>{styleName}</Text></Text>
          ) : null}
        </Animated.View>

        {/* Before/After */}
        <Animated.View style={[s.compareWrap, isWeb && (isMd ? s.compareWrapWebMobile : s.compareWrapWeb), { opacity: fadeAnim }]}>
          <View style={s.compareRow}>
            {/* Before */}
            <View style={s.compareCard}>
              <View style={[s.compareImg, { height: compareHeight }]}>
                {originalUri ? (
                  <Image source={{ uri: originalUri }} style={s.img} />
                ) : (
                  <View style={s.imgPlaceholder}>
                    <Text style={{ fontSize: 36 }}>🙂</Text>
                  </View>
                )}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={s.imgGradient}
                />
              </View>
              <View style={s.compareLabel}>
                <Text style={s.compareLabelText}>ANTES</Text>
              </View>
            </View>

            {/* Arrow */}
            <View style={s.arrowWrap}>
              <Text style={s.arrowText}>→</Text>
            </View>

            {/* After */}
            <View style={[s.compareCard, s.compareCardAfter]}>
              <View style={[s.compareImg, { height: compareHeight }]}>
                {resultUrl ? (
                  <Image source={{ uri: resultUrl }} style={s.img} />
                ) : (
                  <View style={[s.imgPlaceholder, s.imgPlaceholderAfter]}>
                    <Text style={{ fontSize: 36 }}>✨</Text>
                    <Text style={s.demoText}>Demo</Text>
                  </View>
                )}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={s.imgGradient}
                />
              </View>
              <View style={[s.compareLabel, s.compareLabelAfter]}>
                <Text style={[s.compareLabelText, s.compareLabelTextAfter]}>DEPOIS</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action buttons */}
        <Animated.View style={[s.actions, isWeb && (isMd ? s.actionsWebMobile : s.actionsWeb), { opacity: fadeAnim }]}>
          <TouchableOpacity style={s.btnPrimary} onPress={handleShare} activeOpacity={0.85}>
            <Text style={s.btnPrimaryText}>↗ Partilhar resultado</Text>
          </TouchableOpacity>

          <View style={s.btnRow}>
            <TouchableOpacity style={s.btnSecondary} onPress={() => router.push("/app/style")}>
              <Text style={s.btnSecondaryText}>Outro estilo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnSecondary} onPress={handleRetry}>
              <Text style={s.btnSecondaryText}>Nova foto</Text>
            </TouchableOpacity>
          </View>

          {/* Upgrade card */}
          <View style={s.upgradeCard}>
            <LinearGradient
              colors={["rgba(181,245,66,0.06)", "transparent"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={s.upgradeLeft}>
              <Text style={s.upgradeTitle}>Queres HD + sem marcas?</Text>
              <Text style={s.upgradeSub}>10 imagens por apenas 2€</Text>
            </View>
            <TouchableOpacity style={s.upgradeBtn}>
              <Text style={s.upgradeBtnText}>Ver planos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={s.freeBtn}>
            <Text style={s.freeBtnText}>Ou ver anúncio para desbloquear grátis</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Rating */}
        <View style={[s.ratingWrap, isWeb && (isMd ? s.ratingWrapWebMobile : s.ratingWrapWeb)]}>
          <Text style={s.ratingTitle}>Gostas do resultado?</Text>
          <View style={s.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} style={s.star}>
                <Text style={s.starText}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );

  if (isWeb) {
    return (
      <View style={s.root}>
        <View style={s.webOuter}>
          {bodyContent}
        </View>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={{ flex: 1 }}>
        {bodyContent}
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  webOuter: {
    minHeight: '100vh' as any,
    paddingTop: 64,
    maxWidth: 680,
    width: '100%',
    alignSelf: 'center' as any,
  },

  scrollWeb: { paddingBottom: 60 },

  header: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16,
  },
  headerWeb: { paddingHorizontal: 48 },
  headerWebMobile: { paddingHorizontal: 24 },
  homeBtn: { paddingRight: 16, paddingVertical: 8 },
  homeBtnText: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary },
  steps: { flexDirection: "row", alignItems: "center" },
  stepDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  stepActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  stepDone: { backgroundColor: "rgba(181,245,66,0.4)", borderColor: COLORS.accentBorder },
  stepLine: { width: 24, height: 0.5, backgroundColor: COLORS.border },
  stepLineDone: { backgroundColor: COLORS.accentBorder },
  stepLabel: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary },

  titleWrap: { paddingHorizontal: 24, marginBottom: 24 },
  titleWrapWeb: { paddingHorizontal: 48 },
  titleWrapWebMobile: { paddingHorizontal: 24 },
  successBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.accentDim,
    borderWidth: 0.5, borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.full,
    paddingHorizontal: 12, paddingVertical: 5,
    marginBottom: 12,
  },
  successBadgeText: { fontFamily: FONTS.bodyMedium, fontSize: 12, color: COLORS.accent },
  title: {
    fontFamily: FONTS.display, fontSize: 32,
    color: COLORS.white, letterSpacing: -0.8, lineHeight: 40, marginBottom: 8,
  },
  titleWeb: { fontSize: 40, letterSpacing: -1 },
  sub: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary },
  subAccent: { color: COLORS.accent, fontFamily: FONTS.bodyMedium },

  compareWrap: { paddingHorizontal: 24, marginBottom: 24 },
  compareWrapWeb: { paddingHorizontal: 48 },
  compareWrapWebMobile: { paddingHorizontal: 24 },
  compareRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  compareCard: {
    flex: 1, borderRadius: RADIUS.lg, overflow: "hidden",
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  compareCardAfter: { borderColor: COLORS.accentBorder },
  compareImg: { position: "relative" },
  img: { width: "100%", height: "100%" },
  imgPlaceholder: {
    flex: 1, alignItems: "center", justifyContent: "center",
    backgroundColor: COLORS.bgElevated, height: "100%",
  },
  imgPlaceholderAfter: { backgroundColor: "rgba(181,245,66,0.05)" },
  demoText: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary, marginTop: 4 },
  imgGradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: 60 },
  compareLabel: { backgroundColor: COLORS.bgCard, paddingVertical: 8, alignItems: "center" },
  compareLabelAfter: { backgroundColor: COLORS.accentDim },
  compareLabelText: { fontFamily: FONTS.displayBold, fontSize: 11, color: COLORS.textTertiary, letterSpacing: 1.5 },
  compareLabelTextAfter: { color: COLORS.accent },
  arrowWrap: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.bgCard,
    borderWidth: 0.5, borderColor: COLORS.border,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  arrowText: { color: COLORS.textSecondary, fontSize: 12 },

  actions: { paddingHorizontal: 24, gap: 10, marginBottom: 24 },
  actionsWeb: { paddingHorizontal: 48 },
  actionsWebMobile: { paddingHorizontal: 24 },
  btnPrimary: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16, borderRadius: RADIUS.md, alignItems: "center",
  },
  btnPrimaryText: { fontFamily: FONTS.displayBold, fontSize: 16, color: "#0a0a0a" },
  btnRow: { flexDirection: "row", gap: 10 },
  btnSecondary: {
    flex: 1, paddingVertical: 14, borderRadius: RADIUS.md,
    alignItems: "center", borderWidth: 0.5, borderColor: COLORS.border,
    backgroundColor: COLORS.bgCard,
  },
  btnSecondaryText: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary },

  upgradeCard: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 0.5, borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.lg, padding: 14, overflow: "hidden",
    backgroundColor: COLORS.bgCard,
    gap: 12,
  },
  upgradeLeft: { flex: 1, minWidth: 0 },
  upgradeTitle: { fontFamily: FONTS.displayBold, fontSize: 13, color: COLORS.white, marginBottom: 2 },
  upgradeSub: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textSecondary },
  upgradeBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: RADIUS.md,
    flexShrink: 0,
  },
  upgradeBtnText: { fontFamily: FONTS.displayBold, fontSize: 12, color: "#0a0a0a" },
  freeBtn: { alignItems: "center", paddingVertical: 4 },
  freeBtnText: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary },

  ratingWrap: { paddingHorizontal: 24, paddingBottom: 40, alignItems: "center" },
  ratingWrapWeb: { paddingHorizontal: 48 },
  ratingWrapWebMobile: { paddingHorizontal: 24 },
  ratingTitle: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary, marginBottom: 12 },
  stars: { flexDirection: "row", gap: 8 },
  star: { padding: 4 },
  starText: { fontSize: 28, color: COLORS.accent },
});
