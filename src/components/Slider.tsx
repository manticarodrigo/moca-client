import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';

import { Slides } from '@src/styles';

const styles = StyleSheet.create({ ...Slides });

type Slide = {
  title: string;
  text: string;
}

type SliderProps = {
  slides: Slide[];
};

const Slider = ({ slides = [] }: SliderProps) => (
  <Swiper
    dotStyle={styles.dotStyle}
    activeDotStyle={styles.activeDotStyle}
    loop={false}
  >
    {slides.map((slide) => (
      <View key={slide.title} style={styles.slide}>
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideText}>{slide.text}</Text>
      </View>
    ))}
  </Swiper>
);

export default Slider;
