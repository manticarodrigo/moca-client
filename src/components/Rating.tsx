import React, { useMemo } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { Spacing, Colors } from '@src/styles';

import OneStar from '@src/assets/Icons/1Star.png';
import TwoStar from '@src/assets/Icons/2Star.png';
import ThreeStar from '@src/assets/Icons/3Star.png';
import FourStar from '@src/assets/Icons/4Star.png';
import FiveStar from '@src/assets/Icons/5Star.png';

// import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import Text from './Text';

type RatingProps = {
  rate: string;
}


const Rating = ({ rate }: RatingProps) => {
  const styles = useMemo(() => StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: Spacing.spaceSize[1],
      padding: Spacing.spaceSize[2],
    },
    text: {
      margin: Spacing.spaceSize[1],
      fontSize: 16,
      fontWeight: '700',
      color: Colors.secondary,
    },
  }), []);

  const stars = {
    1: OneStar,
    2: TwoStar,
    3: ThreeStar,
    4: FourStar,
    5: FiveStar,
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{rate}</Text>
      <Image source={stars[rate]} />
    </View>
  );
};

export default Rating;
