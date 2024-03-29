import React, { useMemo, useEffect } from 'react';
import { TextInputProps } from 'react-native';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useFormFields from '@src/hooks/useFormFields';

import FormField, { Props as FormFieldProps } from '@src/components/FormField';
import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

const ScrollView = ({ children }) => (
  <KeyboardAwareScrollView
    viewIsInsideTabBar
    extraScrollHeight={-100}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={{ width: WINDOW_WIDTH }}
  >
    <View p={4}>
      {children}
    </View>
  </KeyboardAwareScrollView>
);

export type Props = TextInputProps & {
  visible: boolean;
  multiline?: boolean;
  password?: boolean;
  title: string;
  placeholder: string;
  existingValue: string | number;
  validation?: FormFieldProps['validation'];
  buttonText?: string;
  buttonActionText?: boolean;
  onSubmit?: (value: string, key?: string) => void;
  onClose: () => void;
};

const InputModal = (
  {
    visible,
    multiline,
    title,
    validation,
    existingValue,
    buttonText,
    buttonActionText,
    password,
    onSubmit,
    onClose,
    ...inputProps
  }: Props,
) => {
  const {
    fieldValues,
    isAnyFieldEmpty,
    isFormValid,
    onChangeValue,
  } = useFormFields<{ value: string }>({ value: '' });

  useEffect(() => {
    if (existingValue) {
      onChangeValue('value')(existingValue.toString());
    } else if (visible) {
      onChangeValue('value')('');
    }
  }, [visible, existingValue]);

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;

  const buttonTextValue = useMemo(() => {
    if (buttonText && buttonActionText) {
      return `${(existingValue && 'Update ') || 'Add '}${buttonText}`;
    }

    return buttonText;
  }, [existingValue, buttonText, buttonActionText]);

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(fieldValues.value);
    }
  };

  const InputWrapper = multiline ? ScrollView : View;

  return (
    <Modal
      avoidKeyboard
      marginTop={50}
      isVisible={visible}
      onToggle={onClose}
    >
      <View alignCenter>
        <View
          alignCenter
          justifyCenter
          width={WINDOW_WIDTH}
          py={4}
          variant="borderBottom"
        >
          <Text variant="semiBoldLarge">{title || ''}</Text>
        </View>
        <InputWrapper alignCenter={!multiline} p={!multiline ? 4 : undefined}>
          <FormField
            value={fieldValues.value}
            multiline={multiline}
            validation={validation}
            returnKeyType="done"
            secureTextEntry={password}
            onChangeText={onChangeValue('value')}
            {...inputProps}
          />
          <View row>
            <View flex={1}>
              <Button
                mt={3}
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                disabled={isButtonDisabled}
                onPress={handleSubmit}
              >
                {buttonTextValue}
              </Button>
            </View>
          </View>
        </InputWrapper>
      </View>
    </Modal>
  );
};

export default InputModal;
