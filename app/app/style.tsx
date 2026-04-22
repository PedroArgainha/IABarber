import { useState } from "react";

import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Image,
} from "react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, RADIUS, STYLES } from "../../constants/theme";
import { isWeb } from "../../constants/responsive";
import { useResponsive } from "../../constants/responsive";

export default function StylePicker() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const { width, isMd, isDesktop } = useResponsive();

  // Card width: on web desktop = 3 columns, tablet = 2 columns, mobile = 2 columns
  const getCardWidth = () => {
    if (isWeb) {
      const maxW = Math.min(width, 680);
      const hPad = 48;
      const gap = 16;
      const cols = isDesktop ? 3 : 2;
      return (maxW - hPad * 2 - gap * (cols - 1)) / cols;
    }
    // Native: always 2 cols
    const hPad = 24 * 2;
    const gap = 12;
    return (width - hPad - gap) / 2;
  };
  const CARD_W = getCardWidth();

  const handleSelect = (id: string) => setSelected(id);

  const handleNext = async () => {
    if (!selected) return;
    const style = STYLES.hairStyles.find((s) => s.id === selected);
    if (style) {
      await AsyncStorage.setItem("selectedStyleId", style.id);
      await AsyncStorage.setItem("selectedStylePrompt", style.prompt);
      await AsyncStorage.setItem("selectedStyleName", style.name);
    }
    router.push("/app/loading");
  };

  const content = (
    <>
      {/* Header */}
      <View style={[s.header, isWeb && s.headerWeb]}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={s.steps}>
          <View style={[s.stepDot, s.stepDone]} />
          <View style={[s.stepLine, s.stepLineDone]} />
          <View style={[s.stepDot, s.stepActive]} />
          <View style={s.stepLine} />
          <View style={s.stepDot} />
        </View>
        <Text style={s.stepLabel}>2 de 3</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scrollContent, isWeb && s.scrollContentWeb]}
      >
        <Text style={[s.title, isWeb && !isMd && s.titleWeb]}>Escolhe o teu{"\n"}estilo</Text>
        <Text style={s.sub}>Clica no corte que queres experimentar.</Text>

        <View style={[s.grid, { gap: isWeb ? 16 : 12 }]}>
          {STYLES.hairStyles.map((style) => {
            const isSelected = selected === style.id;
            return (
              <TouchableOpacity
                key={style.id}
                style={[s.card, { width: CARD_W }, isSelected && s.cardSelected]}
                onPress={() => handleSelect(style.id)}
                activeOpacity={0.85}
              >


         <View style={[s.cardImg, isSelected && s.cardImgSelected]}>
  <Image source={style.image} style={s.cardImage} resizeMode="cover" />
  {isSelected && (
    <View style={s.checkBadge}>
      <Text style={s.checkText}>✓</Text>
    </View>
  )}
</View>


                <View style={s.cardInfo}>
                  <Text style={[s.cardName, isSelected && s.cardNameSelected]}>
                    {style.name}
                  </Text>
                  <Text style={s.cardDesc}>{style.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {selected && (
          <View style={s.selectedBanner}>
            <Text style={s.selectedBannerText}>
              ✓ {STYLES.hairStyles.find((s) => s.id === selected)?.name} selecionado
            </Text>
          </View>
        )}

        {/* CTA inline on web */}
        {isWeb && (
          <View style={s.webFooter}>
            <TouchableOpacity
              style={[s.nextBtn, !selected && s.nextBtnDisabled]}
              onPress={handleNext}
              activeOpacity={selected ? 0.85 : 1}
            >
              <Text style={[s.nextBtnText, !selected && s.nextBtnTextDisabled]}>
                Simular com IA →
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* CTA native */}
      {!isWeb && (
        <View style={s.footer}>
          <TouchableOpacity
            style={[s.nextBtn, !selected && s.nextBtnDisabled]}
            onPress={handleNext}
            activeOpacity={selected ? 0.85 : 1}
          >
            <Text style={[s.nextBtnText, !selected && s.nextBtnTextDisabled]}>
              Simular com IA →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );

  if (isWeb) {
    return (
      <View style={s.root}>
        <View style={s.webOuter}>
          {content}
        </View>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={{ flex: 1 }}>
        {content}
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

  header: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16,
  },
  headerWeb: { paddingHorizontal: 48 },
  backBtn: { paddingRight: 16, paddingVertical: 8 },
  backText: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary },
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

  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  scrollContentWeb: { paddingHorizontal: 48, paddingBottom: 60 },

  title: {
    fontFamily: FONTS.display, fontSize: 32,
    color: COLORS.white, letterSpacing: -0.8, marginBottom: 8,
  },
  titleWeb: { fontSize: 40, letterSpacing: -1 },
  sub: {
    fontFamily: FONTS.body, fontSize: 14,
    color: COLORS.textSecondary, lineHeight: 22, marginBottom: 24,
  },

  grid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: "rgba(181,245,66,0.05)",
  },


cardImg: {
  height: 120,
  backgroundColor: COLORS.bgElevated,
  position: "relative",
  overflow: "hidden",
},
cardImgSelected: { backgroundColor: "rgba(181,245,66,0.08)" },
cardImage: {
  width: "100%",
  height: "100%",
},


  checkBadge: {
    position: "absolute", top: 8, right: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: COLORS.accent,
    alignItems: "center", justifyContent: "center",
  },
  checkText: { fontSize: 12, color: "#0a0a0a", fontFamily: FONTS.displayBold },
  cardInfo: { padding: 12 },
  cardName: {
    fontFamily: FONTS.displayBold, fontSize: 14,
    color: COLORS.textSecondary, marginBottom: 2,
  },
  cardNameSelected: { color: COLORS.accent },
  cardDesc: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary },

  selectedBanner: {
    backgroundColor: COLORS.accentDim,
    borderWidth: 0.5, borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.md,
    paddingVertical: 12, paddingHorizontal: 16,
    alignItems: "center", marginBottom: 8,
  },
  selectedBannerText: {
    fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.accent,
  },

  webFooter: { marginTop: 16, marginBottom: 8 },
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
  nextBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 17, borderRadius: RADIUS.md, alignItems: "center",
  },
  nextBtnDisabled: { backgroundColor: COLORS.bgElevated },
  nextBtnText: { fontFamily: FONTS.displayBold, fontSize: 16, color: "#0a0a0a" },
  nextBtnTextDisabled: { color: COLORS.textTertiary },
});
