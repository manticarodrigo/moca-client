import React, { useMemo, useState, useEffect, forwardRef } from 'react';

import {
  View,
  StyleSheet,
  Animated,
  TextInputProps,
  TextInput as RNInput,
} from 'react-native';

import { getValidationError } from '@src/utlities/validations';

import { ErrorIcon, EmailIcon, EyeIcon, DollarIcon } from '@src/components/icons';

import { Spacing, SpacingProps, Colors, Texts, Typography } from '@src/styles';

import Wrapper from '@src/components/View';

import TextInput from './TextInput';
import Text from './Text';

export type Props = TextInputProps & {
  placeholder: string;
  icon?: 'email' | 'password' | 'dollar';
  value: string;
  error?: string;
  required?: boolean;
  validation?: 'email' | 'password' | 'zip' | 'number';
  spacing?: SpacingProps;
  width?: number | string;
  height?: number | string;
  onChangeText?: (text: string, error?: string) => void;
}

const FormField = ({
  placeholder,
  icon,
  value,
  error,
  multiline,
  required,
  validation,
  spacing,
  width,
  height,
  onChangeText,
  ...textInputProps
}: Props, ref: React.Ref<RNInput>) => {
  const [focused, setFocused] = useState();
  const [blurred, setBlurred] = useState();

  const focusedOrFilled = focused || value !== '';

  const validationError = useMemo(
    () => getValidationError(value, validation, required), [value, validation, required],
  );

  const shouldShowError = useMemo(() => {
    if (validation === 'password') {
      return (focusedOrFilled || blurred) && (error || validationError);
    }

    return (blurred && (error || validationError));
  }, [validation, blurred, validationError, error, focusedOrFilled]);

  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focusedOrFilled ? 1 : 0,
      duration: 200,
    }).start();
  }, [animatedValue, focusedOrFilled, value]);

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
      backgroundColor: focused ? Colors.semiGreyLighter : Colors.lightGrey,
      ...Spacing.getStyles({ m: 0, mt: 2, px: 3 }),
      ...Spacing.getStyles(spacing),
    },
    text: {
      ...Typography.getStyles(Texts.regular),
      width: '100%',
      height: 'auto',
      color: Colors.dark,
      paddingTop: 32,
      paddingBottom: multiline ? 24 : 10,
    },
  }), [shouldShowError, multiline, width, height, spacing, focused]);

  const placeholderStyle = {
    position: 'absolute',
    left: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 8],
    }),
    fontSize: animatedValue.interpolate({
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
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setBlurred(true);
  };

  const handleChangeText = (text: string) => {
    onChangeText(text, getValidationError(text, validation, required));
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
              multiline={multiline}
              returnKeyType={multiline ? 'default' : undefined}
              scrollEnabled={false}
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
        <Text mt={2} variant="regular" size={1} color="error" align="center">
          {error || validationError}
        </Text>
      )}
    </>
  );
};

export default forwardRef(FormField);
