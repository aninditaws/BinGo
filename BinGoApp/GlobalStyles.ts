import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Breakpoints for different device sizes
export const Breakpoints = {
  small: 375,
  medium: 414,
  large: 768,
  web: 1024,
};

// Responsive scaling function with platform-specific handling
export const scale = (size: number) => {
  if (Platform.OS === 'web') {
    // For web, we'll use a more conservative scaling approach
    const maxWidth = 480; // Maximum width for mobile-like experience on web
    const scaleFactor = Math.min(SCREEN_WIDTH / Breakpoints.small, maxWidth / Breakpoints.small);
    return Math.round(size * scaleFactor);
  } else {
    // For mobile, use the original scaling
    const scaleFactor = SCREEN_WIDTH / Breakpoints.small;
    return Math.round(size * scaleFactor);
  }
};

// Responsive font sizes with platform-specific adjustments
export const FontSize = {
  size_xs: Platform.OS === 'web' ? 12 : scale(12),
  size_sm: Platform.OS === 'web' ? 14 : scale(14),
  size_md: Platform.OS === 'web' ? 16 : scale(16),
  size_lg: Platform.OS === 'web' ? 18 : scale(18),
  size_lgi: Platform.OS === 'web' ? 19 : scale(19),
  size_xl: Platform.OS === 'web' ? 20 : scale(20),
  size_xxl: Platform.OS === 'web' ? 24 : scale(24),
};

// Responsive spacing with platform-specific adjustments
export const Spacing = {
  xs: Platform.OS === 'web' ? 4 : scale(4),
  sm: Platform.OS === 'web' ? 8 : scale(8),
  md: Platform.OS === 'web' ? 12 : scale(12),
  lg: Platform.OS === 'web' ? 16 : scale(16),
  xl: Platform.OS === 'web' ? 20 : scale(20),
  xxl: Platform.OS === 'web' ? 24 : scale(24),
  xxxl: Platform.OS === 'web' ? 32 : scale(32),
};

// Responsive padding with platform-specific adjustments
export const Padding = {
  p_5xs: Platform.OS === 'web' ? 4 : scale(4),
  p_xs: Platform.OS === 'web' ? 8 : scale(8),
  p_sm: Platform.OS === 'web' ? 12 : scale(12),
  xs: Platform.OS === 'web' ? 8 : scale(8),
  sm: Platform.OS === 'web' ? 12 : scale(12),
  md: Platform.OS === 'web' ? 16 : scale(16),
  lg: Platform.OS === 'web' ? 20 : scale(20),
  xl: Platform.OS === 'web' ? 24 : scale(24),
  xxl: Platform.OS === 'web' ? 32 : scale(32),
};

// Responsive margins with platform-specific adjustments
export const Margin = {
  xs: Platform.OS === 'web' ? 4 : scale(4),
  sm: Platform.OS === 'web' ? 8 : scale(8),
  md: Platform.OS === 'web' ? 12 : scale(12),
  lg: Platform.OS === 'web' ? 16 : scale(16),
  xl: Platform.OS === 'web' ? 20 : scale(20),
  xxl: Platform.OS === 'web' ? 24 : scale(24),
};

// Responsive border radius with platform-specific adjustments
export const BorderRadius = {
  xs: Platform.OS === 'web' ? 4 : scale(4),
  sm: Platform.OS === 'web' ? 8 : scale(8),
  md: Platform.OS === 'web' ? 12 : scale(12),
  lg: Platform.OS === 'web' ? 16 : scale(16),
  xl: Platform.OS === 'web' ? 20 : scale(20),
  round: Platform.OS === 'web' ? 9999 : scale(9999),
};

export const Gap = {
  gap_0: 0,
  gap_sm: 8,
  gap_md: 12,
  gap_xs: 4,
  gap_xl: 16,
  gap_lg: 24,
};

export const Color = {
  grayscaleHintText: "#666666",
  grayscaleBorder: "#E5E5E5",
  grayscaleWhite: "#FFFFFF",
  grayscaleBlack: "#000000",
  primaryPrimary500: "#4CAF50",
  primaryPrimary400: "#66BB6A",
  primaryPrimary000: "#E8F5E9",
  errorDanger500: "#F44336",
  tertierTertier500: "#FF9800",
  tertierTertier000: "#FFF3E0",
  approvalApproval700: "#2E7D32",
  informingApproval: "#4CAF50",
  labelsPrimary: "#000000",
  colorBeige_100: "#F5F5F5",
  colorGainsboro: "#D9D9D9",
};

export const FontFamily = {
  nunitoBold: "Nunito-Bold",
  nunitoSemiBold: "Nunito-SemiBold",
  poppinsRegular: "Poppins-Regular",
  poppinsBold: "Poppins-Bold",
  sFPro: "SF Pro",
};

export const Border = {
  br_481xl: 500,
  br_9xs: 4,
  br_7xs: 6,
  br_xs: 12,
};

// Common layout styles
export const Layout = {
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  center: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
};

// Common shadow styles
export const Shadow = {
  small: {
    shadowColor: Color.grayscaleBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: Color.grayscaleBlack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: Color.grayscaleBlack,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
}; 