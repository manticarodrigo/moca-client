import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { WINDOW_WIDTH } from '@src/utlities/constants';

const ImageTile = ({ item, index, selected, selectImage }) => {
  if (!item) return null;

  return (
    <TouchableHighlight
      style={{ opacity: selected ? 0.5 : 1 }}
      underlayColor="transparent"
      onPress={() => selectImage(index)}
    >
      <Image
        style={{ width: WINDOW_WIDTH / 4, height: WINDOW_WIDTH / 4 }}
        source={{ uri: item }}
      />
    </TouchableHighlight>
  );
};

export default React.memo(ImageTile);
