import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, STYLES } from '../constants/theme';
import { isWeb, MAX_WIDTH, pw } from '../constants/responsive';
import WebNav from '../components/WebNav';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const FEATURES = [
  { icon: '📸', num: '01', title: 'Envia a tua selfie', desc: 'Rosto visível, boa iluminação, fundo neutro. Quanto melhor a foto, melhor o resultado.' },
  { icon: '✂️', num: '02', title: 'Escolhe o estilo', desc: '10 cortes com prompts de IA otimizados para testares o look antes de cortar.' },
  { icon: '⚡', num: '03', title: 'Vê o resultado', desc: 'A IA gera o teu novo look em segundos. Compara antes e depois e partilha com os amigos.' },
];

const TESTIMONIALS = [
  { name: 'Miguel S.', location: 'Lisboa', text: 'Fui ao barbeiro sem dúvidas pela primeira vez na vida. Incrível o que a IA consegue fazer.' },
  { name: 'Diogo F.', location: 'Porto', text: 'Experimentei o mid fade antes de ir ao barbeiro. Ficou muito mais fácil decidir.' },
  { name: 'Tomás R.', location: 'Braga', text: 'A minha mulher aprovou o corte antes de eu ir ao barbeiro. Nunca mais houve surpresas.' },
];

const STATS = [   { num: 'Rápido', label: 'Pré-visualiza o corte em poucos passos' },   { num: 'Simples', label: 'Basta uma selfie para começar' },   { num: 'Útil', label: 'Vê o look antes de ir ao barbeiro' },   { num: 'Fácil', label: 'Testa sem complicações' }, ];

