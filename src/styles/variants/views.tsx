import { ViewStyle } from 'react-native';

import * as Alignment from '../global/alignment';
import * as Spacing from '../global/spacing';
import * as Borders from '../global/borders';
import * as Shadows from '../global/shadows';
import * as Colors from '../global/colors';

const msgBubble: ViewStyle = {
  ...Spacing.get({ mt: 2, p: 2 }),
  ...Borders.primary,
  ...Shadows.primary,
  height: 'auto',
};

const msgBubbleRight: ViewStyle = {
  ...msgBubble,
  ...Alignment.get('alignEnd'),
  ...Spacing.get({ ml: 4 }),
  backgroundColor: Colors.primary,
};

const msgBubbleLeft: ViewStyle = {
  ...msgBubble,
  ...Alignment.get('alignStart'),
  ...Spacing.get({ mr: 4 }),
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
