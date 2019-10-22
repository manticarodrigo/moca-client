
import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { Message } from '@src/store/reducers/ConversationReducer';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import AppointmentRequestCard from '@src/components/MessagingCards/AppointmentRequestCard';

type ConversationMessageProps = {
  alignRight: boolean;
  message: Message;
  onPressImage: (uri: string) => void;
};

const ConversationMessage = ({ message, alignRight, onPressImage }: ConversationMessageProps) => {
  const { text, image, time } = useMemo(() => ({
    text: (message.content.text) || '',
    image: message.image,
    time: format(new Date(message.createdAt), 'hh:mm'),
  }), [message]);

  const handlePressImage = () => onPressImage(image);

  return message.type === 'appointment-request' ? (
    <AppointmentRequestCard content={message.content} />
  ) : (
    <View column variant={alignRight ? 'msgBubbleRight' : 'msgBubbleLeft'}>
      {image && (
        <View column spacing={{ mb: 2 }} onPress={handlePressImage}>
          <Image width={200} height={200} uri={image} />
        </View>
      )}
      <Text
        typography={{
          color: alignRight ? 'white' : 'dark',
          weight: '500',
          align: 'right',
        }}
      >
        {text}
      </Text>
      <Text
        spacing={{ mt: 2 }}
        typography={{
          color: alignRight ? 'secondaryLighter' : 'semiGreyAlt',
          weight: '500',
          align: 'right',
        }}
      >
        {time}
      </Text>
    </View>
  );
};

export default ConversationMessage;
