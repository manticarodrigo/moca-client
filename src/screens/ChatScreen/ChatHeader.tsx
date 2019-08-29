import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Avatar from '@src/components/Avatar';

import { mockImg } from '@src/services/mock';

const ChatHeader = ({ params: { img = mockImg, title = '' } }) => (
  <View row expand centerCrossAxis>
    <Avatar size={40} uri={img} />
    <Text spacing={{ ml: 3 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
      {title}
    </Text>
  </View>
);

export default ChatHeader;
