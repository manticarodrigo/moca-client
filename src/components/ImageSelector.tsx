/* eslint-disable react/no-array-index-key */

import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useImageViewer from '@src/hooks/useImageViewer';

import { Colors } from '@src/styles';

import View from './View';
import Image from './Image';
import Text from './Text';
import { AddIcon } from './icons';

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

const Preview = ({ index = 0, uri = undefined, count = undefined }) => (
  <View
    style={{ ...styles.roundView, ...styles.border, marginLeft: index && -15 }}
    justifyCenter
    alignCenter
    bgColor={count ? 'secondaryLight' : 'lightGrey'}
  >
    {uri && (
      <Image
        rounded
        size={48}
        uri={uri}
        style={{ ...styles.border }}
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

export type ImageObject = {
  id?: number;
  image?: string;
}

type Props = {
  images: ImageObject[];
  disableViewer?: boolean;
  label?: string;
  onAdd?: (uri: string) => void;
  onDelete?: (id: number) => void;
}

const ImageSelector = ({ images = [], disableViewer, label, onAdd, onDelete }: Props) => {
  const { spliced, moreCount } = useMemo(() => ({
    spliced: images.slice(0, 3),
    moreCount: images.length > 3 && images.length - 3,
  }), [images]);

  const { imageViewer, onOpenViewer } = useImageViewer(images, onAdd, onDelete);

  const Wrapper = label ? LabelWrapper : View;

  return (
    <>
      {imageViewer}
      <Wrapper label={label} onPress={!disableViewer ? onOpenViewer : undefined}>
        <View row>
          {Array.from({ length: Math.min(3, Math.max(1, images.length)) }).map((_, index) => {
            const isMore = moreCount && index === spliced.length - 1;
            const uri = images && images[index] ? images[index].image : undefined;
            const key = `${uri}-${index}`;

            if (isMore) {
              return (
                <Preview key={key} index={index} count={moreCount} />
              );
            }

            if (onAdd && !images.length) {
              return (
                <AddIcon key={key} />
              );
            }

            return (
              <Preview key={key} index={index} uri={uri} />
            );
          })}
        </View>
      </Wrapper>
    </>
  );
};

export default ImageSelector;
