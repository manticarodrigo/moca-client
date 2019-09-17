
import React, { useState, useMemo } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { format } from 'date-fns';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

type ConversationMessageProps = {
  alignRight: boolean;
  message: Message;
};

const ConversationMessage = ({ message, alignRight }: ConversationMessageProps) => {
  const { text, attachmentURI, createdAt } = message;
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const time = useMemo(() => format(createdAt, 'hh:mm'), [createdAt]);

  const toggleImageViewer = () => setImageViewerOpen((prev) => !prev);

  return (
    <>
      <View column variant={alignRight ? 'msgBubbleRight' : 'msgBubbleLeft'}>
        {attachmentURI && (
          <View column spacing={{ mb: 2 }} onPress={toggleImageViewer}>
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
      {attachmentURI && (
        <Modal visible={imageViewerOpen} transparent>
          <ImageViewer
            imageUrls={[{ url: attachmentURI }]}
            enableImageZoom
            enableSwipeDown
            onSwipeDown={toggleImageViewer}
          />
        </Modal>
      )}
    </>
  );
};

export default ConversationMessage;
