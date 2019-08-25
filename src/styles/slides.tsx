import { theme } from '@src/theme';

import * as Alignment from './alignment';

export const dotStyle = {
  backgroundColor: theme.colors.tealLight,
};

export const activeDotStyle = {
  backgroundColor: theme.colors.teal,
};

export const slide = {
  ...Alignment.fillXY,
  backgroundColor: '#fff',
};

export const slideTitle = {
  fontSize: theme.fontSizes[3],
};

export const slideText = {
  fontSize: theme.fontSizes[1],
};
