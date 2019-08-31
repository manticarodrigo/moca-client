import { ViewStyle, StyleSheet } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Borders from '../global/borders';
import * as Colors from '../global/colors';

const msgBubble: ViewStyle = {
  ...Spacing.getStyles({ mt: 2, p: 3 }),
  ...Borders.primary,
  minWidth: 60,
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
  backgroundColor: Colors.secondary,
};

const borderTop: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: Colors.secondaryLightest,
};

const borderBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: Colors.secondaryLightest,
};

const backdrop: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...Borders.secondary,
  ...StyleSheet.absoluteFillObject,
  backgroundColor: Colors.white,
};

export {
  msgBubbleRight,
  msgBubbleLeft,
  borderTop,
  borderBottom,
  backdrop,
};
