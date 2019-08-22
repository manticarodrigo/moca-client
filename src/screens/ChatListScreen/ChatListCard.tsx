import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { Chat } from '@src/types';
import Card from '@src/components/Card';
import Flex from '@src/components/Flex';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import { placeholderImgSrc } from '@src/constants/urls';

type ChatCardProps = {
  chat: Chat;
  onPress: (id: string) => void;
};

const ChatCard = ({ chat, onPress }: ChatCardProps) => {
  const handleCardPress = () => onPress(chat.id);

  const { name, time } = useMemo(() => ({
    name: chat.otherParticipants.map((user) => user.username).join(','),
    time: format(chat.latestMessage.createdAt, 'h:mm a / DD.MM.YYYY'),
  }), [chat]);

  return (
    <Card onPress={handleCardPress}>
      <Flex>
        <Image size={60} borderRadius={30} source={{ uri: placeholderImgSrc }} />
        <Flex direction="column" padding="pl">
          <Text fontSize={3} fontWeight={600}>{name}</Text>
          <Text fontSize={2} fontWeight={100}>{time}</Text>
        </Flex>
      </Flex>
      <Text mt={2} fontSize={2} fontWeight={100} numberOfLines={1}>
        {chat.latestMessage.text}
      </Text>
    </Card>
  );
};

export default ChatCard;
