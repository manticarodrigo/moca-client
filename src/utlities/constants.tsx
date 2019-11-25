import { Platform, Dimensions } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const WINDOW_WIDTH = Dimensions.get('window').width;
const KEYBOARD_AVOID_SCROLL_OFFSET = 200;

export {
  IS_IOS,
  WINDOW_WIDTH,
  KEYBOARD_AVOID_SCROLL_OFFSET,
};
