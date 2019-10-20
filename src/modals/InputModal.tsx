import React, { useState, useEffect, useMemo } from 'react';
import { TextInputProps, Dimensions } from 'react-native';

import FormField from '@src/components/FormField';
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
  buttonText?: string;
  buttonActionText?: boolean;
  error?: string;
  validate?: (value: string) => boolean;
  onSubmit?: (value: string, key?: string) => void;
  onClose: () => void;
};

const windowWidth = Dimensions.get('window').width;

const InputModal = (
  {
    visible = false,
    title,
    validate,
    existingValue,
    buttonText,
    buttonActionText,
    password,
    error,
    onSubmit,
    onClose,
    ...inputProps
  }: Props,
) => {
  const [formField, setFormField] = useState('');
  const [isValid, setIsValid] = useState(true);

  const isButtonDisabled = formField === '' || !isValid;

  const buttonTextValue = useMemo(() => {
    if (buttonActionText) {
      return `${(existingValue && 'Update ') || 'Add '}${buttonText}`;
    }

    return buttonText;
  }, [existingValue, buttonText, buttonActionText]);

  useEffect(() => {
    setFormField(existingValue);
  }, [existingValue]);


  const handleSubmit = () => {
    if (validate && !validate(formField)) {
      return setIsValid(false);
    }

    return onSubmit(formField);
  };

  const onChangeText = (value: string) => {
    setFormField(value);
    setIsValid(true);
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
          width={windowWidth}
          alignCenter
          justifyCenter
          spacing={{ py: 4 }}
        >
          <Text variant="titleSmall">
            {title}
          </Text>
        </View>
        <View alignCenter spacing={{ p: 4 }}>
          <FormField
            error={!isValid}
            value={formField}
            returnKeyType="done"
            secureTextEntry={password}
            onChangeText={onChangeText}
            {...inputProps}
          />
          {!isValid && <Text spacing={{ mt: 1 }} variant="errorSmall">{error}</Text>}
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
