import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import { mockImg } from '@src/services/mock';

type ConversationHeaderProps = { params: { img?: string; title?: string } };

const ConversationHeader = ({ params = {} }: ConversationHeaderProps) => {
  const { img = mockImg, title = '' } = params;

  return (
    <View row flex={1} alignCenter>
      <Image rounded size={48} uri={img} />
      <Text spacing={{ ml: 3 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
        {title}
      </Text>
    </View>
  );
};

export default ConversationHeader;
