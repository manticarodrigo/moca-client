import React, { useState, useMemo } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const useImageViewer = <Items extends { image?: string }[]>(object: Items) => {
  const [state, setState] = useState({ open: false, index: 0 });

  const imageUrls = useMemo(() => object
    .filter(({ image }) => !!image)
    .map(({ image }) => ({ url: image })),
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
