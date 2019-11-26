/* eslint-disable react/no-array-index-key */
import React, { useState, useMemo } from 'react';
import { Modal, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import { getImage } from '@src/utlities/imagePicker';

import { Colors } from '@src/styles';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import BackButton from '@src/components/BackButton';

const styles = StyleSheet.create({
  roundView: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
  border: {
    borderWidth: 2,
    borderColor: Colors.white,
  },
});

const initialState = { open: false, index: 0 };

type Image = {
  id?: number;
  image?: string;
}

const useImageViewer = <Images extends Image[]>(
  images: Images,
  onAdd?: (uri: string) => void,
  onDelete?: (index: number) => void,
) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const uris = useMemo(() => images.map(({ image }) => image), [images]);

  const onShow = () => setTimeout(() => setLoading(false));

  const onChange = (index) => setState((prev) => ({ ...prev, index }));

  const onClose = () => setState(initialState);

  const onPressImage = (source: string) => {
    const index = uris.findIndex((uri) => source === uri);

    if (index === -1) return;

    setState({ open: true, index });
  };

  const onPressAdd = async () => {
    getImage((response) => {
      if (response.cancelled === false) {
        setLoading(true);

        if (onAdd) {
          setTimeout(() => onAdd(response.uri));
        }
      }
    });
  };

  const onPressDelete = (index: number) => () => onDelete(index);

  const onOpenViewer = async () => {
    setLoading(true);

    if (onAdd && !uris.length) {
      await onPressAdd();
    } else if (uris.length) {
      setState({ open: true, index: 0 });
    }
  };

  const imageUrls = useMemo(() => {
    const urls = uris.map((uri) => ({ url: uri }));

    setTimeout(() => setLoading(false));

    return urls;
  }, [uris]);

  return {
    imageViewer: (
      <>

        {state.open && <StatusBar barStyle="dark-content" />}

        <Modal
          visible={state.open}
          animationType="fade"
          onShow={onShow}
        >
          <View
            row
            justifyBetween
            style={{ borderBottomWidth: 2 }}
            pt={6}
            px={3}
            pb={4}
            width={WINDOW_WIDTH}
            variant="borderBottom"
            bgColor="white"
          >
            <View onPress={onClose}>
              <BackButton />
            </View>

            <Text variant="title">{`${state.index + 1}/${uris.length}`}</Text>

            <View width={40} />
          </View>
          <View flex={1} bgColor="black">
            {loading ? (
              <View flex={1} justifyCenter alignCenter>
                <ActivityIndicator size="large" color={Colors.white} />
              </View>
            ) : (
              <ImageViewer
                enableImageZoom
                enableSwipeDown
                imageUrls={imageUrls}
                index={state.index}
                renderIndicator={() => null}
                onChange={onChange}
                onSwipeDown={onClose}
              />
            )}
          </View>
          <View
            style={{ borderTopWidth: 2 }}
            pt={2}
            pb={5}
            width={WINDOW_WIDTH}
            variant="borderTop"
            bgColor="white"
          >

            <ScrollView horizontal contentContainerStyle={{ padding: 16 }}>

              {onAdd && (
                <View
                  style={{ ...styles.roundView, ...styles.border, marginRight: 20 }}
                  justifyCenter
                  alignCenter
                  bgColor="secondaryLight"
                  onPress={onPressAdd}
                >
                  <Text variant="title" color="white">+</Text>
                </View>
              )}
              <>
                {uris.map((uri, index) => (
                  <View key={`${uri}-${index}`}>
                    <View
                      style={{
                        ...styles.roundView,
                        ...styles.border,
                        marginRight: 10,
                        borderColor: index === state.index ? Colors.secondaryLight : Colors.white,
                      }}
                      justifyCenter
                      alignCenter
                      bgColor="lightGrey"
                      onPress={() => setState((prev) => ({ ...prev, index }))}
                    >
                      <Image
                        size={70}
                        uri={uri}
                        style={{ ...styles.border }}
                      />
                    </View>
                    {!!onDelete && (
                      <View variant="deleteBadge" onPress={onPressDelete(index)}>
                        <Text variant="semiBoldLarge" size={0} color="white">
                          ×
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </>

            </ScrollView>

          </View>
        </Modal>
      </>
    ),
    onOpenViewer,
    onPressImage,
  };
};

export default useImageViewer;
