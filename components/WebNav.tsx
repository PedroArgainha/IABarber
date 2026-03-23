import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { isWeb, MAX_WIDTH } from '../constants/responsive';

const LINKS = [
  { label: 'Como funciona', href: '/' },
  { label: 'A Barbearia', href: '/barbearia' },
  { label: 'Sobre nós', href: '/about' },
];

export default function WebNav() {
  const router = useRouter();
  const pathname = usePathname();
  if (!isWeb) return null;

  return (
    <View style={s.nav}>
      <View style={s.inner}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={s.logo}><Text style={s.accent}>777</Text> HairVision</Text>
        </TouchableOpacity>
        <View style={s.links}>
          {LINKS.map((l) => (
            <TouchableOpacity key={l.href} onPress={() => router.push(l.href as any)}>
              <Text style={[s.link, pathname === l.href && s.linkActive]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={s.cta} onPress={() => router.push('/app' as any)}>
            <Text style={s.ctaText}>Experimentar grátis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  nav: {
    position: isWeb ? 'fixed' as any : 'relative',
    top: 0, left: 0, right: 0, zIndex: 100,
    height: 64, justifyContent: 'center',
    backgroundColor: 'rgba(10,10,10,0.92)',
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  inner: {
    maxWidth: MAX_WIDTH, width: '100%',
    marginHorizontal: 'auto' as any, paddingHorizontal: 48,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { fontFamily: FONTS.display, fontSize: 20, color: COLORS.white, letterSpacing: -0.5 },
  accent: { color: COLORS.accent },
  links: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  link: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.full },
  linkActive: { color: COLORS.white },
  cta: { backgroundColor: COLORS.accent, paddingHorizontal: 18, paddingVertical: 10, borderRadius: RADIUS.md, marginLeft: 8 },
  ctaText: { fontFamily: FONTS.displayBold, fontSize: 14, color: '#0a0a0a' },
});
