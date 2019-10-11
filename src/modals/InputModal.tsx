import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';


import { updateUser } from '@src/store/actions/UserAction';
import useStore from '@src/hooks/useStore';


type InputModalProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  title: string;
  placeHolder: string;
  attribute: string;
  validate?: (value: string) => boolean;
  errorText?: string;
  maxLength?: number;
  keyboardTypeNumber?: boolean;
};

const InputModal = (
  {
    title,
    closeInputModal,
    isModalVisible = false,
    validate,
    placeHolder,
    attribute,
    errorText,
    maxLength,
    keyboardTypeNumber,
  }: InputModalProps,
) => {
  const { store: { user }, dispatch } = useStore();

  const [formField, setFormField] = useState(user[attribute] ? user[attribute] : '');
  const [isValid, setIsValid] = useState(true);

  const isButtonDisabled = formField === '' || !isValid;
  const buttonText = user[attribute] ? 'Update' : 'Add';


  const handleButtonPress = () => {
    if (validate) {
      if (validate(formField)) {
        dispatch(updateUser({ [attribute]: formField }));
        closeInputModal();
      } else { setIsValid(false); }
    } else {
      dispatch(updateUser({ [attribute]: formField }));
      closeInputModal();
    }
  };

  return (
    <ModalView
      height={200}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        closeInputModal();
        setIsValid(true);
        setFormField(user[attribute] ? user[attribute] : '');
      }}
      onSwipeComplete={() => {
        closeInputModal();
        setIsValid(true);
        setFormField(user[attribute] ? user[attribute] : '');
      }}
      handleArrowClick={() => {
        closeInputModal();
        setIsValid(true);
        setFormField(user[attribute] ? user[attribute] : '');
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
            placeholder={placeHolder}
            value={formField}
            keyboardType={keyboardTypeNumber ? 'number-pad' : 'default'}
            maxLength={maxLength || 200}
            returnKeyType="done"
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
                {buttonText}
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
