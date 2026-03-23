import { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, RADIUS, STYLES } from "../../constants/theme";

const { width } = Dimensions.get("window");
const CARD_W = (width - 24 * 2 - 12) / 2;

export default function StylePicker() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

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

  return (
    <View style={s.root}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={s.header}>
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

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>
          <Text style={s.title}>Escolhe o teu{"\n"}estilo</Text>
          <Text style={s.sub}>Clica no corte que queres experimentar.</Text>

          <View style={s.grid}>
            {STYLES.hairStyles.map((style) => {
              const isSelected = selected === style.id;
              return (
                <TouchableOpacity
                  key={style.id}
                  style={[s.card, isSelected && s.cardSelected]}
                  onPress={() => handleSelect(style.id)}
                  activeOpacity={0.85}
                >
                  {/* Image placeholder */}
                  <View style={[s.cardImg, isSelected && s.cardImgSelected]}>
                    <Text style={s.cardEmoji}>{style.emoji}</Text>
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
        </ScrollView>

        {/* CTA */}
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
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 16,
  },
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

  title: {
    fontFamily: FONTS.display, fontSize: 32,
    color: COLORS.white, letterSpacing: -0.8, marginBottom: 8,
  },
  sub: {
    fontFamily: FONTS.body, fontSize: 14,
    color: COLORS.textSecondary, lineHeight: 22, marginBottom: 24,
  },

  grid: {
    flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 16,
  },
  card: {
    width: CARD_W,
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
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardImgSelected: { backgroundColor: "rgba(181,245,66,0.08)" },
  cardEmoji: { fontSize: 36 },
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

  footer: { paddingHorizontal: 24, paddingBottom: 24 },
  nextBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 17, borderRadius: RADIUS.md, alignItems: "center",
  },
  nextBtnDisabled: { backgroundColor: COLORS.bgElevated },
  nextBtnText: { fontFamily: FONTS.displayBold, fontSize: 16, color: "#0a0a0a" },
  nextBtnTextDisabled: { color: COLORS.textTertiary },
});
