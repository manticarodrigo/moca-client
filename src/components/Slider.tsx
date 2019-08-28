import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';

import { Slides } from '@src/styles';

const styles = StyleSheet.create({ ...Slides });

type Slide = {
  icon?: JSX.Element;
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
    {slides.map(({ icon, title, text }) => (
      <View key={title} style={styles.slide}>
        {icon}
        <Text style={styles.slideTitle}>{title}</Text>
        <Text style={styles.slideText}>{text}</Text>
      </View>
    ))}
  </Swiper>
);

export default Slider;
