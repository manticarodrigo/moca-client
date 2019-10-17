import React, { useState, useRef } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { validateEmailAddress } from '@src/utlities/validations';

import { EmailIcon } from '@src/components/icons';

import useStore from '@src/hooks/useStore';


type EditInformationProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  sumbitEditInformation: (userInput: {}) => void;
};

const EditInformationModal = ({
  closeInputModal,
  isModalVisible,
  sumbitEditInformation,
}: EditInformationProps) => {
  const { store: { user } } = useStore();
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [isEmailValid, setIsEmailValid] = useState(true);


  const nameField = useRef(null);
  const lastNameField = useRef(null);
  const emailField = useRef(null);

  const isButtonDisabled = !((email && name && lastName) !== '') || !isEmailValid;


  const handleButtonPress = () => {
    if (validateEmailAddress(email)) {
      const userInput = {
        email,
        name,
        lastName,
      };
      sumbitEditInformation(userInput);
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <ModalView
      propagateSwipe
      height={100}
      isVisible={isModalVisible}
      onBackdropPress={() => closeInputModal()}
      onSwipeComplete={() => closeInputModal()}
      handleArrowClick={() => closeInputModal()}
    >

      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={70} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Edit Infromation
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 4, mx: 5 }}>
          <FormField
            placeholder="first name"
            value={name}
            returnKeyType="next"
            ref={nameField}
            onChangeText={(text) => setName(text)}
            onSubmitEditing={() => lastNameField.current.focus()}
          />
          <FormField
            placeholder="last name"
            value={lastName}
            returnKeyType="next"
            ref={lastNameField}
            onChangeText={(text) => setLastName(text)}
            onSubmitEditing={() => emailField.current.focus()}

          />
          <FormField
            placeholder="email address"
            value={email}
            ref={emailField}
            returnKeyType="done"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailValid(true);
            }}
            error={!isEmailValid}
            icon={EmailIcon}
          />
          {!isEmailValid
            && (
              <Text variant="errorSmall" spacing={{ mt: 1 }}>
                Please enter a valid Email address
              </Text>
            )}
          <View row spacing={{ mt: 5 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
                Update
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ModalView>

  );
};

export default EditInformationModal;