export default function Landing() {
  const router = useRouter();
  const W = isWeb ? Math.min(width, MAX_WIDTH) : width;

  return (
    <View style={s.root}>
      <WebNav />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* ── HERO ── */}
        <View style={[s.hero, isWeb && s.heroWeb]}>
          <LinearGradient colors={['rgba(181,245,66,0.07)', 'transparent']} style={StyleSheet.absoluteFill} />
         /* <View style={s.decorCircle} /> */

          {!isWeb && <SafeAreaView />}

          <View style={[s.heroInner, isWeb && s.heroInnerWeb]}>
            {/* Left */}
            <View style={[s.heroLeft, isWeb && s.heroLeftWeb]}>
              <View style={s.heroBadge}>
                <Text style={s.badgeText}>O teu novo look em segundos · Grátis para testar</Text>
              </View>

              <Text style={[s.headline, isWeb && s.headlineWeb]}>
                Vê o teu{'\n'}<Text style={s.headlineAccent}>novo corte</Text>{'\n'}antes de cortar.
              </Text>

              <Text style={[s.sub, isWeb && s.subWeb]}>
                Envia uma selfie, escolhe o estilo e a nossa IA mostra-te como ficas — em segundos. Sem surpresas na cadeira do barbeiro.
              </Text>

              <TouchableOpacity style={[s.ctaBtn, isWeb && s.ctaBtnWeb]} onPress={() => router.push('/app' as any)} activeOpacity={0.85}>
                <Text style={s.ctaText}>Experimentar grátis →</Text>
              </TouchableOpacity>
            </View>

            {/* Right — phone mockup (web only) */}
            {isWeb && (
              <View style={s.heroRight}>
                {/* Outer shell — moldura do telemóvel, sem overflow:hidden para não cortar */}
                <View style={s.phoneMockupOuter}>
                  {/* Notch */}
                  <View style={s.phoneNotchWrapper}>
                    <View style={s.phoneNotch} />
                  </View>

                  {/* Screen content */}
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
                      {STYLES.hairStyles.slice(0, 4).map((style, i) => (
                        <View key={style.id} style={[s.phoneStyleCard, i === 0 && s.phoneStyleSelected]}>
                          <Image source={style.image} style={s.phoneStyleThumb} resizeMode="cover" />
                          <Text style={s.phoneStyleText}>{style.name}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={s.phoneBtn}>
                      <Text style={s.phoneBtnText}>Simular com IA →</Text>
                    </View>
                  </View>

                  {/* Home indicator */}
                  <View style={s.phoneHomeIndicator} />
                </View>
              </View>
            )}
          </View>
        </View>

        {/* ── STATS ── */}
        <View style={s.statsBar}>
          <View style={[s.statsInner, isWeb && s.webInner]}>
            {STATS.map((st, i) => (
              <View key={i} style={[s.statItem, i < STATS.length - 1 && s.statBorder]}>
                <Text style={s.statNum}>{st.num}</Text>
                <Text style={s.statLabel}>{st.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── HOW IT WORKS ── */}
        <View style={[s.section, isWeb && s.sectionWeb]} id="como-funciona">
          <View style={isWeb ? s.webInner : undefined}>
            <Text style={s.eyebrow}>Como funciona</Text>
            <Text style={[s.sectionTitle, isWeb && s.sectionTitleWeb]}>3 passos. Resultado real.</Text>
            <Text style={s.sectionSub}>Sem complicações. Em menos de um minuto tens o teu novo look.</Text>

            <View style={[s.howGrid, isWeb && s.howGridWeb]}>
              {FEATURES.map((f, i) => (
                <View key={i} style={[s.howCard, isWeb && s.howCardWeb]}>
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
        <View style={[s.stylesSection, isWeb && s.sectionWeb]}>
          <View style={isWeb ? s.webInner : undefined}>
            <Text style={s.eyebrow}>Estilos disponíveis</Text>
            <Text style={[s.sectionTitle, isWeb && s.sectionTitleWeb]}>Criados pelos melhores.</Text>
            <View style={[s.stylesGrid, isWeb && s.stylesGridWeb]}>
             {STYLES.hairStyles.map((style) => (
                <View key={style.id} style={[s.styleCard, isWeb && s.styleCardWeb]}>
                  <Image source={style.image} style={s.styleImage} resizeMode="cover" />
                  <Text style={s.styleName}>{style.name}</Text>
                  <Text style={s.styleDesc}>{style.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── TESTIMONIALS ── */}
        <View style={[s.section, isWeb && s.sectionWeb]}>
          <View style={isWeb ? s.webInner : undefined}>
            <Text style={s.eyebrow}>O que dizem</Text>
            <Text style={[s.sectionTitle, isWeb && s.sectionTitleWeb]}>Resultados reais.</Text>
            <View style={[s.testimonialsGrid, isWeb && s.testimonialsGridWeb]}>
              {TESTIMONIALS.map((t, i) => (
                <View key={i} style={[s.testimonialCard, isWeb && s.testimonialCardWeb]}>
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
        <View style={[s.section, isWeb && s.sectionWeb]}>
          <View style={isWeb ? s.webInner : undefined}>
            <View style={s.ctaBox}>
              <LinearGradient colors={['rgba(181,245,66,0.08)', 'transparent']} style={StyleSheet.absoluteFill} />
              <Text style={[s.ctaBoxTitle, isWeb && s.ctaBoxTitleWeb]}>Pronto para o teu{'\n'}novo look?</Text>
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
  hero: { paddingHorizontal: 24, paddingBottom: 48, paddingTop: 32, overflow: 'hidden', position: 'relative' },
  heroWeb: { paddingTop: 130, paddingBottom: 120, paddingHorizontal: 0 },
  heroInner: { flex: 1 },
  heroInnerWeb: {
    maxWidth: MAX_WIDTH,
    marginHorizontal: 'auto' as any,
    paddingHorizontal: 48,
    flexDirection: 'row',
    gap: 80,
    alignItems: 'center',
  },
  heroLeft: {},
  heroLeftWeb: { flex: 1 },
  // heroRight contém o telemóvel — altura mínima garante espaço para o mockup completo
  heroRight: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 620 },
  /* decorCircle: { position: 'absolute', width: 320, height: 320, borderRadius: 160, backgroundColor: 'rgba(181,245,66,0.05)', top: -80, right: -80 }, */ 

  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.accent },
  badgeText: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.accent , fontStyle: 'italic' },

  headline: { fontFamily: FONTS.display, fontSize: 42, color: COLORS.white, lineHeight: 50, letterSpacing: -1.5, marginBottom: 16 },
  headlineWeb: { fontSize: 64, lineHeight: 72, letterSpacing: -2.5, marginBottom: 20 },
  headlineAccent: { color: COLORS.accent },

  sub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 24, marginBottom: 28, maxWidth: 340 },
  subWeb: { fontSize: 17, lineHeight: 28, marginBottom: 36, maxWidth: 460 },

  ctaBtn: { backgroundColor: COLORS.accent, paddingVertical: 16, paddingHorizontal: 28, borderRadius: RADIUS.md, alignItems: 'center', alignSelf: 'stretch' },
  ctaBtnWeb: { alignSelf: 'flex-start', paddingHorizontal: 36 },
  ctaText: { fontFamily: FONTS.displayBold, fontSize: 16, color: '#0a0a0a' },
  ctaHint: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary, textAlign: 'center', marginTop: 10 },

  // ── PHONE MOCKUP ──
  // Outer shell: sem overflow:hidden para o conteúdo não ser cortado
  // A altura é fixa e generosa para comportar todo o conteúdo interno
  phoneMockupOuter: {
    width: 280,
    height: 590,
    backgroundColor: COLORS.bgCard,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
    // Sem overflow: 'hidden' — era isso que cortava o telemóvel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.35,
    shadowRadius: 48,
  },
  // Wrapper do notch garante que fique colado ao topo e centrado sem precisar de overflow
  phoneNotchWrapper: {
    alignItems: 'center',
    paddingTop: 0,
  },
  phoneNotch: {
    width: 110,
    height: 30,
    backgroundColor: COLORS.bg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  // Screen ocupa o espaço restante após o notch
  phoneScreen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    justifyContent: 'space-between', // distribui o conteúdo verticalmente
  },
  phoneHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 14 },
  phoneLogoText: { fontFamily: FONTS.display, fontSize: 13, color: COLORS.white },
  phoneDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.accent },
  phoneTitle: { fontFamily: FONTS.display, fontSize: 16, color: COLORS.white, marginBottom: 2 },
  phoneSub: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textSecondary, marginBottom: 14 },
  phoneUpload: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.accentBorder,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: COLORS.accentDim,
    marginBottom: 14,
    gap: 6,
  },
  phoneUploadText: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textSecondary },


  phoneStylesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
phoneStyleCard: {
  width: '48%' as any,
  backgroundColor: COLORS.bgElevated,
  borderRadius: 8,
  padding: 6,
  borderWidth: 0.5,
  borderColor: COLORS.border,
  alignItems: 'center',
},
phoneStyleSelected: { borderColor: COLORS.accent, backgroundColor: COLORS.accentDim },
phoneStyleThumb: {
  width: '100%',
  height: 56,
  borderRadius: 6,
  marginBottom: 6,
},
phoneStyleText: {
  fontFamily: FONTS.body,
  fontSize: 10,
  color: COLORS.textSecondary,
  textAlign: 'center',
},





  phoneBtn: { backgroundColor: COLORS.accent, borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  phoneBtnText: { fontFamily: FONTS.displayBold, fontSize: 13, color: '#0a0a0a' },
  // Home indicator (barra inferior dos iPhones modernos)
  phoneHomeIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.borderStrong,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 10,
  },

  // ── STATS ──
  statsBar: { borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: COLORS.border },
  statsInner: { flexDirection: 'row' },
  webInner: { maxWidth: MAX_WIDTH, width: '100%', marginHorizontal: 'auto' as any, paddingHorizontal: 48 },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 24 },
  statBorder: { borderRightWidth: 0.5, borderRightColor: COLORS.border },
  statNum: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.accent, letterSpacing: -0.5 },
  statLabel: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },

  // ── SECTIONS ──
  section: { paddingHorizontal: 24, paddingVertical: 52 },
  sectionWeb: { paddingHorizontal: 0, paddingVertical: 100 },
  eyebrow: { fontFamily: FONTS.bodyMedium, fontSize: 11, color: COLORS.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 },
  sectionTitle: { fontFamily: FONTS.display, fontSize: 30, color: COLORS.white, letterSpacing: -0.8, marginBottom: 12 },
  sectionTitleWeb: { fontSize: 48, letterSpacing: -1.5, marginBottom: 16 },
  sectionSub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 24, marginBottom: 40, maxWidth: 480 },

  // ── HOW IT WORKS ──
  howGrid: { gap: 12 },
  howGridWeb: { flexDirection: 'row', gap: 24 },
  howCard: { backgroundColor: COLORS.bgCard, borderWidth: 0.5, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: 24, position: 'relative' },
  howCardWeb: { flex: 1 },

  howNum: {
  position: 'absolute',
  top: 16,
  right: 20,
  fontFamily: FONTS.display,
  fontSize: 48,
  color: COLORS.accent,
  lineHeight: 52,
},

  howIcon: { fontSize: 32, marginBottom: 14 },
  howTitle: { fontFamily: FONTS.displayBold, fontSize: 18, color: COLORS.white, marginBottom: 8 },
  howDesc: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },

  // ── STYLES ──
stylesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
stylesGridWeb: { flexWrap: 'wrap', gap: 16 },
styleCard: {
  backgroundColor: COLORS.bgElevated,
  borderWidth: 1.5,
  borderColor: COLORS.border,
  borderRadius: RADIUS.md,
  padding: 12,
  alignItems: 'center',
  width: '48%' as any,
},
styleCardWeb: {
  width: 180,
  paddingVertical: 16,
},
styleImage: {
  width: '100%',
  height: 100,
  borderRadius: 10,
  marginBottom: 10,
},
styleName: { fontFamily: FONTS.displayBold, fontSize: 13, color: COLORS.white, marginBottom: 3, textAlign: 'center' },
styleDesc: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary, textAlign: 'center' },

  // ── TESTIMONIALS ──
  testimonialsGrid: { gap: 12 },
  testimonialsGridWeb: { flexDirection: 'row', gap: 20 },
  testimonialCard: { backgroundColor: COLORS.bgCard, borderWidth: 0.5, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: 24 },
  testimonialCardWeb: { flex: 1 },
  tStars: { color: COLORS.accent, fontSize: 14, marginBottom: 12, letterSpacing: 2 },
  tText: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 24, fontStyle: 'italic', marginBottom: 16 },
  tAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.bgElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: COLORS.border },
  tName: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.white },
  tLocation: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary },

  // ── CTA BOX ──
  ctaBox: { borderWidth: 0.5, borderColor: COLORS.accentBorder, borderRadius: RADIUS.xl, padding: 40, alignItems: 'center', overflow: 'hidden', position: 'relative' },
  ctaBoxTitle: { fontFamily: FONTS.display, fontSize: 30, color: COLORS.white, letterSpacing: -0.8, textAlign: 'center', marginBottom: 10, lineHeight: 38 },
  ctaBoxTitleWeb: { fontSize: 48, letterSpacing: -1.5, lineHeight: 56 },
  ctaBoxSub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, marginBottom: 28, textAlign: 'center' },
  ctaBoxActions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  outlineBtn: { paddingVertical: 15, paddingHorizontal: 28, borderRadius: RADIUS.md, borderWidth: 0.5, borderColor: COLORS.borderStrong },
  outlineBtnText: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary },
});
