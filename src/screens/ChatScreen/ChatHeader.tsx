import React from 'react';

import Flex from '@src/components/Flex';
import Text from '@src/components/Text';
import Avatar from '@src/components/Avatar';
import { mockImg } from '@src/services/mock';

const ChatHeader = ({ params: { img = mockImg, title = '' } }) => (
  <Flex flex center="y" padding="px">
    <Avatar size={40} borderRadius={20} uri={img} />
    <Text ml={2} fontSize={3} fontWeight={600}>{title}</Text>
  </Flex>
);

export default ChatHeader;
