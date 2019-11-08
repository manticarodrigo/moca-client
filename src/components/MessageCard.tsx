import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { TypographyProp } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

import { Message } from '@src/store/reducers/ConversationReducer';

type Props = {
  message: Message;
  alignRight: boolean;
  onPressImage: () => void;
};

const commonProps: TypographyProp = {
  weight: '500',
  align: 'right',
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
        {...commonProps}
        color={alignRight ? 'white' : 'dark'}
      >
        {text}
      </Text>
      <Text
        {...commonProps}
        color={alignRight ? 'secondaryLighter' : 'semiGreyAlt'}
        spacing={{ mt: 2 }}
      >
        {time}
      </Text>
    </View>
  );
};

export default MessageCard;
