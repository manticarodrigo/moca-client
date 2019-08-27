import { ViewStyle } from 'react-native';

import * as Alignment from '../global/alignment';
import * as Spacing from '../global/spacing';
import * as Shadows from '../global/shadows';
import * as Colors from '../global/colors';

const msgBubble: ViewStyle = {
  borderRadius: Spacing.space[2],
  marginTop: Spacing.space[2],
  padding: Spacing.space[2],
  height: 'auto',
  ...Shadows.primary,
};

const msgBubbleRight: ViewStyle = {
  ...msgBubble,
  ...Alignment.get('alignEnd'),
  ...Spacing.get(['ml', 4]),
  backgroundColor: Colors.primary,
};

const msgBubbleLeft: ViewStyle = {
  ...msgBubble,
  ...Alignment.get('alignStart'),
  ...Spacing.get(['mr', 4]),
  backgroundColor: Colors.white,
};

const chatInputContainer: ViewStyle = {
  ...Alignment.get('row'),
  borderTopWidth: 1,
  borderTopColor: '#ddd',
  height: 60,
};

export {
  msgBubbleRight,
  msgBubbleLeft,
  chatInputContainer,
};
