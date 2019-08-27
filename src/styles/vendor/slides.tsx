import * as Alignment from '../global/alignment';
import * as Spacing from '../global/spacing';
import * as Typography from '../global/typography';
import * as Colors from '../global/colors';

export const dotStyle = {
  backgroundColor: Colors.tealLight,
};

export const activeDotStyle = {
  backgroundColor: Colors.teal,
};

export const slide = {
  ...Alignment.get(['fill', 'centerXY']),
  ...Spacing.get(['p', 2]),
  backgroundColor: '#fff',
};

export const slideTitle = {
  ...Typography.get({ size: 4 }),
};

export const slideText = {
  ...Typography.get({ size: 2, align: 'center' }),
};
