import { ViewStyle, StyleSheet, Dimensions } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Shadow from '../global/shadow';
import * as Borders from '../global/borders';
import * as Colors from '../global/colors';

const rounded: ViewStyle = {
  ...Borders.primary,
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


const roundedBorder: ViewStyle = {
  borderRadius: 5,
  borderWidth: 1,
  borderColor: Colors.secondaryLightest,
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
};

const roundedBorderLeft: ViewStyle = {
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  borderWidth: 1,
  borderColor: Colors.secondary,
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
};

const roundedBorderRight: ViewStyle = {
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  borderWidth: 1,
  borderColor: Colors.secondary,
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
};

const backdrop: ViewStyle = {
  ...Spacing.getStyles({ p: 3 }),
  ...Borders.secondary,
  ...StyleSheet.absoluteFillObject,
};

const selectionScreenBorderImage: ViewStyle = {
  ...Spacing.getStyles({ pt: 5, pb: 5 }),
  borderWidth: 7,
  borderColor: Colors.transparent,
  height: 337,
};

const therapistView: ViewStyle = {
  ...selectionScreenBorderImage,
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
};

const therapistViewtPressed: ViewStyle = {
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

const borderShadowCard: ViewStyle = {
  ...Shadow.getStyles({ color: 'primary', blur: 4, alpha: 0.05 }),
  ...card,
  borderWidth: 1,
  borderColor: Colors.primary,
};

const profileSection: ViewStyle = {
  ...Spacing.getStyles({ mb: 3 }),
  backgroundColor: Colors.white,
};

const profileCard: ViewStyle = {
  ...Spacing.getStyles({ pr: 4 }),
  width: '100%',
  height: 80,
  backgroundColor: Colors.white,
  alignItems: 'center',
  borderBottomWidth: 1,
  borderColor: Colors.secondary,
};

const profileCardLast: ViewStyle = {
  ...profileCard,
  borderColor: Colors.white,
};

const profileIconCard: ViewStyle = {
  ...profileCard,
  ...Spacing.getStyles({ px: 3 }),
  width: 56,
};

const profileData: ViewStyle = {
  ...Spacing.getStyles({ pt: 3, pr: 4, pb: 4 }),
  width: '100%',
  backgroundColor: Colors.white,
  borderBottomWidth: 1,
  borderColor: Colors.secondary,
};

const profileDataLast: ViewStyle = {
  ...profileData,
  borderBottomWidth: 0,
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

const genderButton: ViewStyle = {
  ...Spacing.getStyles({ m: 1 }),
  justifyContent: 'center',
  alignItems: 'center',
  height: 32,
  width: 64,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: Colors.secondaryLighter,
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

export {
  rounded,
  progressBar,
  progressBarIndicator,
  msgBubbleRight,
  msgBubbleLeft,
  borderTop,
  borderBottom,
  borderRight,
  backdrop,
  modal,
  therapistView,
  therapistViewtPressed,
  card,
  cardRight,
  cardLeft,
  borderCard,
  shadowCard,
  borderShadowCard,
  profileCard,
  profileData,
  profileSection,
  profileIconCard,
  iconButton,
  genderButton,
  bottomBounceFill,
  roundedBorder,
  roundedBorderLeft,
  roundedBorderRight,
  patientViewPressed,
  patientView,
  notificationBadge,
  notificationBadgeLarge,
  profileDataLast,
  profileCardLast,
  star,
  starFirst,
  starLast,
};
