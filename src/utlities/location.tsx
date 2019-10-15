import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const alertFail = (message: string, onClose: () => void) => Alert.alert(
  'Oops!',
  message,
  [{
    text: 'Ok',
    onPress: onClose,
  }],
);

const getLocation = async (onAlertClose) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    alertFail(
      'Permission to access location was denied. Please update your phone settings to use the app with location services enabled.',
      onAlertClose,
    );

    return false;
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
};

export {
  getLocation,
};
