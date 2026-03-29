import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { isWeb, MAX_WIDTH } from '../constants/responsive';
import { useResponsive } from '../constants/responsive';

export default function Footer() {
  const router = useRouter();
  const { isMd } = useResponsive();
  const isRow = isWeb && !isMd;

  return (
    <View style={s.footer}>
      <View style={[s.inner, isRow ? s.innerRow : s.innerCol]}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={s.logo}><Text style={s.accent}>777</Text> HairVision</Text>
        </TouchableOpacity>
        {isWeb && (
          <View style={[s.links, !isRow && s.linksCenter]}>
            {[
              { label: 'Como funciona', href: '/' },
              { label: 'Sobre nós', href: '/about' },
            ].map((l) => (
              <TouchableOpacity key={l.href} onPress={() => router.push(l.href as any)}>
                <Text style={s.link}>{l.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={s.copy}>© 2026 · Portugal 🇵🇹</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  footer: { borderTopWidth: 0.5, borderTopColor: COLORS.border, paddingVertical: 32 },
  inner: {
    maxWidth: isWeb ? MAX_WIDTH : undefined,
    width: '100%', marginHorizontal: 'auto' as any,
    paddingHorizontal: isWeb ? 24 : 24,
    gap: 16,
  },
  innerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 48 },
  innerCol: { flexDirection: 'column', alignItems: 'center' },
  logo: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.white },
  accent: { color: COLORS.accent },
  links: { flexDirection: 'row', gap: 24 },
  linksCenter: { justifyContent: 'center' },
  link: { fontFamily: FONTS.body, fontSize: 13, color: COLORS.textTertiary },
  copy: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary },
});
