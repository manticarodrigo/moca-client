import * as Alignment from '../global/alignment';
import * as Typography from '../global/typography';
import * as Colors from '../global/colors';

export const dotStyle = {
  backgroundColor: Colors.tealLight,
};

export const activeDotStyle = {
  backgroundColor: Colors.teal,
};

export const slide = {
  ...Alignment.get(['flex', 'centerXY']),
  backgroundColor: '#fff',
};

export const slideTitle = {
  fontSize: Typography.fontSizes[3],
};

export const slideText = {
  fontSize: Typography.fontSizes[1],
};
