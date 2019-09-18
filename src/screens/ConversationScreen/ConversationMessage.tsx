
import React, { useMemo } from 'react';
import { format } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

type ConversationMessageProps = {
  alignRight: boolean;
  message: Message;
  onPressImage: (uri: string) => void;
};

const ConversationMessage = ({ message, alignRight, onPressImage }: ConversationMessageProps) => {
  const { text, attachmentURI, createdAt } = message;
  const time = useMemo(() => format(createdAt, 'hh:mm'), [createdAt]);

  const handlePressImage = () => onPressImage(attachmentURI);

  return (
    <View column variant={alignRight ? 'msgBubbleRight' : 'msgBubbleLeft'}>
      {attachmentURI && (
        <View column spacing={{ mb: 2 }} onPress={handlePressImage}>
          <Image width={200} height={200} uri={attachmentURI} />
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
