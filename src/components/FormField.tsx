import React, { useMemo, useState, useEffect } from 'react';

import { StyleSheet, View, Image, Animated } from 'react-native';
import { Spacing, Colors } from '@src/styles';


import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import TextInput from './TextInput';

type FormFieldProps = {
  placeholder: string;
  icon?: any;
  value: string;
}

const FormField = ({ placeholder, icon, value }: FormFieldProps) => {

  const [focus, setFocus] = useState(
    { isFocused: false }
  );

  const animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (focus.isFocused || value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  });

  const handleFocus = () => {
    setFocus({ isFocused: true });
  }

  const handleBlur = () => {
    setFocus({ isFocused: false });
  }

  const styles = useMemo(() => StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Spacing.spaceSize[2],
      marginTop: Spacing.spaceSize[5],
      marginLeft: widthPercentageToDP(6.4),
      marginRight: widthPercentageToDP(6.4),
      padding: Spacing.spaceSize[3],
      width: widthPercentageToDP(87.2),
      height: heightPercentageToDP(8.3),
      backgroundColor: focus.isFocused ? Colors.semiGreyLighter : Colors.lightGrey
    },
    text: {
      color: Colors.black,
      paddingTop: heightPercentageToDP(3.0),
      fontSize: 16,
      width: widthPercentageToDP(70),
      height: heightPercentageToDP(8.3),
    },
  }), [focus]);

  const placeholderStyle = {
    position: 'absolute',
    left: widthPercentageToDP(4.2),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [heightPercentageToDP(2.7), heightPercentageToDP(1.0)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    fontWeight: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['500', '300'],
    }),
    color: Colors.semiGrey
  }

  return (
    <View style={styles.view}>
      <Animated.Text style={placeholderStyle}>
        {placeholder}
      </Animated.Text>
      <TextInput
        style={styles.text}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Image source={icon} />
    </View>
  );
};

export default FormField;