import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import { mockImg } from '@src/services/mock';

const ChatHeader = ({ params: { img = mockImg, title = '' } }) => (
  <View row expand alignCenter>
    <Image rounded size={40} uri={img} />
    <Text spacing={{ ml: 3 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
      {title}
    </Text>
  </View>
);

export default ChatHeader;
