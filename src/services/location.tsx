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

const getLocationPermissions = async (onFail?) => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    alertFail(
      'Permission to access location was denied. Please update your phone settings to use the app with location services enabled.',
      onFail,
    );

    return false;
  }

  return true;
};

const getLocation = async (onFail?) => {
  getLocationPermissions(onFail);

  if (getLocationPermissions(onFail)) {
    const location = await Location.getCurrentPositionAsync({});

    return location;
  }

  return false;
};

export {
  getLocationPermissions,
  getLocation,
};
