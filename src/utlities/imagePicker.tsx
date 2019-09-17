import ActionSheet from 'react-native-action-sheet';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { Colors } from '@src/styles';

const getImage = async (callback: (response: ImagePicker.ImagePickerResult) => void) => {
  const permissions = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

  if (permissions.status !== 'granted') {
    const request = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (request.status !== 'granted') return;
  }

  ActionSheet.showActionSheetWithOptions({
    options: ['Camera', 'Photos', 'Cancel'],
    cancelButtonIndex: 2,
    tintColor: Colors.primary,
  }, async (buttonIndex) => {
    let response: ImagePicker.ImagePickerResult = { cancelled: true };

    if (buttonIndex === 0) {
      response = await ImagePicker.launchCameraAsync();
    }

    if (buttonIndex === 1) {
      response = await ImagePicker.launchImageLibraryAsync();
    }

    callback(response);
  });
};

export {
  getImage,
};
