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

import { Spacing, SpacingProp, Colors, Texts, Typography } from '@src/styles';

import Wrapper from '@src/components/View';

import TextInput from './TextInput';
import Text from './Text';

export type Props = TextInputProps & {
  placeholder: string;
  icon?: 'email' | 'password' | 'dollar';
  value: string;
  required?: boolean;
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

  const animatedIsFocused = useMemo(
    () => new Animated.Value(focusedOrFilled ? 1 : 0), [value],
  );

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: focusedOrFilled ? 1 : 0,
      duration: 200,
    }).start();
  }, [animatedIsFocused, focusedOrFilled, value]);

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
        break;
    }

    if (required && !value) {
      return 'This field is required.';
    }

    return undefined;
  }, [required, validation, value]);

  const shouldShowError = useMemo(() => {
    if (validation === 'password') {
      return (focusedOrFilled || blurred) && validationError;
    }

    return blurred && validationError;
  }, [validation, blurred, focusedOrFilled, validationError]);

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
    left: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 8],
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
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setBlurred(true);
  };

  const handleChangeText = (text: string) => onChangeText(text);

  useEffect(() => {
    if (validation) {
      // effect to update useFormFields hook errors when error changes
      // TODO: find a way to update hook only once
      onChangeText(value, validationError);
    }
  }, [validationError]);

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
        <Text variant="regular" size={1} color="error" mt={2}>
          {validationError}
        </Text>
      )}
    </>
  );
};

export default forwardRef(FormField);
