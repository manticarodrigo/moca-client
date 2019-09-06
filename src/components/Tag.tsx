import React, { useMemo, useCallback } from 'react';

import { StyleSheet, View, Image } from 'react-native';
import { Spacing, Colors } from '@src/styles';

import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import Text from './Text';

type TagProps = {
  placeholder: string;
  icon?: any;
  positive?: boolean;
  positiveReport?: boolean;
  emptySlots?: boolean;
  away?: boolean;
}


const Tag = ({ placeholder, icon, positive, positiveReport, emptySlots, away }: TagProps) => {
  const textAndImageColor = useMemo(() => {
    if (positive) {
      return Colors.white;
    } if (positiveReport) {
      return Colors.secondary;
    }
    return Colors.semiGrey;
  }, [positive, positiveReport]);

  const width = useMemo(() => {
    if (emptySlots) {
      return widthPercentageToDP(13.6);
    } if (away) {
      return widthPercentageToDP(21.9);
    }
    return widthPercentageToDP(16.3);
  }, [emptySlots, away]);

  const styles = useMemo(() => StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: away ? 'center' : 'space-between',
      borderRadius: Spacing.spaceSize[5],
      borderWidth: 1,
      borderColor: (positive || positiveReport) ? Colors.secondary : Colors.semiGrey,
      margin: Spacing.spaceSize[1],
      padding: Spacing.spaceSize[2],
      width,
      height: heightPercentageToDP(3.6),
      backgroundColor: positive ? Colors.secondary : null,
    },
    text: {
      color: textAndImageColor,
    },
    img: {
      tintColor: textAndImageColor,
    },
  }), [positive, positiveReport, textAndImageColor, width, away]);


  return (
    <View style={styles.view}>
      <Image style={styles.img} source={icon} />
      <Text style={styles.text}>{placeholder}</Text>
    </View>
  );
};

export default Tag;
