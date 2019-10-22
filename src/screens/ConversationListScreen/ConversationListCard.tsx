import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { Conversation } from '@src/store/reducers/ConversationReducer';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';

type Props = {
  conversation: Conversation;
  onPress: (user: object) => void;
};

const ConversationListCard = ({ conversation, onPress }: Props) => {
  const handleCardPress = () => onPress(conversation.user);

  const { image, name, time, text } = useMemo(() => {
    const { lastMessage, user } = conversation;
    const { content, createdAt } = lastMessage;

    return {
      image: user.image || undefined,
      name: `${user.firstName} ${user.lastName}`,
      time: format(new Date(createdAt), 'MM/dd/yyyy - h:mm a'),
      text: (
        content.text
        || `Appointment request: ${format(new Date(content.startTime), 'MM/dd - hh:mm aaaa')}`
      ),
    };
  }, [conversation]);

  return (
    <View variant="borderBottom" spacing={{ p: 3 }} onPress={handleCardPress} bgColor="white">
      <View row spacing={{ p: 1 }}>
        <Image rounded size={60} uri={image} />
        <View column spacing={{ pl: 3 }}>
          <Text spacing={{ mb: 2 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
            {name}
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
