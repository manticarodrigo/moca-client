import React, { useMemo } from 'react';
import { format } from 'date-fns';

import { TypographyProps } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import ImageSelector from '@src/components/ImageSelector';

import { Message } from '@src/store/reducers/ConversationReducer';

type Props = {
  message: Message;
  alignRight: boolean;
  onPressImage: () => void;
};

const commonProps: TypographyProps = {
  weight: '500',
  align: 'right',
};

const MessageCard = ({ message, alignRight }: Props) => {
  const { content: { title, text, images }, createdAt } = message;

  const { time } = useMemo(() => ({ time: format(new Date(createdAt), 'hh:mm') }), [createdAt]);

  return (
    <View variant={alignRight ? 'msgBubbleRight' : 'msgBubbleLeft'}>
      <View row>
        <View>
          {!!title && (
            <Text
              mb={2}
              size={3}
              color={alignRight ? 'secondaryLightest' : 'semiGrey'}
              {...commonProps}
            >
              {title}
            </Text>
          )}
          <Text size={3} color={alignRight ? 'white' : 'dark'} {...commonProps}>{text}</Text>
        </View>
        {!!(images && images.length) && (
          <View pl={4}>
            <ImageSelector images={images} />
          </View>
        )}
      </View>
      <Text
        mt={2}
        size={2}
        color={alignRight ? 'secondaryLighter' : 'semiGreyAlt'}
        {...commonProps}
      >
        {time}
      </Text>
    </View>
  );
};

export default MessageCard;
