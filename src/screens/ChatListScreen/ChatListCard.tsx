import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { User, Chat } from '@src/types';
import Card from '@src/components/Card';
import Flex from '@src/components/Flex';
import Avatar from '@src/components/Avatar';
import Text from '@src/components/Text';

type ChatListCardProps = {
  currentUser: User;
  chat: Chat;
  onPress: (chat: Chat) => void;
};

const ChatListCard = ({ currentUser, chat, onPress }: ChatListCardProps) => {
  const handleCardPress = () => onPress(chat);

  const { imageUrl, username, time, text } = useMemo(() => {
    const otherParticipant = chat.participants.find(({ id }) => id !== currentUser.id);
    const latestMessage = chat.messages[chat.messages.length - 1];

    return {
      imageUrl: otherParticipant.imageUrl,
      username: otherParticipant.username,
      time: format(latestMessage.createdAt, 'h:mm a / DD.MM.YYYY'),
      text: latestMessage.text,
    };
  }, [chat]);

  return (
    <Card margin="mb" onPress={handleCardPress}>
      <Flex>
        <Avatar size={60} borderRadius={30} uri={imageUrl} />
        <Flex direction="column" padding="pl">
          <Text fontSize={3} fontWeight={600}>{username}</Text>
          <Text fontSize={2} fontWeight={100}>{time}</Text>
        </Flex>
      </Flex>
      <Text mt={2} fontSize={2} fontWeight={100} numberOfLines={1}>
        {text}
      </Text>
    </Card>
  );
};

export default ChatListCard;
