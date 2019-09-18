import React, { useMemo } from 'react';
import { StyleSheet, Image as RNImage, ImageRequireSource } from 'react-native';

import { mockImg } from '@src/services/mock';

type ImageProps = {
  rounded?: boolean;
  size?: number;
  width?: number | string;
  height?: number | string;
  uri?: string;
  file?: ImageRequireSource;
};

const Image = ({ rounded, size, width, height, uri = mockImg, file }: ImageProps) => {
  const styles = useMemo(() => StyleSheet.create({
    image: {
      width: size || width,
      height: size || height,
      borderRadius: (rounded && size) && (size / 2),
    },
  }), [rounded, size, width, height]);

  return <RNImage style={styles.image} source={file || { uri }} />;
};

export default Image;
