import React from 'react';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Text from '@src/components/Text';

const NotificationBadge = ({ large = false }) => {
  const { store } = useStore();

  return store.conversations.length > 0 ? (
    <View variant={large ? 'notificationBadgeLarge' : 'notificationBadge'}>
      <Text variant="boldWhiteSmallest">
        {store.conversations.length}
      </Text>
    </View>
  ) : null;
};

export default NotificationBadge;
