import React, { useMemo, useState, useEffect, forwardRef } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Animated,
  TextInputProps,
  TextInput as RNInput,
} from 'react-native';

import { Spacing, SpacingProp, Colors, Texts } from '@src/styles';

import Wrapper from '@src/components/View';

import { widthPercentageToDP, heightPercentageToDP } from '@src/utlities/deviceSize';

import ErrorIcon from '@src/assets/Icons/warning.png';

import TextInput from './TextInput';
import Text from './Text';

export type FormFieldProps = TextInputProps & {
  placeholder: string;
  icon?: object;
  value: string;
  spacing?: SpacingProp;
  error?: boolean | string;
  width?: number | string;
  height?: number | string;
}

const FormField = ({
  placeholder,
  icon,
  value,
  width,
  height,
  spacing,
  error,
  ...textInputProps
}: FormFieldProps, ref: React.Ref<RNInput>) => {
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
      margin: 0,
      width,
      height,
      marginTop: Spacing.spaceSize[2],
      paddingRight: Spacing.spaceSize[3],
      paddingLeft: Spacing.spaceSize[3],
      ...Spacing.getStyles(spacing),
      backgroundColor: isFocused ? Colors.semiGreyLighter : Colors.lightGrey,
    },
    text: {
      ...Texts.regular,
      color: Colors.semiGrey,
      paddingTop: heightPercentageToDP(3.0),
      fontSize: 16,
      width: widthPercentageToDP(70),
      height: heightPercentageToDP(8.3),
    },
  }), [error, width, height, spacing, isFocused]);

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
    <>
      <Wrapper row>
        <Wrapper flex={1}>
          <View style={styles.view}>
            <Animated.Text style={placeholderStyle}>
              {placeholder}
            </Animated.Text>
            <TextInput
              ref={ref}
              style={styles.text}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...textInputProps}
            />
            <Image source={error ? ErrorIcon : icon} />
          </View>
        </Wrapper>
      </Wrapper>
      {typeof error === 'string' && (
        <Text spacing={{ mt: 1 }} variant="errorSmall">
          Please enter a valid Zip code
        </Text>
      )}
    </>
  );
};

export default forwardRef(FormField);
