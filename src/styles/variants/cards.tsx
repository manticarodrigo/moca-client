import * as Spacing from '../global/spacing';
import * as Borders from '../global/borders';
import * as Shadows from '../global/shadows';
import * as Colors from '../global/colors';

export const primary = {
  ...Shadows.primary,
  ...Borders.primary,
  ...Spacing.get({ p: 3 }),
  backgroundColor: Colors.white,
  width: '100%',
};
