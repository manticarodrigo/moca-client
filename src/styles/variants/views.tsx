import { ViewStyle } from 'react-native';

import * as Spacing from '../global/spacing';
import * as Shadows from '../global/shadows';
import * as Colors from '../global/colors';

const msgBubble: ViewStyle = {
  display: 'flex',
  borderRadius: Spacing.space[2],
  marginTop: Spacing.space[2],
  padding: Spacing.space[2],
  height: 'auto',
  ...Shadows.primary,
};

export const msgBubbleRight: ViewStyle = {
  ...msgBubble,
  alignSelf: 'flex-end',
  backgroundColor: Colors.primary,
  marginLeft: Spacing.space[4],
};

export const msgBubbleLeft: ViewStyle = {
  ...msgBubble,
  alignSelf: 'flex-start',
  backgroundColor: Colors.white,
  marginRight: Spacing.space[4],
};

export const chatInputContainer: ViewStyle = {
  borderTopWidth: 1,
  borderTopColor: '#ddd',
  height: 60,
};
