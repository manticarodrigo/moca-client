import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const getDeviceToken = async () => {
  await Permissions.askAsync(Permissions.NOTIFICATIONS);

  try {
    return Notifications.getExpoPushTokenAsync();
  } catch {
    return undefined;
  }
};

export {
  getDeviceToken,
};
