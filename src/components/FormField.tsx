import React, { useMemo, useState, useEffect, forwardRef } from 'react';

import { StyleSheet, View, Image, Animated, TextInputProps } from 'react-native';
import { Spacing, SpacingProp, Colors } from '@src/styles';


import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import ErrorIcon from '@src/assets/Icons/warning.png';

import TextInput from './TextInput';

type FormFieldProps = TextInputProps & {
  placeholder: string;
  icon?: object;
  value: string;
  spacing?: SpacingProp;
  error?: boolean;
}

const FormField = ({
  placeholder,
  icon,
  value,
  spacing,
  error,
  ...textInputProps
}: FormFieldProps, ref: React.Ref<any>) => {
  const [isFocused, setIsFocused] = useState(false);

  const animatedIsFocused = useMemo(() => new Animated.Value(value === '' ? 0 : 1), [value]);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const styles = useMemo(() => StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Spacing.spaceSize[2],
      borderWidth: error ? 1 : null,
      borderColor: error ? Colors.error : null,
      marginTop: Spacing.spaceSize[2],
      marginLeft: widthPercentageToDP(6.4),
      marginRight: widthPercentageToDP(6.4),
      padding: Spacing.spaceSize[3],
      ...Spacing.getStyles(spacing),
      width: widthPercentageToDP(87.2),
      height: heightPercentageToDP(8.3),
      backgroundColor: isFocused ? Colors.semiGreyLighter : Colors.lightGrey,
    },
    text: {
      color: Colors.black,
      paddingTop: heightPercentageToDP(3.0),
      fontSize: 16,
      width: widthPercentageToDP(70),
      height: heightPercentageToDP(8.3),
    },
  }), [isFocused, spacing, error]);

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
    color: Colors.semiGrey,
  };

  return (
    <View style={styles.view}>
      <Animated.Text style={placeholderStyle}>
        {placeholder}
      </Animated.Text>
      <TextInput
        style={styles.text}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
        value={value}
        ref={ref}
      />
      <Image source={error ? ErrorIcon : icon} />
    </View>
  );
};

export default forwardRef(FormField);
