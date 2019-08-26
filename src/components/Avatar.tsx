import React, { useMemo } from 'react';
import { StyleSheet, Image } from 'react-native';

import { mockImg } from '@src/services/mock';

type AvatarProps = {
  size: number;
  uri?: string;
};

const Avatar = ({ size, uri = mockImg }: AvatarProps) => {
  const styles = useMemo(() => StyleSheet.create({
    image: {
      height: size,
      width: size,
      borderRadius: size / 2,
    },
  }), [size]);

  return <Image style={styles.image} source={{ uri }} />;
};

export default Avatar;
