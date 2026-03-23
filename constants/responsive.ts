import { Platform, Dimensions } from 'react-native';

export const isWeb = Platform.OS === 'web';

export const MAX_WIDTH = 1140;
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
