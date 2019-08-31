import React, { useMemo, useState } from 'react';

import { StyleSheet, View, Image, Animated } from 'react-native';
import { Spacing, Colors } from '@src/styles';


import { widthPercentageToDP, heightPercentageToDP } from '../deviceSize';

import TextInput from './TextInput';
import Text from './Text';



type FormFieldProps = {
  placeholder: string;
  icon?: any;
}

const FormField = ({ placeholder, icon }: FormFieldProps) => {

  const [focus, setFocus] = useState(
    { isFocused: false }
  );

  // const [animatedValue, setAnimatedValue] = useState({

  // });

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
      borderRadius: Spacing.space[2],
      marginTop: Spacing.space[5],
      marginLeft: widthPercentageToDP(6.4),
      marginRight: widthPercentageToDP(6.4),
      padding: Spacing.space[3],
      width: widthPercentageToDP(87.2),
      height: heightPercentageToDP(8.3),
      backgroundColor: focus.isFocused ? Colors['semiGreyThree'] : Colors['lightGrey']
    },
    text: {
      color: Colors['semiGrey'],
      fontSize: widthPercentageToDP(4.2),
      width: widthPercentageToDP(70),
      height: heightPercentageToDP(8.3),
    },
    placeholderStyle: {
      position: 'absolute',
      left: 0,
      top: !focus.isFocused ? 18 : 0,
      fontSize: !focus.isFocused ? 16 : 14,
      color: !focus.isFocused ? '#aaa' : '#000',
    }
  }), [focus]);


  return (
    <View style={styles.view}>
      <Text style={styles.placeholderStyle}>
        {placeholder}
      </Text>
      <TextInput
        style={styles.text}
        onFocus={handleFocus}
        // placeholder={placeholder}
        onBlur={handleBlur}
      />
      <Image source={icon} />
    </View>
  );
};

export default FormField;