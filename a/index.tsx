import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, STYLES } from '../constants/theme';
import { isWeb, MAX_WIDTH } from '../constants/responsive';
import { useResponsive } from '../constants/responsive';
import WebNav from '../components/WebNav';
import Footer from '../components/Footer';

const { width: SW } = Dimensions.get('window');

const FEATURES = [
  { icon: '📸', num: '01', title: 'Envia a tua selfie', desc: 'Rosto visível, boa iluminação, fundo neutro. Quanto melhor a foto, melhor o resultado.' },
  { icon: '✂️', num: '02', title: 'Escolhe o estilo', desc: '6 cortes curados pelos melhores barbeiros. Cada um com prompt de IA otimizado.' },
  { icon: '⚡', num: '03', title: 'Vê o resultado', desc: 'A IA gera o teu novo look em segundos. Compara antes e depois e partilha com os amigos.' },
];

const TESTIMONIALS = [
  { name: 'Miguel S.', location: 'Lisboa', text: 'Fui ao barbeiro sem dúvidas pela primeira vez na vida. Incrível o que a IA consegue fazer.' },
  { name: 'Diogo F.', location: 'Porto', text: 'Experimentei o platinado antes de fazer. A minha namorada aprovou. Valeu cada cêntimo.' },
  { name: 'Tomás R.', location: 'Braga', text: 'A minha mulher aprovou o corte antes de eu ir ao barbeiro. Nunca mais houve surpresas.' },
];

// Propostas de valor reais — sem números falsos
const VALUE_PROPS = [
  { icon: '⚡', label: 'Resultado em segundos' },
  { icon: '🔒', label: 'Foto não guardada' },
  { icon: '✂️', label: '6 estilos disponíveis' },
  { icon: '🎯', label: 'Sem registo necessário' },
];

