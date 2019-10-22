import React, { useState, useRef } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

import { validateEmailAddress } from '@src/utlities/validations';

import InputModal from '@src/modals/InputModal';


type Props = {
  visible: boolean;
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
};

const LoginModal = ({ visible, onLogin, onClose }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordModal, setIsPasswordModal] = useState(false);

  const emailField = useRef(null);
  const passwordField = useRef(null);
  const isButtonDisabled = !((email && password) !== '') || !isEmailValid;

  const handleButtonPress = () => {
    if (validateEmailAddress(email)) {
      onLogin(email, password);
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
      visible={isPasswordModal}
      title="Recover Password"
      placeholder="Email"
      existingValue=""
      validate={validateEmailAddress}
      error="Please enter a valid Email"
      buttonText="Continue"
      onSubmit={sumbitForgotPassword}
      onClose={() => setIsPasswordModal(false)}
    />
  );

  return (
    <Modal
      avoidKeyboard
      marginTop={50}
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
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
            icon="email"
            ref={emailField}
            placeholder="Email address"
            value={email}
            returnKeyType="next"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailValid(true);
            }}
            error={!isEmailValid}
            onSubmitEditing={() => passwordField.current.focus()}
          />
          {!isEmailValid
            && (
              <Text variant="errorSmall" spacing={{ mt: 1 }}>
                Please enter a valid Email address
              </Text>
            )}
          <FormField
            icon="password"
            secureTextEntry
            ref={passwordField}
            placeholder="Password"
            value={password}
            returnKeyType="done"
            onChangeText={(text) => setPassword(text)}
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
    </Modal>
  );
};

export default LoginModal;
