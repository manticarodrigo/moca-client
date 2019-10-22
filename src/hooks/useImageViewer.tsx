import React, { useState, useMemo } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const useImageViewer = <Items extends { content: { image?: string } }[]>(object: Items) => {
  const [state, setState] = useState({ open: false, index: 0 });

  const imageUrls = useMemo(() => object
    .filter(({ content: { image } }) => !!image)
    .map(({ content: { image } }) => ({ url: image })),
  [object]);

  const onClose = () => setState((prev) => ({ ...prev, open: false }));

  const onPressImage = (uri: string) => {
    const index = imageUrls.findIndex(({ url }) => url === uri);

    setState({
      open: true,
      index,
    });
  };

  return {
    viewer: (
      <Modal visible={state.open} transparent>
        <ImageViewer
          imageUrls={imageUrls}
          index={state.index}
          enableImageZoom
          enableSwipeDown
          onSwipeDown={onClose}
        />
      </Modal>
    ),
    onPressImage,
  };
};

export default useImageViewer;
