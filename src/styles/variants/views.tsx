import { ViewStyle, StyleSheet, Dimensions } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Shadow from '../global/shadow';
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

const imageBorder: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.secondaryLighter,
  ...Spacing.getStyles({ pt: 5, pb: 5 }),
  width: 164,
  height: 337,
};

const imageBorderRight: ViewStyle = {
  ...imageBorder,
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
};

const imageBorderLeft: ViewStyle = {
  ...imageBorder,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
};


const backdrop: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...StyleSheet.absoluteFillObject,
  borderTopRightRadius: 16,
  borderTopLeftRadius: 16,
  backgroundColor: Colors.white,
};

const card: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...Borders.primary,
  backgroundColor: Colors.white,
};

const borderCard: ViewStyle = {
  ...card,
  borderWidth: 2,
  borderBottomWidth: 3,
  borderColor: Colors.secondary,
};

const shadowCard: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
  ...card,
};

const iconButton: ViewStyle = {
  ...Spacing.getStyles({ p: 2 }),
  ...Shadow.getStyles({ color: 'primary', blur: 2, alpha: 0.08 }),
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: Colors.secondaryLighter,
  aspectRatio: 1,
};

const bottomBounceFill: ViewStyle = {
  position: 'absolute',
  right: 0,
  left: 0,
  bottom: 0,
  marginBottom: -Dimensions.get('screen').height,
  height: Dimensions.get('screen').height,
};

export {
  msgBubbleRight,
  msgBubbleLeft,
  borderTop,
  borderBottom,
  backdrop,
  imageBorderRight,
  imageBorderLeft,
  card,
  borderCard,
  shadowCard,
  iconButton,
  bottomBounceFill,
};
