import React, { useState, useRef } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { validateEmailAddress } from '@src/utlities/validations';

import InputModal from '@src/modals/InputModal';

import { EmailIcon, ChangePasswordIcon } from '@src/components/icons';


type LoginModalProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  sumbitLogin: () => void;
  onModalHide: () => void;
};

const LoginModal = ({
  closeInputModal,
  isModalVisible,
  sumbitLogin,
  onModalHide,
}: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordModal, setIsPasswordModal] = useState(false);


  const emailField = useRef(null);
  const passwordField = useRef(null);
  const isButtonDisabled = !((email && password) !== '') || !isEmailValid;

  const handleButtonPress = () => {
    if (validateEmailAddress(email)) {
      sumbitLogin();
    } else {
      setIsEmailValid(false);
    }
  };


  const sumbitForgotPassword = (value: string) => {
    // api
    setIsPasswordModal(false);
  };

  const passwordModal = (
    <InputModal
      closeInputModal={() => setIsPasswordModal(false)}
      title="Recover Password"
      formFieldValue=""
      placeHolder="Email"
      validate={validateEmailAddress}
      isModalVisible={isPasswordModal}
      errorText="Please enter a valid Email"
      onSubmit={(value) => sumbitForgotPassword(value)}
      buttonTextValue="Continue"
    />
  );

  return (
    <ModalView
      propagateSwipe
      height={100}
      isVisible={isModalVisible}
      onBackdropPress={() => closeInputModal()}
      onSwipeComplete={() => closeInputModal()}
      handleArrowClick={() => closeInputModal()}
      onModalHide={onModalHide}
    >

      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={70} alignCenter justifyCenter>
            <Text variant="titleSmall">
                    Welcome Back
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
            ref={emailField}
            onSubmitEditing={() => passwordField.current.focus()}
            icon={EmailIcon}
          />
          {!isEmailValid
            && (
              <Text variant="errorSmall" spacing={{ mt: 1 }}>
                Please enter a valid Email address
              </Text>
            )}
          <FormField
            placeholder="password"
            value={password}
            secureTextEntry
            returnKeyType="done"
            ref={passwordField}
            onChangeText={(text) => setPasswrod(text)}
            icon={ChangePasswordIcon}
          />
          <View row spacing={{ mt: 3 }}>
            <View flex={1} alignEnd>
              <Text
                variant="link"
                spacing={{ ml: 1 }}
                onPress={() => setIsPasswordModal(true)}
              >
                Forgot Password ?
              </Text>
            </View>
          </View>
          <View row spacing={{ mt: 5 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={handleButtonPress}
                disabled={isButtonDisabled}
              >
                Login
              </Button>
            </View>
          </View>
          {passwordModal}
        </View>
      </View>
    </ModalView>

  );
};

export default LoginModal;
