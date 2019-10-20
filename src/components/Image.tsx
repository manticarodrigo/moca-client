import React, { useMemo } from 'react';
import {
  StyleSheet,
  Image as RNImage,
  ImageRequireSource,
  ImageStyle,
} from 'react-native';

import { mockImg } from '@src/services/mock';

type ImageProps = {
  style?: ImageStyle;
  rounded?: boolean;
  size?: number;
  width?: number | string;
  height?: number | string;
  uri?: string;
  file?: ImageRequireSource;
};

const Image = ({ style, rounded, size, width, height, uri = mockImg, file }: ImageProps) => {
  const styles = useMemo(() => StyleSheet.create({
    image: {
      ...style,
      width: size || width,
      height: size || height,
      borderRadius: (rounded && size) && (size / 2),
    },
  }), [style, rounded, size, width, height]);

  return <RNImage style={styles.image} source={file || { uri }} />;
};

export default Image;
