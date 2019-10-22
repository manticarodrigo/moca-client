import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

const NotificationBadge = ({ large = false, count = 0 }) => count > 0 ? (
  <View variant={large ? 'notificationBadgeLarge' : 'notificationBadge'}>
    <Text variant="boldWhiteSmallest">
      {count}
    </Text>
  </View>
) : null;

export default NotificationBadge;
