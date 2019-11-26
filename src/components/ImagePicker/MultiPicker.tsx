import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import ImageBrowser from './ImageBrowser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MultiPicker = () => {
  const [state, setState] = useState({
    imageBrowserOpen: false,
    photos: [],
  });

  const imageBrowserCallback = async (callback) => {
    try {
      const photos = await callback;
      console.log(photos);
      setState({
        imageBrowserOpen: false,
        photos,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const renderImage = (item, i) => (
    <Image
      style={{ height: 100, width: 100 }}
      source={{ uri: item.file }}
      key={i}
    />
  );

  if (state.imageBrowserOpen) {
    return (<ImageBrowser max={4} callback={imageBrowserCallback} />);
  }
  return (
    <View style={styles.container}>
      <Button
        title="Choose Images"
        onPress={() => setState((prev) => ({ ...prev, imageBrowserOpen: true }))}
      />
      <Text>This is an example of a</Text>
      <Text>multi image selector using expo</Text>
      <ScrollView>
        {state.photos.map((item, i) => renderImage(item, i))}
      </ScrollView>
    </View>
  );
};

export default MultiPicker;
