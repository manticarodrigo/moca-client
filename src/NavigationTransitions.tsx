
import { Easing, Animated } from 'react-native';
import { NavigationTransitionProps } from 'react-navigation';

import { Colors } from '@src/styles';

const SlideRight = (index: number, position, width: number) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0],
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};


const SlideTop = (index: number, position, height: number) => { // not sure what position type is
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0],
  });
  const slideFromBottom = { transform: [{ translateY }] };
  return slideFromBottom;
};

export const TransitionConfiguration = () => ({
  containerStyle: {
    backgroundColor: Colors.primary,
  },
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (transitionProps: NavigationTransitionProps) => {
    const { layout, position, scene } = transitionProps;
    const width = layout.initWidth;
    const height = layout.initHeight;
    const { index, route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'default';
    return {
      slideTop: SlideTop(index, position, height),
      default: SlideRight(index, position, width),
    }[transition];
  },
});
