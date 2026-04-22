import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { isWeb, MAX_WIDTH, useResponsive } from '../constants/responsive';
import WebNav from '../components/WebNav';
import Footer from '../components/Footer';

// ─────────────────────────────────────────────
// TO ADD PHOTOS:
//   1. Drop the image files into your assets folder
//   2. Replace `null` with require('../assets/images/gustavo.jpg') etc.
//   3. The avatar placeholder disappears automatically when a source is set
// ─────────────────────────────────────────────
const FOUNDER = {
  name: 'Gustavo Correia',
  role: '777 HairVision · Fundador',
  badge: 'Founder & CEO',
  photo: null as any,
  tags: ['Empreendedor', 'Barbearia', 'Visão'],
};

const DEVELOPERS = [
  {
    name: 'Tomás Melo',
    role: 'Web Developer',
    badge: 'Web Dev',
    photo: null as any,
    bio: 'Responsável pelo desenvolvimento da interface web, focando-se na experiência do utilizador, estrutura visual e integração da plataforma.',
  },
  {
    name: 'Pedro Argainha',
    role: 'Web Developer',
    badge: 'Web Dev',
    photo: null as any,
    bio: 'Responsável pela implementação técnica da aplicação web, garantindo desempenho, organização do código e uma navegação fluida.',
  },
];

const VALUES = [
  {
    icon: '🎯',
    title: 'Foco no utilizador',
    desc: 'Cada decisão começa com: faz a vida do cliente mais fácil? Se a resposta não for sim, não fazemos.',
  },
  {
    icon: '⚡',
    title: 'Velocidade com qualidade',
    desc: 'Iteramos rápido, mas nunca sacrificamos a experiência. Um produto rápido e mau é pior do que lento e bom.',
  },
  {
    icon: '🇵🇹',
    title: 'Orgulhosamente português',
    desc: 'Construído em Portugal, para o mundo. Acreditamos que o talento português cria produtos de classe mundial.',
  },
];

const MISSION_STORY = [
  {
    title: 'O problema',
    text: 'Muita gente chega ao barbeiro sem conseguir explicar exatamente o que quer — e sai com algo diferente do que imaginava.',
  },
  {
    title: 'A ideia',
    text: 'Usar tecnologia para mostrar o corte antes da tesoura tocar no cabelo, tornando a decisão mais simples e visual.',
  },
  {
    title: 'O resultado',
    text: 'Mais clareza, mais confiança e uma experiência muito mais tranquila antes de cada corte.',
  },
];

const SOCIALS = [
  { icon: '𝕏', label: 'Twitter / X', handle: '@handle', url: 'https://twitter.com' },
  { icon: 'in', label: 'LinkedIn', handle: 'linkedin.com/in/...', url: 'https://linkedin.com' },
  { icon: '@', label: 'Instagram', handle: '@handle', url: 'https://instagram.com/777gustavocorrei.l' },
];

function PersonAvatar({
  photo,
  badge,
  accentBadge = false,
  compact = false,
}: {
  photo: any;
  badge: string;
  accentBadge?: boolean;
  compact?: boolean;
}) {
  return (
    <View style={[av.wrap, compact && av.wrapCompact]}>
      {photo ? (
        <Image source={photo} style={av.image} resizeMode="cover" />
      ) : (
        <View style={av.placeholder}>
          <Text style={av.placeholderIcon}>👤</Text>
        </View>
      )}

      <View style={[av.badge, accentBadge && av.badgeAccent]}>
        <Text style={[av.badgeText, accentBadge && av.badgeTextAccent]}>{badge}</Text>
      </View>
    </View>
  );
}

