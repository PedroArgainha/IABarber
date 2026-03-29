import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { isWeb, MAX_WIDTH } from '../constants/responsive';
import { useResponsive } from '../constants/responsive';

const LINKS = [
  { label: 'Como funciona', href: '/' },
  { label: 'Sobre nós', href: '/about' },
];

export default function WebNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isWeb) return null;

  return (
    <>
      <View style={s.nav}>
        <View style={s.inner}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={s.logo}><Text style={s.accent}>777</Text> HairVision</Text>
          </TouchableOpacity>

          {isMobile ? (
            /* Hamburger para mobile web */
            <TouchableOpacity style={s.hamburger} onPress={() => setMenuOpen(!menuOpen)}>
              <View style={[s.bar, menuOpen && s.barTop]} />
              <View style={[s.bar, menuOpen && s.barHide]} />
              <View style={[s.bar, menuOpen && s.barBottom]} />
            </TouchableOpacity>
          ) : (
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
          )}
        </View>
      </View>

      {/* Dropdown menu mobile */}
      {isMobile && menuOpen && (
        <View style={s.mobileMenu}>
          {LINKS.map((l) => (
            <TouchableOpacity
              key={l.href}
              style={s.mobileLink}
              onPress={() => { router.push(l.href as any); setMenuOpen(false); }}
            >
              <Text style={[s.mobileLinkText, pathname === l.href && s.linkActive]}>{l.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={s.mobileCta}
            onPress={() => { router.push('/app' as any); setMenuOpen(false); }}
          >
            <Text style={s.ctaText}>Experimentar grátis →</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const s = StyleSheet.create({
  nav: {
    position: isWeb ? 'fixed' as any : 'relative',
    top: 0, left: 0, right: 0, zIndex: 100,
    height: 64, justifyContent: 'center',
    backgroundColor: 'rgba(10,10,10,0.95)',
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  inner: {
    maxWidth: MAX_WIDTH, width: '100%',
    marginHorizontal: 'auto' as any, paddingHorizontal: 24,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { fontFamily: FONTS.display, fontSize: 18, color: COLORS.white, letterSpacing: -0.5 },
  accent: { color: COLORS.accent },

  // Desktop links
  links: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  link: { fontFamily: FONTS.body, fontSize: 14, color: COLORS.textSecondary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.full },
  linkActive: { color: COLORS.white },
  cta: { backgroundColor: COLORS.accent, paddingHorizontal: 18, paddingVertical: 10, borderRadius: RADIUS.md, marginLeft: 8 },
  ctaText: { fontFamily: FONTS.displayBold, fontSize: 14, color: '#0a0a0a' },

  // Hamburger
  hamburger: { padding: 8, gap: 5, alignItems: 'flex-end' },
  bar: { width: 22, height: 1.5, backgroundColor: COLORS.white, borderRadius: 2 },
  barTop: { transform: [{ rotate: '45deg' }, { translateY: 6.5 }] },
  barHide: { opacity: 0 },
  barBottom: { transform: [{ rotate: '-45deg' }, { translateY: -6.5 }] },

  // Mobile dropdown
  mobileMenu: {
    position: 'fixed' as any,
    top: 64, left: 0, right: 0,
    zIndex: 99,
    backgroundColor: 'rgba(10,10,10,0.98)',
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
    paddingHorizontal: 24, paddingVertical: 16,
    gap: 4,
  },
  mobileLink: { paddingVertical: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border },
  mobileLinkText: { fontFamily: FONTS.body, fontSize: 16, color: COLORS.textSecondary },
  mobileCta: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14, borderRadius: RADIUS.md,
    alignItems: 'center', marginTop: 12,
  },
});
