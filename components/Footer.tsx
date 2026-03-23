import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { isWeb, MAX_WIDTH } from '../constants/responsive';

export default function Footer() {
  const router = useRouter();
  return (
    <View style={s.footer}>
      <View style={s.inner}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={s.logo}><Text style={s.accent}>777</Text> HairVision</Text>
        </TouchableOpacity>
        {isWeb && (
          <View style={s.links}>
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
        <Text style={s.copy}>© 2025 · Portugal 🇵🇹</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  footer: { borderTopWidth: 0.5, borderTopColor: COLORS.border, paddingVertical: 32 },
  inner: {
    maxWidth: isWeb ? MAX_WIDTH : undefined,
    width: '100%', marginHorizontal: 'auto' as any,
    paddingHorizontal: isWeb ? 48 : 24,
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  logo: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.white },
  accent: { color: COLORS.accent },
  links: { flexDirection: 'row', gap: 24 },
  link: { fontFamily: FONTS.body, fontSize: 13, color: COLORS.textTertiary },
  copy: { fontFamily: FONTS.body, fontSize: 12, color: COLORS.textTertiary },
});
