import React, { useMemo, useState, useEffect, forwardRef } from 'react';

import {
  View,
  StyleSheet,
  Animated,
  TextInputProps,
  TextInput as RNInput,
} from 'react-native';

import {
  getEmailError,
  getPasswordError,
  getZipCodeError,
  getNumberError,
} from '@src/utlities/validations';

import { ErrorIcon, EmailIcon, EyeIcon, DollarIcon } from '@src/components/icons';

import { Spacing, SpacingProp, Colors, Texts } from '@src/styles';

import Wrapper from '@src/components/View';

import TextInput from './TextInput';
import Text from './Text';

export type Props = TextInputProps & {
  placeholder: string;
  icon?: 'email' | 'password' | 'dollar';
  value: string;
  validation?: 'email' | 'password' | 'zip' | 'number';
  spacing?: SpacingProp;
  width?: number | string;
  height?: number | string;
  onChangeText?: (text: string, error?: string) => void;
}

const FormField = ({
  placeholder,
  icon,
  value,
  validation,
  spacing,
  width,
  height,
  onChangeText,
  ...textInputProps
}: Props, ref: React.Ref<RNInput>) => {
  const [isFocused, setIsFocused] = useState();
  const [didBlur, setDidBlur] = useState();

  const animatedIsFocused = useMemo(() => new Animated.Value(value === '' ? 0 : 1), [value]);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }, [animatedIsFocused, isFocused, value]);

  const validationError = useMemo(() => {
    switch (validation) {
      case 'email':
        return getEmailError(value);
      case 'password':
        return getPasswordError(value);
      case 'zip':
        return getZipCodeError(value);
      case 'number':
        return getNumberError(value);
      default:
        return undefined;
    }
  }, [validation, value]);

  const shouldShowError = useMemo(() => {
    if (validation === 'password') {
      return (isFocused || didBlur) && validationError;
    }

    return didBlur && validationError;
  }, [validation, didBlur, isFocused, validationError]);

  const styles = useMemo(() => StyleSheet.create({
    view: {
      width,
      height,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: Spacing.spaceSize[2],
      borderWidth: shouldShowError ? 1 : null,
      borderColor: shouldShowError ? Colors.error : null,
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
  }), [shouldShowError, width, height, spacing, isFocused]);

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

  const renderIcon = useMemo(() => {
    if (shouldShowError) {
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
  }, [shouldShowError, icon]);

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
      {shouldShowError && (
        <Text spacing={{ mt: 2 }} variant="errorSmall">
          {validationError}
        </Text>
      )}
    </>
  );
};

export default forwardRef(FormField);
