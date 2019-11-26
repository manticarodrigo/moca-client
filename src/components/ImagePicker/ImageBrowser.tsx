/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Button,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import ImageTile from './ImageTile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: WINDOW_WIDTH,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
});

const ImageBrowser = ({ max = 10, callback }) => {
  const [state, setState] = useState({
    photos: [],
    selected: {},
    after: null,
    has_next_page: true,
  });

  const selectImage = (index) => {
    let newSelected = { ...state.selected };
    if (newSelected[index]) {
      delete newSelected[index];
    } else {
      newSelected[index] = true;
    }
    if (Object.keys(newSelected).length > max) return;
    if (!newSelected) newSelected = {};
    setState((prev) => ({ ...prev, selected: newSelected }));
  };

  const processPhotos = (r) => {
    if (state.after === r.page_info.end_cursor) return;
    const uris = r.edges.map((i) => i.node).map((i) => i.image).map((i) => i.uri);
    setState((prev) => ({
      ...prev,
      photos: [...state.photos, ...uris],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page,
    }));
  };

  const getPhotos = () => {
    const params = { first: 50, mimeTypes: ['image/jpeg'], after: undefined };

    if (state.after) params.after = state.after;
    if (!state.has_next_page) return;

    CameraRoll
      .getPhotos({ ...params, assetType: 'Photos' })
      .then(processPhotos);
  };

  const getItemLayout = (data, index) => {
    const length = WINDOW_WIDTH / 4;
    return { length, offset: length * index, index };
  };

  const prepareCallback = () => {
    const { selected, photos } = state;
    const selectedPhotos = photos.filter((item, index) => (selected[index]));
    const files = selectedPhotos
      .map((i) => FileSystem.getInfoAsync(i, { md5: true }));
    const callbackResult = Promise
      .all(files)
      .then((imageData) => imageData.map((data, i) => ({ file: selectedPhotos[i], ...data })));
    callback(callbackResult);
  };

  const renderHeader = () => {
    const selectedCount = Object.keys(state.selected).length;
    let headerText = `${selectedCount} Selected`;
    if (selectedCount === max) headerText += ' (Max)';

    return (
      <View style={styles.header}>
        <Button
          title="Exit"
          onPress={() => callback(Promise.resolve([]))}
        />
        <Text>{headerText}</Text>
        <Button
          title="Choose"
          onPress={() => prepareCallback()}
        />
      </View>
    );
  };

  const renderImageTile = ({ item, index }) => {
    const selected = !!state.selected[index];

    return (
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        selectImage={selectImage}
      />
    );
  };

  const renderImages = () => (
    <FlatList
      data={state.photos}
      numColumns={4}
      renderItem={renderImageTile}
      keyExtractor={(_, index) => index.toString()}
      onEndReached={getPhotos}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<Text>Loading...</Text>}
      initialNumToRender={24}
      getItemLayout={getItemLayout}
    />
  );

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderImages()}
    </View>
  );
};

export default ImageBrowser;