export default function Landing() {
  const router = useRouter();
  const { isMobile, isTablet, isDesktop, px, width } = useResponsive();

  const heroRow = isDesktop;
  const howRow = !isMobile;
  const testimonialsRow = !isMobile;
  const stylesRow = isDesktop;

  const sectionPadV = isMobile ? 52 : 100;
  const innerStyle = isWeb
    ? { maxWidth: MAX_WIDTH, width: '100%' as any, marginHorizontal: 'auto' as any, paddingHorizontal: px }
    : undefined;

  return (
    <View style={s.root}>
      <WebNav />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* ── HERO ── */}
        <View style={[
          s.hero,
          { paddingTop: isWeb ? (isMobile ? 90 : 130) : 32, paddingBottom: isMobile ? 48 : 120 },
        ]}>
          <LinearGradient colors={['rgba(181,245,66,0.07)', 'transparent']} style={StyleSheet.absoluteFill} />
          <View style={s.decorCircle} />
          {!isWeb && <SafeAreaView />}

          <View style={[
            s.heroInner,
            innerStyle,
            heroRow && { flexDirection: 'row', gap: 80, alignItems: 'center' },
          ]}>
            {/* Left */}
            <View style={heroRow ? { flex: 1 } : {}}>
              <View style={s.heroBadge}>
                <Text style={s.badgeText}>O teu novo look em segundos · Grátis para testar</Text>
              </View>

              <Text style={[
                s.headline,
                { fontSize: isMobile ? 38 : isTablet ? 52 : 64, lineHeight: isMobile ? 46 : isTablet ? 60 : 72 },
              ]}>
                Vê o teu{'\n'}<Text style={s.headlineAccent}>novo corte</Text>{'\n'}antes de cortar.
              </Text>

              <Text style={[
                s.sub,
                { fontSize: isMobile ? 15 : 17, lineHeight: isMobile ? 24 : 28, marginBottom: isMobile ? 28 : 36 },
              ]}>
                Envia uma selfie, escolhe o estilo e a nossa IA mostra-te como ficas — em segundos. Sem surpresas na cadeira do barbeiro.
              </Text>

              <TouchableOpacity
                style={[s.ctaBtn, !isMobile && s.ctaBtnWeb]}
                onPress={() => router.push('/app' as any)}
                activeOpacity={0.85}
              >
                <Text style={s.ctaText}>Experimentar grátis →</Text>
              </TouchableOpacity>
              <Text style={s.ctaHint}>Sem registo. Sem cartão. Grátis agora.</Text>
            </View>

            {/* Right — phone mockup (tablet + desktop) */}
            {!isMobile && (
              <View style={[s.heroRight, isTablet && { flex: 0 }]}>
                <View style={s.phoneMockupOuter}>
                  <View style={s.phoneNotchWrapper}>
                    <View style={s.phoneNotch} />
                  </View>
                  <View style={s.phoneScreen}>
                    <View style={s.phoneHeader}>
                      <Text style={s.phoneLogoText}>
                        <Text style={{ color: COLORS.accent }}>777</Text> HairVision
                      </Text>
                      <View style={s.phoneDot} />
                    </View>
                    <Text style={s.phoneTitle}>A tua selfie</Text>
                    <Text style={s.phoneSub}>Rosto visível, boa iluminação</Text>
                    <View style={s.phoneUpload}>
                      <Text style={{ fontSize: 28 }}>📸</Text>
                      <Text style={s.phoneUploadText}>Clica para enviar foto</Text>
                    </View>
                    <View style={s.phoneStylesGrid}>
                      {['✂️ Low Fade', '💈 Burst Fade', '🎸 Mullet', '⚡ Platinado'].map((st, i) => (
                        <View key={i} style={[s.phoneStyleCard, i === 1 && s.phoneStyleSelected]}>
                          <Text style={s.phoneStyleText}>{st}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={s.phoneBtn}>
                      <Text style={s.phoneBtnText}>Simular com IA →</Text>
                    </View>
                  </View>
                  <View style={s.phoneHomeIndicator} />
                </View>
              </View>
            )}
          </View>
        </View>

        {/* ── VALUE PROPS (substitui stats falsos) ── */}
        <View style={s.valueBar}>
          <View style={[s.valueInner, innerStyle]}>
            {VALUE_PROPS.map((v, i) => (
              <View key={i} style={[s.valueProp, i < VALUE_PROPS.length - 1 && s.valuePropBorder]}>
                <Text style={s.valuePropIcon}>{v.icon}</Text>
                <Text style={s.valuePropLabel}>{v.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── HOW IT WORKS ── */}
        <View style={{ paddingHorizontal: isWeb ? 0 : 24, paddingVertical: sectionPadV }}>
          <View style={innerStyle}>
            <Text style={s.eyebrow}>Como funciona</Text>
            <Text style={[s.sectionTitle, !isMobile && s.sectionTitleWeb]}>3 passos. Resultado real.</Text>
            <Text style={s.sectionSub}>Sem complicações. Em menos de um minuto tens o teu novo look na frente.</Text>

            <View style={[s.howGrid, howRow && s.howGridWeb]}>
              {FEATURES.map((f, i) => (
                <View key={i} style={[s.howCard, howRow && s.howCardWeb]}>
                  <Text style={s.howNum}>{f.num}</Text>
                  <Text style={s.howIcon}>{f.icon}</Text>
                  <Text style={s.howTitle}>{f.title}</Text>
                  <Text style={s.howDesc}>{f.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── STYLES ── */}
        <View style={[s.stylesSection, { paddingHorizontal: isWeb ? 0 : 24, paddingVertical: sectionPadV }]}>
          <View style={innerStyle}>
            <Text style={s.eyebrow}>Estilos disponíveis</Text>
            <Text style={[s.sectionTitle, !isMobile && s.sectionTitleWeb]}>Curados pelos melhores.</Text>
            <View style={[s.stylesGrid, stylesRow && s.stylesGridWeb]}>
              {STYLES.hairStyles.map((style) => (
                <View key={style.id} style={[
                  s.styleCard,
                  stylesRow ? s.styleCardWeb : {
                    width: isMobile
                      ? (SW - 24 * 2 - 10) / 2
                      : (width - px * 2 - 10 * 2) / 3,
                  },
                ]}>
                  <Text style={s.styleEmoji}>{style.emoji}</Text>
                  <Text style={s.styleName}>{style.name}</Text>
                  <Text style={s.styleDesc}>{style.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── TESTIMONIALS ── */}
        <View style={{ paddingHorizontal: isWeb ? 0 : 24, paddingVertical: sectionPadV }}>
          <View style={innerStyle}>
            <Text style={s.eyebrow}>O que dizem</Text>
            <Text style={[s.sectionTitle, !isMobile && s.sectionTitleWeb]}>Resultados reais.</Text>
            <View style={[s.testimonialsGrid, testimonialsRow && s.testimonialsGridWeb]}>
              {TESTIMONIALS.map((t, i) => (
                <View key={i} style={[s.testimonialCard, testimonialsRow && s.testimonialCardWeb]}>
                  <Text style={s.tStars}>★★★★★</Text>
                  <Text style={s.tText}>"{t.text}"</Text>
                  <View style={s.tAuthor}>
                    <View style={s.tAvatar}>
                      <Text style={{ fontSize: 16 }}>👤</Text>
                    </View>
                    <View>
                      <Text style={s.tName}>{t.name}</Text>
                      <Text style={s.tLocation}>{t.location}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── CTA FINAL ── */}
        <View style={{ paddingHorizontal: isWeb ? 0 : 24, paddingVertical: sectionPadV }}>
          <View style={innerStyle}>
            <View style={s.ctaBox}>
              <LinearGradient colors={['rgba(181,245,66,0.08)', 'transparent']} style={StyleSheet.absoluteFill} />
              <Text style={[s.ctaBoxTitle, !isMobile && s.ctaBoxTitleWeb]}>
                Pronto para o teu{'\n'}novo look?
              </Text>
              <Text style={s.ctaBoxSub}>Sem registo. Sem cartão. Grátis agora.</Text>
              <View style={s.ctaBoxActions}>
                <TouchableOpacity style={s.ctaBtn} onPress={() => router.push('/app' as any)} activeOpacity={0.85}>
                  <Text style={s.ctaText}>Experimentar grátis →</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.outlineBtn} onPress={() => router.push('/about')}>
                  <Text style={s.outlineBtnText}>Conhece a equipa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  // ── HERO ──
  hero: { paddingHorizontal: 24, overflow: 'hidden', position: 'relative' },
  heroInner: { flex: 1 },
  decorCircle: {
    position: 'absolute', width: 320, height: 320, borderRadius: 160,
    backgroundColor: 'rgba(181,245,66,0.05)', top: -80, right: -80,
  },

  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  badgeText: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.accent, fontStyle: 'italic' },

  headline: { fontFamily: FONTS.display, color: COLORS.white, letterSpacing: -1.5, marginBottom: 16 },
  headlineAccent: { color: COLORS.accent },

  sub: { fontFamily: FONTS.body, color: COLORS.textSecondary, maxWidth: 460 },

  ctaBtn: {
    backgroundColor: COLORS.accent, paddingVertical: 16, paddingHorizontal: 28,
    borderRadius: RADIUS.md, alignItems: 'center', alignSelf: 'stretch',
  },
  ctaBtnWeb: { alignSelf: 'flex-start', paddingHorizontal: 36 },
  ctaText: { fontFamily: FONTS.displayBold, fontSize: 16, color: '#0a0a0a' },
  ctaHint: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary, textAlign: 'center', marginTop: 10 },

  // ── PHONE MOCKUP ──
  heroRight: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 580 },
  phoneMockupOuter: {
    width: 260, height: 550,
    backgroundColor: COLORS.bgCard,
    borderRadius: 40, borderWidth: 1, borderColor: COLORS.borderStrong,
    shadowColor: '#000', shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.35, shadowRadius: 48,
  },
  phoneNotchWrapper: { alignItems: 'center' },
  phoneNotch: {
    width: 110, height: 30, backgroundColor: COLORS.bg,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  phoneScreen: {
    flex: 1, paddingHorizontal: 16, paddingTop: 12,
    paddingBottom: 16, justifyContent: 'space-between',
  },
  phoneHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 14,
  },
  phoneLogoText: { fontFamily: FONTS.display, fontSize: 13, color: COLORS.white },
  phoneDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent },
  phoneTitle: { fontFamily: FONTS.display, fontSize: 16, color: COLORS.white, marginBottom: 2 },
  phoneSub: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textSecondary, marginBottom: 14 },
  phoneUpload: {
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: COLORS.accentBorder,
    borderRadius: 12, paddingVertical: 20, alignItems: 'center',
    backgroundColor: COLORS.accentDim, marginBottom: 14, gap: 6,
  },
  phoneUploadText: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textSecondary },
  phoneStylesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  phoneStyleCard: {
    backgroundColor: COLORS.bgElevated, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 7,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  phoneStyleSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDim },
  phoneStyleText: { fontFamily: FONTS.body, fontSize: 10, color: COLORS.textSecondary },
  phoneBtn: { backgroundColor: COLORS.accent, borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  phoneBtnText: { fontFamily: FONTS.displayBold, fontSize: 13, color: '#0a0a0a' },
  phoneHomeIndicator: {
    width: 120, height: 4, borderRadius: 2,
    backgroundColor: COLORS.borderStrong,
    alignSelf: 'center', marginTop: 8, marginBottom: 10,
  },

  // ── VALUE PROPS ──
  valueBar: { borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: COLORS.border },
  valueInner: { flexDirection: 'row' },
  valueProp: { flex: 1, alignItems: 'center', paddingVertical: 20, gap: 6 },
  valuePropBorder: { borderRightWidth: 0.5, borderRightColor: COLORS.border },
  valuePropIcon: { fontSize: 18 },
  valuePropLabel: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textSecondary, textAlign: 'center' },

  // ── SECTIONS ──
  eyebrow: {
    fontFamily: FONTS.bodyMedium, fontSize: 11, color: COLORS.accent,
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10,
  },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 28, color: COLORS.white, letterSpacing: -0.8, marginBottom: 12 },
  sectionTitleWeb: { fontSize: 44, letterSpacing: -1.5, marginBottom: 16 },
  sectionSub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 24, marginBottom: 40, maxWidth: 480 },

  // ── HOW IT WORKS ──
  howGrid: { gap: 12 },
  howGridWeb: { flexDirection: 'row', gap: 24 },
  howCard: {
    backgroundColor: COLORS.bgCard, borderWidth: 0.5, borderColor: COLORS.border,
    borderRadius: RADIUS.lg, padding: 24, position: 'relative',
  },
  howCardWeb: { flex: 1 },
  howNum: {
    position: 'absolute', top: 16, right: 20,
    fontFamily: FONTS.display, fontSize: 48, color: 'rgba(181,245,66,0.1)', lineHeight: 52,
  },
  howIcon: { fontSize: 32, marginBottom: 14 },
  howTitle: { fontFamily: FONTS.displayBold, fontSize: 18, color: COLORS.white, marginBottom: 8 },
  howDesc: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },

  // ── STYLES ──
  stylesSection: {
    backgroundColor: COLORS.bgCard,
    borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: COLORS.border,
  },
  stylesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stylesGridWeb: { flexWrap: 'nowrap' },
  styleCard: {
    backgroundColor: COLORS.bgElevated, borderWidth: 1.5, borderColor: COLORS.border,
    borderRadius: RADIUS.md, padding: 16, alignItems: 'center',
  },
  styleCardWeb: { flex: 1, paddingVertical: 24 },
  styleEmoji: { fontSize: 28, marginBottom: 8 },
  styleName: { fontFamily: FONTS.displayBold, fontSize: 13, color: COLORS.white, marginBottom: 3, textAlign: 'center' },
  styleDesc: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary, textAlign: 'center' },

  // ── TESTIMONIALS ──
  testimonialsGrid: { gap: 12 },
  testimonialsGridWeb: { flexDirection: 'row', gap: 20 },
  testimonialCard: {
    backgroundColor: COLORS.bgCard, borderWidth: 0.5, borderColor: COLORS.border,
    borderRadius: RADIUS.lg, padding: 24,
  },
  testimonialCardWeb: { flex: 1 },
  tStars: { color: COLORS.accent, fontSize: 14, marginBottom: 12, letterSpacing: 2 },
  tText: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 24, fontStyle: 'italic', marginBottom: 16 },
  tAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tAvatar: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.bgElevated,
    alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: COLORS.border,
  },
  tName: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.white },
  tLocation: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary },

  // ── CTA BOX ──
  ctaBox: {
    borderWidth: 0.5, borderColor: COLORS.accentBorder, borderRadius: RADIUS.xl,
    padding: 40, alignItems: 'center', overflow: 'hidden', position: 'relative',
  },
  ctaBoxTitle: {
    fontFamily: FONTS.display, fontSize: 28, color: COLORS.white,
    letterSpacing: -0.8, textAlign: 'center', marginBottom: 10, lineHeight: 36,
  },
  ctaBoxTitleWeb: { fontSize: 44, letterSpacing: -1.5, lineHeight: 52 },
  ctaBoxSub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, marginBottom: 28, textAlign: 'center' },
  ctaBoxActions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  outlineBtn: {
    paddingVertical: 15, paddingHorizontal: 28, borderRadius: RADIUS.md,
    borderWidth: 0.5, borderColor: COLORS.borderStrong,
  },
  outlineBtnText: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary },
});
