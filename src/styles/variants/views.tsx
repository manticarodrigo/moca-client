import { ViewStyle, StyleSheet } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Borders from '../global/borders';
import * as Shadows from '../global/shadows';
import * as Colors from '../global/colors';

const msgBubble: ViewStyle = {
  ...Spacing.getStyles({ mt: 2, p: 2 }),
  ...Borders.primary,
  ...Shadows.primary,
  height: 'auto',
};

const msgBubbleLeft: ViewStyle = {
  ...Spacing.getStyles({ mr: 4 }),
  ...msgBubble,
  alignSelf: 'flex-start',
  backgroundColor: Colors.white,
};

const msgBubbleRight: ViewStyle = {
  ...Spacing.getStyles({ ml: 4 }),
  ...msgBubble,
  alignSelf: 'flex-end',
  backgroundColor: Colors.primary,
};

const card = {
  ...Spacing.getStyles({ p: 3 }),
  ...Shadows.primary,
  ...Borders.primary,
  backgroundColor: Colors.white,
  width: '100%',
};

const borderTop: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: Colors.secondaryLightest,
};

const borderBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: Colors.secondaryLightest,
};

const backdropView: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...Borders.secondary,
  ...StyleSheet.absoluteFillObject,
  backgroundColor: Colors.white,
};

export {
  msgBubbleRight,
  msgBubbleLeft,
  card,
  borderTop,
  borderBottom,
  backdropView,
};
