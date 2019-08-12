import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { format } from 'date-fns';

import { Chat, Navigation } from '@src/types';
import { placeholderImgSrc } from '@src/constants/urls';
import Card from '@src/components/Card';
import Image from '@src/components/Image';

type ChatCardProps = {
  chat: Chat;
  navigation: Navigation;
};

const ChatCardHeader = styled.View`
  display: flex;
  flex-direction: row;
`;

const ChatCardHeaderMeta = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const ChatCardHeaderMetaNameText = styled.Text`
  font-size: 20px;
`;

const ChatCardHeaderMetaTimeText = styled.Text`
  font-size: 16px;
  font-weight: 100;
`;

const ChatCardExcerptText = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 100;
`;

const ChatCard = ({ chat, navigation }: ChatCardProps) => {
  const handleCardPress = () => navigation.push('ChatScreen', { id: chat.id });

  const { name, time } = useMemo(() => ({
    name: chat.otherParticipants.map(p => p.username).join(','),
    time: format(chat.latestMessage.createdAt, 'h:mm a / DD.MM.YYYY'),
  }), [chat]);

  return (
    <Card onPress={handleCardPress}>
      <ChatCardHeader>
        <Image size={60} borderRadius={30} source={{ uri: placeholderImgSrc }} />
        <ChatCardHeaderMeta>
          <ChatCardHeaderMetaNameText>{name}</ChatCardHeaderMetaNameText>
          <ChatCardHeaderMetaTimeText>{time}</ChatCardHeaderMetaTimeText>
        </ChatCardHeaderMeta>
      </ChatCardHeader>
      <ChatCardExcerptText>{chat.latestMessage.text}</ChatCardExcerptText>
    </Card>
  );
};

export default ChatCard;
