import { ViewStyle, StyleSheet, Dimensions, View } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Shadow from '../global/shadow';
import * as Borders from '../global/borders';
import * as Colors from '../global/colors';

const msgBubble: ViewStyle = {
  ...Spacing.getStyles({ mx: 3, mb: 3, p: 3 }),
  ...Borders.primary,
  minWidth: 60,
  height: 'auto',
};

const msgBubbleLeft: ViewStyle = {
  ...msgBubble,
  ...Spacing.getStyles({ mr: 5 }),
  alignSelf: 'flex-start',
  backgroundColor: Colors.white,
};

const msgBubbleRight: ViewStyle = {
  ...msgBubble,
  ...Spacing.getStyles({ ml: 5 }),
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

const borderRight: ViewStyle = {
  borderRightWidth: 1,
  borderRightColor: Colors.secondaryLightest,
};

const roundedBorder: ViewStyle = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: Colors.secondaryLightest,
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
};

const backdrop: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...Borders.secondary,
  ...StyleSheet.absoluteFillObject,
  backgroundColor: Colors.white,
};

const card: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...Borders.primary,
  backgroundColor: Colors.white,
};

const cardRight: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  borderTopRightRadius: Spacing.spaceSize[2],
  borderBottomRightRadius: Spacing.spaceSize[2],
  backgroundColor: Colors.white,
};

const cardLeft: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  borderTopLeftRadius: Spacing.spaceSize[2],
  borderBottomLeftRadius: Spacing.spaceSize[2],
  backgroundColor: Colors.white,
};

const borderCardRight: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
  ...cardRight,
  borderTopWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: Colors.primary,
};

const borderCardLeft: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
  ...cardLeft,
  borderTopWidth: 1,
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  borderColor: Colors.primary,
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
  borderRight,
  backdrop,
  card,
  cardRight,
  cardLeft,
  borderCardRight,
  borderCardLeft,
  borderCard,
  shadowCard,
  iconButton,
  bottomBounceFill,
  roundedBorder,
};
