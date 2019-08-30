import React from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import { Colors } from '@src/styles';

const { dotStyle, activeDotStyle } = StyleSheet.create({
  dotStyle: { backgroundColor: Colors.secondaryLighter },
  activeDotStyle: { backgroundColor: Colors.secondary },
});

type SliderProps = {
  slides: JSX.Element[];
};

const Slider = ({ slides = [] }: SliderProps) => (
  <Swiper
    dotStyle={dotStyle}
    activeDotStyle={activeDotStyle}
    loop={false}
  >
    {slides}
  </Swiper>
);

export default Slider;
