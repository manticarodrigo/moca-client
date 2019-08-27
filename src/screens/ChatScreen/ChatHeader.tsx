import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Avatar from '@src/components/Avatar';

import { mockImg } from '@src/services/mock';

const ChatHeader = ({ params: { img = mockImg, title = '' } }) => (
  <View alignment={['fill', 'row', 'centerY']} spacing={{ px: 3 }}>
    <Avatar size={40} uri={img} />
    <Text typography={{ size: 3, weight: '700' }} spacing={{ ml: 3 }}>{title}</Text>
  </View>
);

export default ChatHeader;
