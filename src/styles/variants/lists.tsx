import * as Alignment from '../global/alignment';
import * as Spacing from '../global/spacing';
import * as Colors from '../global/colors';

export const primary = {
  backgroundColor: Colors.grey,
  ...Alignment.get('fill'),
  ...Spacing.get(['px', 3]),
};
