import React, { useMemo, useState, useEffect, forwardRef } from 'react';

import {
  StyleSheet,
  View,
  Animated,
  TextInputProps,
  TextInput as RNInput,
} from 'react-native';

import { getEmailError, getPasswordError } from '@src/utlities/validations';

import { ErrorIcon, EmailIcon, EyeIcon, DollarIcon } from '@src/components/icons';

import { Spacing, SpacingProp, Colors, Texts } from '@src/styles';

import Wrapper from '@src/components/View';

import TextInput from './TextInput';
import Text from './Text';

export type FormFieldProps = TextInputProps & {
  placeholder: string;
  icon?: 'email' | 'password' | 'dollar';
  value: string;
  validation?: 'email' | 'password';
  spacing?: SpacingProp;
  error?: boolean | string;
  width?: number | string;
  height?: number | string;
  onChangeText?: (text: string, error?: string) => void;
}

const FormField = ({
  placeholder,
  icon,
  value,
  validation,
  width,
  height,
  spacing,
  error,
  onChangeText,
  ...textInputProps
}: FormFieldProps, ref: React.Ref<RNInput>) => {
  const [isFocused, setIsFocused] = useState();
  const [didBlur, setDidBlur] = useState();
  const animatedIsFocused = useMemo(() => new Animated.Value(value === '' ? 0 : 1), [value]);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  });

  const styles = useMemo(() => StyleSheet.create({
    view: {
      width,
      height,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Spacing.spaceSize[2],
      borderWidth: error ? 1 : null,
      borderColor: error ? Colors.error : null,
      margin: 0,
      marginTop: Spacing.spaceSize[2],
      paddingRight: Spacing.spaceSize[3],
      paddingLeft: Spacing.spaceSize[3],
      backgroundColor: isFocused ? Colors.semiGreyLighter : Colors.lightGrey,
      ...Spacing.getStyles(spacing),
    },
    text: {
      ...Texts.regular,
      color: Colors.dark,
      paddingTop: 10,
      fontSize: 16,
      width: '100%',
      height: 60,
    },
  }), [error, width, height, spacing, isFocused]);

  const placeholderStyle = {
    position: 'absolute',
    left: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 16],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 5],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: Colors.semiGrey,
  };

  const validationError = useMemo(() => {
    switch (validation) {
      case 'email':
        return getEmailError(value);
      case 'password':
        return getPasswordError(value);
      default:
        return undefined;
    }
  }, [validation, value]);

  const renderIcon = useMemo(() => {
    if (didBlur && validationError) {
      return <ErrorIcon />;
    }

    if (error) {
      return <ErrorIcon />;
    }

    switch (icon) {
      case 'email':
        return <EmailIcon />;
      case 'password':
        return <EyeIcon />;
      case 'dollar':
        return <DollarIcon />;
      default:
        return null;
    }
  }, [validationError, didBlur, error, icon]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDidBlur(true);
  };

  const handleChangeText = (text: string) => {
    if (validation) {
      return onChangeText(text, validationError);
    }

    return onChangeText(text);
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
              onChangeText={handleChangeText}
              {...textInputProps}
            />
            <View style={{ position: 'absolute', top: 20, right: 20 }}>
              {renderIcon}
            </View>
          </View>
        </Wrapper>
      </Wrapper>
      {!!(didBlur && validationError) && (
        <Text spacing={{ mt: 2 }} variant="errorSmall">
          {validationError}
        </Text>
      )}
      {typeof error === 'string' && (
        <Text spacing={{ mt: 1 }} variant="errorSmall">
          Please enter a valid Zip code
        </Text>
      )}
    </>
  );
};

export default forwardRef(FormField);
