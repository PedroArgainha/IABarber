import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { isWeb, MAX_WIDTH } from '../constants/responsive';
import { useResponsive } from '../constants/responsive';
import WebNav from '../components/WebNav';
import Footer from '../components/Footer';

const VALUES = [
  { icon: '🎯', title: 'Foco no utilizador', desc: 'Cada decisão começa com: faz a vida do cliente mais fácil? Se a resposta não for sim, não fazemos.' },
  { icon: '⚡', title: 'Velocidade com qualidade', desc: 'Iteramos rápido, mas nunca sacrificamos a experiência. Um produto rápido e mau é pior do que lento e bom.' },
  { icon: '🇵🇹', title: 'Orgulhosamente português', desc: 'Construído em Portugal, para o mundo. Acreditamos que o talento português cria produtos de classe mundial.' },
];

const SOCIALS = [
  { icon: '𝕏', label: 'Twitter / X', handle: '@handle', url: 'https://twitter.com' },
  { icon: 'in', label: 'LinkedIn', handle: 'linkedin.com/in/...', url: 'https://linkedin.com' },
  { icon: '@', label: 'Instagram', handle: '@handle', url: 'https://instagram.com' },
];

export default function About() {
  const router = useRouter();
  const { isMobile, isTablet, isDesktop, px } = useResponsive();

  const sectionPadV = isMobile ? 48 : 100;
  const innerStyle = isWeb
    ? { maxWidth: MAX_WIDTH, width: '100%' as any, marginHorizontal: 'auto' as any, paddingHorizontal: px }
    : { paddingHorizontal: 24 };

  return (
    <View style={s.root}>
      <WebNav />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {!isWeb && (
          <SafeAreaView>
            <View style={s.mobileNav}>
              <TouchableOpacity onPress={() => router.back()}><Text style={s.backText}>← Voltar</Text></TouchableOpacity>
              <Text style={s.logo}><Text style={s.accent}>777</Text> HairVision</Text>
            </View>
          </SafeAreaView>
        )}

        {/* HERO */}
        <View style={[s.hero, { paddingVertical: isMobile ? 40 : 120 }]}>
          <LinearGradient colors={['rgba(181,245,66,0.06)', 'transparent']} style={StyleSheet.absoluteFill} />
          <View style={innerStyle}>
            <Text style={s.eyebrow}>A nossa história</Text>
            <Text style={[s.heroTitle, { fontSize: isMobile ? 32 : isTablet ? 48 : 60, lineHeight: isMobile ? 40 : isTablet ? 56 : 68 }]}>
              Criado por quem{'\n'}<Text style={s.accent}>vive na barbearia.</Text>
            </Text>
            <Text style={[s.heroSub, { fontSize: isMobile ? 15 : 18 }]}>
              A 777 HairVision nasceu de uma frustração real — chegar ao barbeiro, pedir um corte, e receber algo completamente diferente do que imaginaste.
            </Text>
          </View>
        </View>

        {/* FOUNDER */}
        <View style={{ paddingVertical: sectionPadV }}>
          <View style={[innerStyle, isDesktop && { flexDirection: 'row', gap: 80, alignItems: 'flex-start' }]}>

            {/* Card */}
            <View style={[s.founderCard, isDesktop && { width: 360 }]}>
              <View style={s.avatarWrap}>
                <View style={s.avatar}><Text style={{ fontSize: 56 }}>👤</Text></View>
                <View style={s.avatarBadge}><Text style={s.avatarBadgeText}>Founder & CEO</Text></View>
              </View>
              <Text style={s.founderName}>Gustavo Correia</Text>
              <Text style={s.founderRole}>777 HairVision · Fundador</Text>
              <View style={s.tagsRow}>
                {['Empreendedor', 'Barbearia', 'Outro'].map((t) => (
                  <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
                ))}
              </View>
              <View style={s.socials}>
                {SOCIALS.map((soc) => (
                  <TouchableOpacity key={soc.label} style={s.socialBtn} onPress={() => Linking.openURL(soc.url)}>
                    <Text style={s.socialIcon}>{soc.icon}</Text>
                    <Text style={s.socialLabel}>{soc.label}</Text>
                    <Text style={s.socialHandle}>{soc.handle}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bio */}
            <View style={[isDesktop && { flex: 1 }, !isDesktop && { marginTop: 32 }]}>
              <Text style={s.eyebrow}>O fundador</Text>
              <Text style={[s.bioTitle, { fontSize: isMobile ? 24 : 34, lineHeight: isMobile ? 32 : 42 }]}>
                Uma ideia simples que resolveu um problema real.
              </Text>
              <Text style={s.bioText}>Passei anos a ir ao barbeiro sem saber exatamente o que queria — ou pior, sem conseguir comunicar o que tinha na cabeça. Mostrava uma foto, dizia <Text style={s.bioStrong}>"quero assim"</Text>, e saía com algo completamente diferente.</Text>
              <View style={s.quoteBlock}>
                <Text style={s.quoteText}>"Depois de uma vez mais uma decepção, pensei: tem de haver uma forma melhor de fazer isto."</Text>
              </View>
              <Text style={s.bioText}>A ideia surgiu numa tarde de domingo. E se conseguisse ver como ficava com um corte <Text style={s.bioStrong}>antes</Text> de o fazer? Juntei a paixão por tecnologia com o mundo da barbearia e criei a <Text style={s.bioStrong}>777 HairVision</Text>.</Text>
              <Text style={s.bioText}>A missão é simples: <Text style={s.bioStrong}>dar a cada pessoa a confiança de saber exatamente como vai ficar antes de sentar na cadeira.</Text></Text>
            </View>
          </View>
        </View>

        {/* MISSION */}
        <View style={[s.missionSection, { paddingVertical: sectionPadV }]}>
          <View style={[innerStyle, isDesktop && { flexDirection: 'row', gap: 80, alignItems: 'center' }]}>
            <View style={isDesktop ? { flex: 1 } : {}}>
              <Text style={s.eyebrow}>A nossa missão</Text>
              <Text style={[s.sectionTitle, { fontSize: isMobile ? 26 : 40 }]}>Acabar com as surpresas na cadeira do barbeiro.</Text>
              <Text style={s.sectionSub}>Acreditamos que cada pessoa merece chegar ao barbeiro com confiança — sabendo exatamente o que quer e como vai ficar.</Text>
            </View>
            <View style={[s.missionNums, isDesktop ? { flex: 1 } : { marginTop: 24 }]}>
              {[['10K+', 'Utilizadores'], ['50K+', 'Looks gerados'], ['4.9★', 'Avaliação'], ['<10s', 'Resposta IA']].map(([n, l]) => (
                <View key={n} style={s.missionNumCard}>
                  <Text style={s.missionNum}>{n}</Text>
                  <Text style={s.missionNumLabel}>{l}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* VALUES */}
        <View style={{ paddingVertical: sectionPadV }}>
          <View style={innerStyle}>
            <Text style={s.eyebrow}>Os nossos valores</Text>
            <Text style={[s.sectionTitle, { fontSize: isMobile ? 26 : 40 }]}>O que nos guia todos os dias.</Text>
            <View style={[s.valuesGrid, !isMobile && s.valuesGridWeb]}>
              {VALUES.map((v) => (
                <View key={v.title} style={[s.valueCard, !isMobile && s.valueCardWeb]}>
                  <Text style={s.valueIcon}>{v.icon}</Text>
                  <Text style={s.valueTitle}>{v.title}</Text>
                  <Text style={s.valueDesc}>{v.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={{ paddingVertical: sectionPadV }}>
          <View style={innerStyle}>
            <View style={s.ctaBox}>
              <LinearGradient colors={['rgba(181,245,66,0.08)', 'transparent']} style={StyleSheet.absoluteFill} />
              <Text style={[s.ctaTitle, { fontSize: isMobile ? 26 : 40 }]}>Pronto para experimentar?</Text>
              <Text style={s.ctaSub}>Sem registo. Sem cartão. Grátis agora.</Text>
              <View style={s.ctaActions}>
                <TouchableOpacity style={s.ctaBtn} onPress={() => router.push('/app' as any)} activeOpacity={0.85}>
                  <Text style={s.ctaBtnText}>Experimentar grátis →</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.outlineBtn} onPress={() => router.push('/')}>
                  <Text style={s.outlineBtnText}>← Voltar ao início</Text>
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
  mobileNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 12 },
  backText: { fontFamily: FONTS.bodyMedium, fontSize: 14, color: COLORS.textSecondary },
  logo: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.white },
  accent: { color: COLORS.accent },

  hero: { overflow: 'hidden', position: 'relative' },
  eyebrow: { fontFamily: FONTS.bodyMedium, fontSize: 11, color: COLORS.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  heroTitle: { fontFamily: FONTS.display, color: COLORS.white, letterSpacing: -1, marginBottom: 16 },
  heroSub: { fontFamily: FONTS.body, color: COLORS.textSecondary, lineHeight: 26, maxWidth: 560 },

  sectionTitle: { fontFamily: FONTS.display, color: COLORS.white, letterSpacing: -0.8, marginBottom: 16, lineHeight: 1.2 * 40 },
  sectionSub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 24, maxWidth: 480 },

  founderCard: { backgroundColor: COLORS.bgCard, borderWidth: 0.5, borderColor: COLORS.accentBorder, borderRadius: 24, padding: 28, marginBottom: 0 },
  avatarWrap: { position: 'relative', marginBottom: 20 },
  avatar: { width: '100%', aspectRatio: 1, borderRadius: 16, backgroundColor: COLORS.bgElevated, borderWidth: 0.5, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  avatarBadge: { position: 'absolute', bottom: 12, right: 12, backgroundColor: COLORS.accent, borderRadius: 99, paddingHorizontal: 14, paddingVertical: 6 },
  avatarBadgeText: { fontFamily: FONTS.displayBold, fontSize: 11, color: '#0a0a0a' },
  founderName: { fontFamily: FONTS.display, fontSize: 24, color: COLORS.white, letterSpacing: -0.5, marginBottom: 4 },
  founderRole: { fontFamily: FONTS.body, fontSize: 13, color: COLORS.accent, marginBottom: 18 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { borderWidth: 0.5, borderColor: COLORS.border, borderRadius: 99, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textSecondary },
  socials: { gap: 8 },
  socialBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: RADIUS.md, backgroundColor: COLORS.bgElevated, borderWidth: 0.5, borderColor: COLORS.border },
  socialIcon: { fontFamily: FONTS.bodyMedium, fontSize: 15, color: COLORS.textSecondary, width: 20 },
  socialLabel: { fontFamily: FONTS.bodyMedium, fontSize: 13, color: COLORS.textSecondary, flex: 1 },
  socialHandle: { fontFamily: FONTS.body, fontSize: 11, color: COLORS.textTertiary },

  bioTitle: { fontFamily: FONTS.display, color: COLORS.white, letterSpacing: -0.5, marginBottom: 20 },
  bioText: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, lineHeight: 26, marginBottom: 16 },
  bioStrong: { color: COLORS.white, fontFamily: FONTS.bodyMedium },
  quoteBlock: { borderLeftWidth: 2, borderLeftColor: COLORS.accent, paddingLeft: 20, paddingVertical: 16, marginVertical: 20, backgroundColor: COLORS.accentDim, borderRadius: 8 },
  quoteText: { fontFamily: FONTS.body, fontSize: 17, color: COLORS.white, lineHeight: 28, fontStyle: 'italic' },

  missionSection: { backgroundColor: COLORS.bgCard, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: COLORS.border },
  missionNums: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  missionNumCard: { backgroundColor: COLORS.bgElevated, borderWidth: 0.5, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: 24, minWidth: 130, flex: 1 },
  missionNum: { fontFamily: FONTS.display, fontSize: 32, color: COLORS.accent, letterSpacing: -1, marginBottom: 4 },
  missionNumLabel: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary },

  valuesGrid: { gap: 12, marginTop: 32 },
  valuesGridWeb: { flexDirection: 'row', gap: 20 },
  valueCard: { backgroundColor: COLORS.bgCard, borderWidth: 0.5, borderColor: COLORS.border, borderRadius: RADIUS.lg, padding: 28 },
  valueCardWeb: { flex: 1 },
  valueIcon: { fontSize: 28, marginBottom: 14 },
  valueTitle: { fontFamily: FONTS.displayBold, fontSize: 17, color: COLORS.white, marginBottom: 8 },
  valueDesc: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },

  ctaBox: { borderWidth: 0.5, borderColor: COLORS.accentBorder, borderRadius: 24, padding: 40, alignItems: 'center', overflow: 'hidden', position: 'relative' },
  ctaTitle: { fontFamily: FONTS.display, color: COLORS.white, letterSpacing: -0.8, textAlign: 'center', marginBottom: 10 },
  ctaSub: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary, marginBottom: 28, textAlign: 'center' },
  ctaActions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  ctaBtn: { backgroundColor: COLORS.accent, paddingVertical: 15, paddingHorizontal: 32, borderRadius: RADIUS.md },
  ctaBtnText: { fontFamily: FONTS.displayBold, fontSize: 15, color: '#0a0a0a' },
  outlineBtn: { paddingVertical: 15, paddingHorizontal: 28, borderRadius: RADIUS.md, borderWidth: 0.5, borderColor: COLORS.borderStrong },
  outlineBtnText: { fontFamily: FONTS.body, fontSize: 15, color: COLORS.textSecondary },
});
