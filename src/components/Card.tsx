import React, { useMemo } from 'react';

import { StyleSheet, Image } from 'react-native';
import { Spacing } from '@src/styles';

import ArrowIcon from '@src/assets/Icons/arrowRightLight.png';
import Text from './Text';
import View from './View';

type CardProps = {
  placeholder: string;
  icon?: any;
  details?: string;
  arrow?: boolean;
  large?: boolean;
  children?: JSX.Element | JSX.Element[];
  onPress?: () => void;
}


const Card = ({ placeholder, icon, arrow, details, large, children }: CardProps) => {
  const styles = useMemo(() => StyleSheet.create({
    icon: {
      margin: Spacing.spaceSize[3],
    },
    arrow: {
      display: arrow ? 'flex' : 'none',
      position: 'absolute',
      top: large ? 30 : 17,
      right: 30,
    },
  }), [arrow, large]);

  return (
    <View
      row
      alignCenter
      width="100%"
      height={large ? 80 : 50}
      bgColor="white"
      variant="borderBottom"
    >
      <Image style={styles.icon} source={icon} />
      <View column spacing={{ mr: 5 }}>
        <Text
          typography={{
            size: 2,
            weight: '700',
            color: 'dark',
          }}
        >
          {placeholder}
        </Text>
        {details ? <Text typography={{ size: 1, weight: '300', color: 'grey' }}>{details}</Text> : null}
      </View>
      {/* {children} I don't understand why eslint is giving me a type error */}
      <Image style={styles.arrow} source={ArrowIcon} />
    </View>
  );
};

export default Card;