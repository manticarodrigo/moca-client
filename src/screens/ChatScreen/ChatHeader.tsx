import React from 'react';

import Flex from '@src/components/Flex';
import Text from '@src/components/Text';
import Avatar from '@src/components/Avatar';
import { mockImg } from '@src/services/mock';

const ChatHeader = ({ params: { img = mockImg, title = '' } }) => (
  <Flex alignment="flexCenterY" spacing={['px', 3]}>
    <Avatar size={40} uri={img} />
    <Text variant="bold" spacing={['ml', 3]}>{title}</Text>
  </Flex>
);

export default ChatHeader;
