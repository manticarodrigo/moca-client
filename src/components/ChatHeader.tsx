import React from 'react';

import Flex from '@src/components/Flex';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import { placeholderImgSrc } from '@src/constants/urls';

const ChatHeader = ({ params: { img = '', title = '' } }) => (
  <Flex flexDirection="row" alignItems="center" px={3}>
    <Image size={40} borderRadius={20} source={{ uri: img || placeholderImgSrc }} />
    <Text ml={2} fontSize={3}>{title}</Text>
  </Flex>
);

export default ChatHeader;
