/* eslint-disable max-len */
import * as Typography from '../global/typography';

type Props = Typography.TypographyProps;

// base
export const light: Props = { size: 2, weight: '300', color: 'semiGrey' };
export const regular: Props = { size: 2, weight: '500', color: 'semiGrey' };
export const semiBold: Props = { size: 2, weight: '700', color: 'primary' };
export const bold: Props = { size: 3, weight: '900', color: 'primary' };

// composed
export const lightSmallest: Props = { ...light, size: 0 };
export const regularSmall: Props = { ...regular, size: 1 };
export const regularDark: Props = { ...regular, color: 'dark' };
export const semiBoldLarge: Props = { ...semiBold, size: 3 };
export const title: Props = { ...semiBold, size: 4 };
export const titleLarge: Props = { ...title, size: 5 };
export const link: Props = { ...semiBold, decoration: 'underline' };