const av = StyleSheet.create({
  wrap: {
    position: 'relative',
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  wrapCompact: {
    width: 120,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 56,
  },
  badge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: COLORS.bgCard,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeAccent: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  badgeText: {
    fontFamily: FONTS.displayBold,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  badgeTextAccent: {
    color: '#0a0a0a',
  },
});

export default function About() {
  const router = useRouter();
  const { isMd, isDesktop } = useResponsive();
  const twoCol = isWeb && isDesktop;

  return (
    <View style={s.root}>
      <WebNav />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {!isWeb && (
          <SafeAreaView>
            <View style={s.mobileNav}>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={s.backText}>← Voltar</Text>
              </TouchableOpacity>

              <Text style={s.logo}>
                <Text style={s.accent}>777</Text> HairVision
              </Text>
            </View>
          </SafeAreaView>
        )}

        {/* HERO */}
        <View style={[s.hero, isWeb && s.heroWeb]}>
          <LinearGradient colors={['rgba(181,245,66,0.06)', 'transparent']} style={StyleSheet.absoluteFill} />

          <View style={[s.webInner, !isWeb && s.mobileInner]}>
            <Text style={s.eyebrow}>A nossa história</Text>

            <Text style={[s.heroTitle, isWeb && (isMd ? s.heroTitleTablet : s.heroTitleWeb)]}>
              Criado por quem{'\n'}
              <Text style={s.accent}>vive na barbearia.</Text>
            </Text>

            <Text style={[s.heroSub, isWeb && !isMd && s.heroSubWeb]}>
              A 777 HairVision nasceu de uma frustração real — chegar ao barbeiro, pedir um corte, e receber algo
              completamente diferente do que imaginaste.
            </Text>
          </View>
        </View>

        {/* FOUNDER */}
        <View style={[s.section, isWeb && s.sectionWeb]}>
          <View style={[s.webInner, !isWeb && s.mobileInner]}>
            <View style={twoCol ? s.founderGrid : s.founderStack}>
              <View style={[s.personCard, s.personCardFounder, twoCol && s.personCardFounderWeb]}>
                <PersonAvatar photo={FOUNDER.photo} badge={FOUNDER.badge} accentBadge />

                <Text style={s.personName}>{FOUNDER.name}</Text>
                <Text style={[s.personRole, s.personRoleAccent]}>{FOUNDER.role}</Text>

                <View style={s.tagsRow}>
                  {FOUNDER.tags.map((t) => (
                    <View key={t} style={s.tag}>
                      <Text style={s.tagText}>{t}</Text>
                    </View>
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

              <View style={twoCol ? s.founderBioWeb : s.founderBio}>
                <Text style={s.eyebrow}>O fundador</Text>

                <Text style={[s.bioTitle, isWeb && !isMd && s.bioTitleWeb]}>
                  Uma ideia simples que resolveu um problema real.
                </Text>

                <Text style={s.bioText}>
                  Passei anos a ir ao barbeiro sem saber exatamente o que queria — ou pior, sem conseguir comunicar o
                  que tinha na cabeça. Mostrava uma foto, dizia <Text style={s.bioStrong}>"quero assim"</Text>, e saía
                  com algo completamente diferente.
                </Text>

                <View style={s.quoteBlock}>
                  <Text style={s.quoteText}>
                    "Depois de uma vez mais uma decepção, pensei: tem de haver uma forma melhor de fazer isto."
                  </Text>
                </View>

                <Text style={s.bioText}>
                  E se conseguisse ver como ficava com um corte <Text style={s.bioStrong}>antes</Text> de o fazer?
                  Juntei a paixão por tecnologia com o mundo da barbearia e criei a{' '}
                  <Text style={s.bioStrong}>777 HairVision</Text>.
                </Text>

                <Text style={s.bioText}>
                  A missão é simples:{' '}
                  <Text style={s.bioStrong}>
                    dar a cada pessoa a confiança de saber exatamente como vai ficar antes de sentar na cadeira.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* MISSION */}
        <View style={[s.section, s.missionSection, isWeb && s.sectionWeb]}>
          <View style={[s.webInner, !isWeb && s.mobileInner]}>
            <View style={twoCol ? s.missionGrid : undefined}>
              <View style={twoCol ? { flex: 1 } : { marginBottom: 24 }}>
                <Text style={s.eyebrow}>A nossa missão</Text>

                <Text style={[s.sectionTitle, isWeb && !isMd && s.sectionTitleWeb]}>
                  Acabar com as surpresas na cadeira do barbeiro.
                </Text>

                <Text style={s.sectionSub}>
                  Acreditamos que cada pessoa merece chegar ao barbeiro com confiança — sabendo exatamente o que quer e
                  como vai ficar.
                </Text>
              </View>

              <View style={[s.missionStoryWrap, twoCol && s.missionStoryWrapWeb, twoCol && { flex: 1 }]}>
                <Text style={s.missionStoryEyebrow}>Porque existimos</Text>

                <View style={s.missionStoryStack}>
                  {MISSION_STORY.map((item) => (
                    <View key={item.title} style={s.missionStoryBlock}>
                      <Text style={s.missionStoryTitle}>{item.title}</Text>
                      <Text style={s.missionStoryText}>{item.text}</Text>
                    </View>
                  ))}

                  <View style={s.missionStoryQuoteBlock}>
                    <Text style={s.missionStoryQuoteText}>
                      “Queremos que cada pessoa se sente na cadeira do barbeiro já com confiança na decisão.”
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* VALUES */}
        <View style={[s.section, isWeb && s.sectionWeb]}>
          <View style={[s.webInner, !isWeb && s.mobileInner]}>
            <Text style={s.eyebrow}>Os nossos valores</Text>
            <Text style={[s.sectionTitle, isWeb && !isMd && s.sectionTitleWeb]}>O que nos guia todos os dias.</Text>

            <View style={[s.valuesGrid, twoCol && s.valuesGridWeb]}>
              {VALUES.map((v) => (
                <View key={v.title} style={[s.valueCard, twoCol && s.valueCardWeb]}>
                  <Text style={s.valueIcon}>{v.icon}</Text>
                  <Text style={s.valueTitle}>{v.title}</Text>
                  <Text style={s.valueDesc}>{v.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* DEVELOPERS */}
        <View style={[s.section, s.devSection, isWeb && s.sectionWeb]}>
          <View style={[s.webInner, !isWeb && s.mobileInner]}>
            <Text style={s.eyebrow}>Desenvolvimento web</Text>

            <Text style={[s.sectionTitle, isWeb && !isMd && s.sectionTitleWeb]}>
              A equipa por trás da plataforma.
            </Text>

            <Text style={[s.sectionSub, { marginBottom: 40 }]}>
              A aplicação web da 777 HairVision foi construída por uma equipa dedicada a criar uma experiência rápida,
              moderna e intuitiva.
            </Text>

            <View style={[s.devGrid, twoCol && s.devGridWeb]}>
              {DEVELOPERS.map((dev) => (
                <View key={dev.name} style={[s.personCard, s.devCardWide, twoCol && s.personCardDevWeb]}>
                  <PersonAvatar photo={dev.photo} badge={dev.badge} accentBadge={false} compact />

                  <View style={s.devCardContent}>
                    <Text style={s.personName}>{dev.name}</Text>
                    <Text style={s.personRole}>{dev.role}</Text>
                    <Text style={s.devBio}>{dev.bio}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CTA */}
        
   

        <Footer />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  mobileNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  backText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  logo: {
    fontFamily: FONTS.display,
    fontSize: 18,
    color: COLORS.white,
  },

  accent: {
    color: COLORS.accent,
  },

  webInner: {
    maxWidth: MAX_WIDTH,
    width: '100%',
    marginHorizontal: 'auto' as any,
    paddingHorizontal: 48,
  },

  mobileInner: {
    paddingHorizontal: 24,
  },

  devCardWide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  devCardContent: {
    flex: 1,
  },

  devBio: {
    marginTop: 10,
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },

  // ── Hero ──────────────────────────────────────
  hero: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },

  heroWeb: {
    paddingVertical: 100,
    paddingHorizontal: 0,
    marginTop: 64,
  },

  eyebrow: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    color: COLORS.accent,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  heroTitle: {
    fontFamily: FONTS.display,
    fontSize: 34,
    color: COLORS.white,
    letterSpacing: -1,
    lineHeight: 42,
    marginBottom: 16,
  },

  heroTitleTablet: {
    fontSize: 44,
    lineHeight: 52,
    letterSpacing: -1.5,
    marginBottom: 20,
  },

  heroTitleWeb: {
    fontSize: 60,
    lineHeight: 68,
    letterSpacing: -2,
    marginBottom: 20,
  },

  heroSub: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
    maxWidth: 500,
  },

  heroSubWeb: {
    fontSize: 18,
    lineHeight: 28,
  },

  // ── Sections ──────────────────────────────────
  section: {
    paddingVertical: 52,
  },

  sectionWeb: {
    paddingVertical: 100,
  },

  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 28,
    color: COLORS.white,
    letterSpacing: -0.8,
    marginBottom: 16,
    lineHeight: 36,
  },

  sectionTitleWeb: {
    fontSize: 44,
    letterSpacing: -1.5,
    lineHeight: 52,
    marginBottom: 20,
  },

  sectionSub: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
    maxWidth: 480,
  },

  // ── Person card ───────────────────────────────
  personCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 24,
  },

  personCardFounder: {
    borderColor: COLORS.accentBorder,
  },

  personCardFounderWeb: {
    width: 360,
  },

  personCardDevWeb: {
    width: 460,
  },

  personName: {
    fontFamily: FONTS.display,
    fontSize: 20,
    color: COLORS.white,
    letterSpacing: -0.4,
    marginBottom: 4,
  },

  personRole: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  personRoleAccent: {
    color: COLORS.accent,
    marginBottom: 18,
  },

  // ── Founder layout ────────────────────────────
  founderGrid: {
    flexDirection: 'row',
    gap: 80,
    alignItems: 'flex-start',
  },

  founderStack: {
    flexDirection: 'column',
    gap: 32,
  },

  founderBio: {},

  founderBioWeb: {
    flex: 1,
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    marginBottom: 20,
  },

  tag: {
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  tagText: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  socials: {
    gap: 8,
  },

  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },

  socialIcon: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
    color: COLORS.textSecondary,
    width: 20,
  },

  socialLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },

  socialHandle: {
    fontFamily: FONTS.body,
    fontSize: 11,
    color: COLORS.textTertiary,
  },

  // ── Founder bio ───────────────────────────────
  bioTitle: {
    fontFamily: FONTS.display,
    fontSize: 26,
    color: COLORS.white,
    letterSpacing: -0.5,
    marginBottom: 20,
    lineHeight: 34,
  },

  bioTitleWeb: {
    fontSize: 36,
    letterSpacing: -1,
    lineHeight: 44,
  },

  bioText: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 26,
    marginBottom: 16,
  },

  bioStrong: {
    color: COLORS.white,
    fontFamily: FONTS.bodyMedium,
  },

  quoteBlock: {
    borderLeftWidth: 2,
    borderLeftColor: COLORS.accent,
    paddingLeft: 20,
    paddingVertical: 16,
    marginVertical: 20,
    backgroundColor: COLORS.accentDim,
    borderRadius: 8,
  },

  quoteText: {
    fontFamily: FONTS.body,
    fontSize: 17,
    color: COLORS.white,
    lineHeight: 28,
    fontStyle: 'italic',
  },

  // ── Mission ───────────────────────────────────
  missionSection: {
    backgroundColor: COLORS.bgCard,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.border,
  },

  missionGrid: {
    flexDirection: 'row',
    gap: 80,
    alignItems: 'flex-start',
  },

  missionStoryWrap: {
    marginTop: 20,
  },

  missionStoryWrapWeb: {
    marginTop: 0,
  },

  missionStoryEyebrow: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    color: COLORS.accent,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  missionStoryStack: {
    gap: 14,
  },

  missionStoryBlock: {
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: 24,
  },

  missionStoryTitle: {
    fontFamily: FONTS.displayBold,
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 8,
  },

  missionStoryText: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },

  missionStoryQuoteBlock: {
    backgroundColor: COLORS.bgElevated,
    borderWidth: 0.5,
    borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.lg,
    padding: 24,
  },

  missionStoryQuoteText: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.white,
    lineHeight: 24,
    fontStyle: 'italic',
  },

  // ── Values ────────────────────────────────────
  valuesGrid: {
    gap: 12,
    marginTop: 32,
  },

  valuesGridWeb: {
    flexDirection: 'row',
    gap: 20,
  },

  valueCard: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: 28,
  },

  valueCardWeb: {
    flex: 1,
  },

  valueIcon: {
    fontSize: 28,
    marginBottom: 14,
  },

  valueTitle: {
    fontFamily: FONTS.displayBold,
    fontSize: 17,
    color: COLORS.white,
    marginBottom: 8,
  },

  valueDesc: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  // ── Developers ────────────────────────────────
  devSection: {
    backgroundColor: COLORS.bgCard,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.border,
  },

  devGrid: {
    gap: 16,
    marginTop: 8,
  },

  devGridWeb: {
    flexDirection: 'row',
    gap: 20,
  },

  // ── CTA ───────────────────────────────────────
  ctaBox: {
    borderWidth: 0.5,
    borderColor: COLORS.accentBorder,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  ctaTitle: {
    fontFamily: FONTS.display,
    fontSize: 28,
    color: COLORS.white,
    letterSpacing: -0.8,
    textAlign: 'center',
    marginBottom: 10,
  },

  ctaTitleWeb: {
    fontSize: 40,
    letterSpacing: -1.5,
  },

  ctaSub: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 28,
    textAlign: 'center',
  },

  ctaActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  ctaActionsCol: {
    flexDirection: 'column',
    width: '100%',
  },

  ctaBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: RADIUS.md,
  },

  ctaBtnFull: {
    width: '100%',
    alignItems: 'center',
  },

  ctaBtnText: {
    fontFamily: FONTS.displayBold,
    fontSize: 15,
    color: '#0a0a0a',
    textAlign: 'center',
  },

  outlineBtn: {
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: RADIUS.md,
    borderWidth: 0.5,
    borderColor: COLORS.borderStrong,
  },

  outlineBtnText: {
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});