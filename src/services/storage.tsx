import { AsyncStorage } from 'react-native';

const LOCAL_USER_STATE = 'LOCAL_USER_STATE';

const storeUser = async (value) => {
  try {
    await AsyncStorage.setItem(LOCAL_USER_STATE, JSON.stringify(value));
  } catch (error) {
    // console.log('ERROR SAVING LOCAL USER', error);
  }
};

const retrieveUser = async () => {
  try {
    const value = await AsyncStorage.getItem(LOCAL_USER_STATE);
    if (value !== null) return JSON.parse(value);
  } catch (error) {
    // console.log('ERROR RETRIEVING LOCAL USER', error);
  }

  return null;
};

export default {
  storeUser,
  retrieveUser,
};
