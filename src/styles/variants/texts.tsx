/* eslint-disable max-len */
import * as Typography from '../global/typography';

type Prop = Typography.TypographyProp;

// base
export const light: Prop = { size: 2, weight: '300', color: 'semiGrey' };
export const regular: Prop = { size: 2, weight: '500', color: 'semiGrey' };
export const semiBold: Prop = { size: 2, weight: '700', color: 'primary' };
export const bold: Prop = { size: 3, weight: '900', color: 'primary' };

// composed
export const lightSmallest: Prop = { ...light, size: 0 };
export const regularSmall: Prop = { ...regular, size: 1 };
export const regularDark: Prop = { ...regular, color: 'dark' };
export const title: Prop = { ...semiBold, size: 4 };
export const titleLarge: Prop = { ...title, size: 5 };
export const link: Prop = { ...semiBold, decoration: 'underline' };
