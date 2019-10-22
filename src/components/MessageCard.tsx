import React, { useMemo } from 'react';
import { format } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import { Message } from '@src/store/reducers/ConversationReducer';

type Props = {
  message: Message;
  alignRight: boolean;
  onPressImage: () => void;
};

const MessageCard = ({ message, alignRight, onPressImage }: Props) => {
  const { content: { text, image }, createdAt } = message;

  const { time } = useMemo(() => ({ time: format(new Date(createdAt), 'hh:mm') }), [createdAt]);

  return (
    <View column variant={alignRight ? 'msgBubbleRight' : 'msgBubbleLeft'}>
      {image && (
        <View column spacing={{ mb: 2 }} onPress={onPressImage}>
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

export default MessageCard;
