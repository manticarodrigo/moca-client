import { theme } from '@src/theme';

import * as Shadows from './shadows';

export const primary = {
  borderRadius: theme.radii[2],
  padding: theme.space[3],
  width: '100%',
  backgroundColor: theme.colors.white,
  ...Shadows.primary,
};
