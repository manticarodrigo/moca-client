import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { Conversation } from '@src/store/reducers/ConversationReducer';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import NotificationBadge from '@src/components/NotificationBadge';

type Props = {
  conversation: Conversation;
  onPress: (user: object) => void;
};

const ConversationListCard = ({ conversation, onPress }: Props) => {
  const handleCardPress = () => onPress(conversation.otherUser);

  const { image, name, time, text } = useMemo(() => {
    const { lastMessage, otherUser } = conversation;
    const { content, createdAt } = lastMessage || {};
    const { startTime } = content || {};

    return {
      image: otherUser.image || undefined,
      name: `${otherUser.firstName} ${otherUser.lastName}`,
      time: createdAt && format(new Date(createdAt), 'MM/dd/yyyy - h:mm a'),
      text: ((content || {}).text
        || (
          startTime
          && `Appointment Request: ${format(new Date(startTime), 'MM/dd - hh:mm aaaa')}`
        )
      ),
    };
  }, [conversation]);

  return (
    <View p={3} variant="borderBottom" bgColor="white" onPress={handleCardPress}>
      <View row p={1}>
        <Image rounded size={60} uri={image} />
        <View pl={3}>
          <Text variant="semiBoldLarge" mb={2}>{name}</Text>
          <Text variant="regularSmall" color="grey">{time}</Text>
        </View>
        <NotificationBadge count={parseInt(conversation.unreadCount)} large />
      </View>
      <Text
        variant="light"
        color="grey"
        numberOfLines={1}
        mt={3}
        px={1}
        pb={3}
      >
        {text}
      </Text>
    </View>
  );
};

export default ConversationListCard;
