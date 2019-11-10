/* eslint-disable react/no-array-index-key */

import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useImageViewer from '@src/hooks/useImageViewer';

import { Colors } from '@src/styles';

import View from './View';
import Image from './Image';
import Text from './Text';

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

const Preview = ({ index = undefined, uri = undefined, count = undefined }) => (
  <View
    style={{ ...styles.roundView, ...styles.border, marginLeft: -15 }}
    justifyCenter
    alignCenter
    bgColor={count ? 'secondaryLight' : 'lightGrey'}
  >
    {uri && (
      <Image
        rounded
        size={48}
        uri={uri}
        style={{ ...styles.border, marginLeft: index && -15 }}
      />
    )}

    {!uri && count && (
      <Text variant="semiBoldLarge" color="white">{`+${count}`}</Text>
    )}
  </View>
);

const LabelWrapper = ({ label, onPress, children }) => (
  <View flex={1} row justifyBetween alignCenter onPress={onPress}>
    <Text variant="semiBoldLarge" color="dark">{label}</Text>
    {children}
  </View>
);

type Props = {
  images: string[];
  label?: string;
  onAdd?: (uri: string) => void;
}

const ImageSelector = ({ label, images = [], onAdd }: Props) => {
  const { spliced, moreCount } = useMemo(() => ({
    spliced: images.slice(0, 3),
    moreCount: images.length > 3 && images.length - 3,
  }), [images]);

  const { imageViewer, onOpenViewer } = useImageViewer(images, onAdd);

  const Wrapper = label ? LabelWrapper : View;

  return (
    <>
      {imageViewer}
      <Wrapper label={label} onPress={onOpenViewer}>
        <View row>
          {Array.from({ length: 3 }).map((_, index) => {
            const isMore = moreCount && index === spliced.length - 1;
            const uri = images[index];
            const key = `${uri}-${index}`;

            if (isMore) {
              return (
                <Preview key={key} count={moreCount} />
              );
            }

            return (
              <Preview key={key} uri={uri} />
            );
          })}
        </View>
      </Wrapper>
    </>
  );
};

export default ImageSelector;
