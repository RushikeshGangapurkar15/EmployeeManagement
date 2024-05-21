interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

interface FontFamily {
  inter_semibold: string;

  inter_medium: string;
}

export const FONTFAMILY: FontFamily = {
  inter_semibold: 'Inter-SemiBold',

  inter_medium: 'Inter-Medium',
};

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

interface Color {
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryWhiteHex: string;
  primaryGreyHex: string;
  secendaryGreyHex: string;
}

export const COLORS: Color = {
  primaryOrangeHex: '#fe8c00',
  primaryBlackHex: '#101010',
  primaryGreyHex: '#878787',
  secendaryGreyHex: '#C2C2C2',
  primaryWhiteHex: '#fff',
};

interface FontSize {
  size_14: number;

  size_32: number;
}

export const FONTSIZE: FontSize = {
  size_14: 14,

  size_32: 32,
};

interface BorderRadius {
  radius_48: number;
  radius_8: number;
  radius_100: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_8: 8,
  radius_100: 100,
  radius_48: 48,
};
