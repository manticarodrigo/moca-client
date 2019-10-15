import React, { useState } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';


type InputModalProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  title: string;
  placeHolder: string;
  formFieldValue: string;
  validate?: (value: string) => boolean;
  onSubmit?: (value: string) => void;
  errorText?: string;
  maxLength?: number;
  keyboardTypeNumber?: boolean;
  buttonTextValue?: string;
  password?: boolean;
};

const InputModal = (
  {
    title,
    closeInputModal,
    onSubmit,
    isModalVisible = false,
    validate,
    placeHolder,
    formFieldValue,
    errorText,
    maxLength,
    keyboardTypeNumber,
    buttonTextValue,
    password,
  }: InputModalProps,
) => {
  const [formField, setFormField] = useState(formFieldValue);
  const [isValid, setIsValid] = useState(true);

  const isButtonDisabled = formField === '' || !isValid;
  const buttonText = formFieldValue !== '' ? 'Update' : 'Add';


  const handleButtonPress = () => {
    if (validate) {
      if (validate(formField)) {
        onSubmit(formField);
      } else { setIsValid(false); }
    } else {
      onSubmit(formField);
      closeInputModal();
    }
  };

  return (
    <ModalView
      height={100}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        closeInputModal();
        setIsValid(true);
        setFormField(formFieldValue);
      }}
      onSwipeComplete={() => {
        closeInputModal();
        setIsValid(true);
        setFormField(formFieldValue);
      }}
      handleArrowClick={() => {
        closeInputModal();
        setIsValid(true);
        setFormField(formFieldValue);
      }}
    >
      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="titleSmall">
              {title}
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mx: 3 }}>
          <FormField
            spacing={{ mt: 6 }}
            error={!isValid}
            placeholder={placeHolder}
            value={formField}
            keyboardType={keyboardTypeNumber ? 'number-pad' : 'default'}
            maxLength={maxLength || 200}
            returnKeyType="done"
            secureTextEntry={password}
            onChangeText={(text) => {
              setFormField(text);
              setIsValid(true);
            }}
          />
          {!isValid
        && (
        <Text spacing={{ mt: 1 }} variant="errorSmall">
          {errorText}
        </Text>
        )}
          <View row>
            <View flex={1}>
              <Button
                spacing={{ mt: 3 }}
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
                {buttonTextValue || buttonText}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ModalView>
  );
};

InputModal.navigationOptions = {
  header: null,
};

export default InputModal;
