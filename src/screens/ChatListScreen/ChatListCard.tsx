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
    <Card spacing={['mb', 3]} onPress={handleCardPress}>
      <Flex>
        <Avatar size={60} uri={imageUrl} />
        <Flex direction="column" spacing={['pl', 3]}>
          <Text variant="bold">{username}</Text>
          <Text variant="smallLight">{time}</Text>
        </Flex>
      </Flex>
      <Text variant="smallLight" spacing={['mt', 3]} numberOfLines={1}>
        {text}
      </Text>
    </Card>
  );
};

export default ChatListCard;
