import React, { useMemo } from 'react';
import { TextInputProps } from 'react-native';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useFormFields from '@src/hooks/useFormFields';

import FormField, { Props as FormFieldProps } from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';


export type Props = TextInputProps & {
  visible: boolean;
  password?: boolean;
  title: string;
  placeholder: string;
  existingValue: string;
  validation?: FormFieldProps['validation'];
  buttonText?: string;
  buttonActionText?: boolean;
  onSubmit?: (value: string, key?: string) => void;
  onClose: () => void;
};

const InputModal = (
  {
    visible = false,
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
    formFields,
    isAnyFieldEmpty,
    isFormValid,
    onChangeField,
  } = useFormFields<{ value: string }>({ value: existingValue || '' });

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;

  const buttonTextValue = useMemo(() => {
    if (buttonText && buttonActionText) {
      return `${(existingValue && 'Update ') || 'Add '}${buttonText}`;
    }

    return buttonText;
  }, [existingValue, buttonText, buttonActionText]);


  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formFields.value);
    }
  };

  return (
    <Modal
      avoidKeyboard
      isVisible={visible}
      onToggle={onClose}
    >
      <View alignCenter>
        <View
          variant="borderBottom"
          width={WINDOW_WIDTH}
          alignCenter
          justifyCenter
          spacing={{ py: 4 }}
        >
          <Text variant="titleSmall">{title || ''}</Text>
        </View>
        <View alignCenter spacing={{ p: 4 }}>
          <FormField
            value={formFields.value}
            validation={validation}
            returnKeyType="done"
            secureTextEntry={password}
            onChangeText={onChangeField('value')}
            {...inputProps}
          />
          <View row>
            <View flex={1}>
              <Button
                spacing={{ mt: 3 }}
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleSubmit}
                disabled={isButtonDisabled}
              >
                {buttonTextValue}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
