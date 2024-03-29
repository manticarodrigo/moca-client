import { ViewStyle, StyleSheet, Dimensions } from 'react-native';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import * as Spacing from '../global/spacing';
import * as Shadow from '../global/shadow';
import * as Borders from '../global/borders';
import * as Colors from '../global/colors';

const rounded: ViewStyle = {
  ...Borders.primary,
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

const shadow: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
};

const progressBar: ViewStyle = {
  ...rounded,
  ...Spacing.getStyles({ p: 1 }),
  height: 16,
  maxWidth: 200,
  backgroundColor: Colors.lightGrey,
};

const progressBarIndicator: ViewStyle = {
  ...rounded,
  flexDirection: 'row',
  height: '100%',
  backgroundColor: Colors.grey,
};

const msgBubble: ViewStyle = {
  ...Spacing.getStyles({ mx: 3, mb: 3, p: 3 }),
  ...Borders.primary,
  minWidth: 60,
  maxWidth: WINDOW_WIDTH - (Spacing.spaceSize[3] * 2),
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

const borderTopAndRight: ViewStyle = {
  borderTopWidth: 1,
  borderRightWidth: 1,
  borderTopColor: Colors.secondaryLightest,
  borderRightColor: Colors.secondaryLightest,
};

const borderBottom: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: Colors.secondaryLightest,
};

const borderRight: ViewStyle = {
  borderRightWidth: 1,
  borderRightColor: Colors.secondaryLightest,
};

const star: ViewStyle = {
  borderColor: Colors.secondaryLightest,
  borderWidth: 1,
  borderRightColor: Colors.lightGrey,
  borderLeftColor: Colors.lightGrey,
};

const starFirst: ViewStyle = {
  ...star,
  borderRightWidth: 0,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  borderLeftColor: Colors.secondaryLightest,
};

const starLast: ViewStyle = {
  ...star,
  borderTopRightRadius: 8,
  borderBottomRightRadius: 8,
  borderLeftWidth: 0,
  borderRightColor: Colors.secondaryLightest,

};

const curveBorder: ViewStyle = {
  borderRadius: 20,
  borderWidth: 0,
  borderColor: Colors.white,
  ...shadow,
};

const curveBorderBottom: ViewStyle = {
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  borderWidth: 0,
  borderColor: Colors.white,
  ...shadow,
};

const roundedBorder: ViewStyle = {
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.secondaryLightest,
};

const roundedBorderGrey: ViewStyle = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: Colors.semiGreyAlt,
  ...shadow,
};


const roundedBorderSemiGrey = {
  ...card,
  borderWidth: 1,
  borderColor: Colors.semiGrey,
  backgroundColor: Colors.whiteTranslucent,
};

const roundedBorderLeft: ViewStyle = {
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  borderWidth: 1,
  borderColor: Colors.secondary,
  ...shadow,
};

const roundedBorderRight: ViewStyle = {
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  borderWidth: 1,
  borderColor: Colors.secondary,
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
};

const absoluteFill: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
};

const selectionScreenBorderImage: ViewStyle = {
  ...Spacing.getStyles({ py: 5 }),
  borderWidth: 7,
  borderColor: Colors.transparent,
  height: 337,
};

const therapistView: ViewStyle = {
  ...selectionScreenBorderImage,
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
};

const therapistViewPressed: ViewStyle = {
  ...therapistView,
  borderColor: Colors.secondaryDarker,
};

const patientView: ViewStyle = {
  ...selectionScreenBorderImage,
  borderTopLeftRadius: 16,
  borderBottomLeftRadius: 16,
};

const patientViewPressed: ViewStyle = {
  ...patientView,
  borderColor: Colors.secondaryDarker,
};

const modal: ViewStyle = {
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  overflow: 'hidden',
  flex: 1,
  backgroundColor: Colors.white,
};

const borderCard: ViewStyle = {
  ...card,
  borderWidth: 2,
  borderBottomWidth: 3,
  borderColor: Colors.secondary,
};

const borderCardDisabled: ViewStyle = {
  ...card,
  backgroundColor: Colors.lightGrey,
};

const shadowCard: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
  ...card,
};

const borderShadowCard: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
  ...card,
  borderWidth: 1,
  borderColor: Colors.primary,
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

const notificationBadge: ViewStyle = {
  position: 'absolute',
  top: -5,
  right: -5,
  justifyContent: 'center',
  alignItems: 'center',
  width: 22,
  height: 22,
  borderRadius: 11,
  borderWidth: 1,
  borderColor: Colors.white,
  backgroundColor: Colors.error,
};

const notificationBadgeLarge: ViewStyle = {
  ...notificationBadge,
  top: 0,
  right: 0,
  width: 28,
  height: 28,
  borderRadius: 14,
  borderWidth: 3,
  borderColor: Colors.errorLighter,
};

const deleteBadge: ViewStyle = {
  ...notificationBadge,
  top: -10,
  right: 0,
  width: 30,
  height: 30,
  borderRadius: 15,
  borderWidth: 2,
};

export {
  rounded,
  card,
  cardRight,
  cardLeft,
  shadow,
  progressBar,
  progressBarIndicator,
  msgBubbleRight,
  msgBubbleLeft,
  borderTop,
  borderTopAndRight,
  borderBottom,
  borderRight,
  absoluteFill,
  modal,
  therapistView,
  therapistViewPressed,
  curveBorder,
  curveBorderBottom,
  borderCard,
  borderCardDisabled,
  shadowCard,
  borderShadowCard,
  iconButton,
  bottomBounceFill,
  roundedBorder,
  roundedBorderGrey,
  roundedBorderSemiGrey,
  roundedBorderLeft,
  roundedBorderRight,
  patientViewPressed,
  patientView,
  notificationBadge,
  notificationBadgeLarge,
  deleteBadge,
  star,
  starFirst,
  starLast,
};
