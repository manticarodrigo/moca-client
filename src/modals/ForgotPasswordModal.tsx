import React, { useState } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { validateEmailAddress } from '@src/utlities/validations';

import { EmailIcon } from '@src/components/icons';

type PasswordModalProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  submitForgotPassword: () => void;
};

const ForgotPasswordModal = ({
  closeInputModal,
  isModalVisible,
  submitForgotPassword,
}: PasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const isButtonDisabled = email === '' || !isEmailValid;

  const handleButtonPress = () => {
    if (validateEmailAddress(email)) {
      submitForgotPassword();
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <ModalView
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
              Recover Password
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 4, mx: 5 }}>
          <FormField
            placeholder="Email address"
            value={email}
            returnKeyType="next"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailValid(true);
            }}
            error={!isEmailValid}
            icon={EmailIcon}
          />
          <View row spacing={{ mt: 5 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
               Continue
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ModalView>

  );
};

export default ForgotPasswordModal;
