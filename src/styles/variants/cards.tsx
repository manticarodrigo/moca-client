import * as Spacing from '../global/spacing';
import * as Shadows from '../global/shadows';
import * as Colors from '../global/colors';

export const primary = {
  ...Shadows.primary,
  ...Spacing.get(['p', 3]),
  borderRadius: Spacing.space[2],
  backgroundColor: Colors.white,
  width: '100%',
};
