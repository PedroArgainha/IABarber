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

// Hook dinâmico — usa dentro de componentes para reagir a resize
export function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    width,
    isMobileS: width < BREAKPOINT_SM,
    isMobile: width < BREAKPOINT_MD,
    isTablet: width >= BREAKPOINT_MD && width < BREAKPOINT_LG,
    isDesktop: width >= BREAKPOINT_LG,
    isWide: width >= MAX_WIDTH,
    // padding horizontal adaptativo
    px: width < BREAKPOINT_MD ? 24 : width < BREAKPOINT_LG ? 32 : 48,
    // colunas para grids
    cols: width < BREAKPOINT_MD ? 1 : width < BREAKPOINT_LG ? 2 : 3,
  };
}
