import { Platform, Dimensions, useWindowDimensions } from 'react-native';

export const isWeb = Platform.OS === 'web';

export const MAX_WIDTH = 1140;
export const BREAKPOINT_SM = 480;
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1024;

const { width } = Dimensions.get('window');
export const screenWidth = width;
export const isMobile = width < BREAKPOINT_MD;

export const webContainer = {
  maxWidth: MAX_WIDTH,
  width: '100%' as any,
  marginHorizontal: 'auto' as any,
  paddingHorizontal: isWeb ? 48 : 24,
};

export function pw<T>(webVal: T, nativeVal: T): T {
  return isWeb ? webVal : nativeVal;
}

// ─── Dynamic responsive hook (use inside components) ──────────────────────
export function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    width,
    isSm: width < BREAKPOINT_SM,
    isMd: width < BREAKPOINT_MD,
    isLg: width < BREAKPOINT_LG,
    isDesktop: width >= BREAKPOINT_LG,
    isTablet: width >= BREAKPOINT_MD && width < BREAKPOINT_LG,
    isMobileWeb: isWeb && width < BREAKPOINT_MD,
    // Helper: pick value by breakpoint
    val: <T>(mobile: T, tablet: T, desktop: T): T => {
      if (width >= BREAKPOINT_LG) return desktop;
      if (width >= BREAKPOINT_MD) return tablet;
      return mobile;
    },
  };
}
