import React, { useMemo } from 'react';
import { format } from 'date-fns';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';

type Props = {
  user: User;
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
};

const ConversationListCard = ({ user, conversation, onPress }: Props) => {
  const handleCardPress = () => onPress(conversation);

  const { imageUrl, username, time, text } = useMemo(() => {
    const otherParticipant = conversation.participants.find(({ id }) => id !== user.id);
    const latestMessage = conversation.messages[conversation.messages.length - 1];

    return {
      imageUrl: otherParticipant.imageUrl,
      username: otherParticipant.username,
      time: format(new Date(latestMessage.createdAt), 'h:mm a / dd.MM.yyyy'),
      text: latestMessage.text,
    };
  }, [conversation, user.id]);

  return (
    <View variant="borderBottom" spacing={{ p: 3 }} onPress={handleCardPress} bgColor="white">
      <View row spacing={{ p: 1 }}>
        <Image rounded size={60} uri={imageUrl} />
        <View column spacing={{ pl: 3 }}>
          <Text spacing={{ mb: 2 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
            {username}
          </Text>
          <Text typography={{ size: 1, weight: '500', color: 'grey' }}>{time}</Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        spacing={{ mt: 3, px: 1, pb: 3 }}
        typography={{ size: 2, weight: '300', color: 'grey' }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ConversationListCard;
