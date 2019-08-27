import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { User, Chat } from '@src/types';
import Card from '@src/components/Card';
import View from '@src/components/View';
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
  }, [chat, currentUser.id]);

  return (
    <Card spacing={['mb', 3]} onPress={handleCardPress}>
      <View alignment="row">
        <Avatar size={60} uri={imageUrl} />
        <View alignment="column" spacing={['pl', 3]}>
          <Text typography={{ size: 3, weight: '700' }}>{username}</Text>
          <Text typography={{ size: 2, weight: '100' }}>{time}</Text>
        </View>
      </View>
      <Text typography={{ size: 2, weight: '200' }} spacing={['mt', 3]} numberOfLines={1}>
        {text}
      </Text>
    </Card>
  );
};

export default ChatListCard;
