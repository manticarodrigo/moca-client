import { Alert } from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { Colors } from '@src/styles';

const alertFail = (message: string) => Alert.alert('Image Picker Failed', message);

const getImage = async (callback: (response: ImagePicker.ImagePickerResult) => void) => {
  const { permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
  const options = [{ title: 'Cancel', action: () => null }];

  if (permissions.camera.status === 'granted') {
    options.unshift({ title: 'Take Photo', action: ImagePicker.launchCameraAsync });
  }

  if (permissions.cameraRoll.status === 'granted') {
    options.unshift({ title: 'Photo From Library', action: ImagePicker.launchImageLibraryAsync });
  }

  if (options.length === 1) {
    alertFail('You did not grant permissions to use your photos.');
    return;
  }

  const lastIndex = options.length - 1;

  ActionSheet.showActionSheetWithOptions({
    options: options.map(({ title }) => title),
    cancelButtonIndex: lastIndex,
    tintColor: Colors.primary,
  }, async (index) => {
    let response: ImagePicker.ImagePickerResult = { cancelled: true };

    try {
      if (index !== lastIndex) {
        response = await options[index].action();
      }
    } catch (error) {
      alertFail(error.message);
    }

    callback(response);
  });
};

export {
  getImage,
};
