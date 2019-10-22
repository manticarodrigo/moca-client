import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { mockImg } from '@src/services/mock';

import { Colors } from '@src/styles';

import View from './View';
import Image from './Image';
import Text from './Text';

const mock = [mockImg, mockImg, mockImg, mockImg, mockImg];

const styles = StyleSheet.create({
  roundView: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
});

const MoreRounded = ({ count }) => (
  <View
    style={{ ...styles.roundView, ...styles.border, marginLeft: -15 }}
    justifyCenter
    alignCenter
    bgColor="secondaryLight"
  >
    <Text variant="boldWhite">
      +
      {count}
    </Text>
  </View>
);

const ImagesPreview = ({ images = mock }) => {
  const { spliced, moreCount } = useMemo(() => ({
    spliced: images.slice(0, 3),
    moreCount: images.length > 3 && images.length - 3,
  }), [images]);

  return (
    <View row>
      {spliced.map((uri, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`${uri}-${index}`}>
          {(moreCount && index === spliced.length - 1) ? (
            <MoreRounded count={moreCount} />
          ) : (
            <Image
              style={{
                ...styles.border,
                marginLeft: index && -15,
              }}
              size={48}
              rounded
              uri={uri}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default ImagesPreview;
