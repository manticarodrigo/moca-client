import React, { useState } from 'react';

import { User } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { loginUser } from '@src/store/actions/UserAction';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import FormField from '@src/components/FormField';
import Button from '@src/components/Button';

import InputModal from '@src/modals/InputModal';


type Props = {
  visible: boolean;
  onClose: () => void;
};

const LoginModal = ({ visible, onClose }: Props) => {
  const { dispatch } = useStore();

  const {
    formFields,
    setFieldRef,
    isAnyFieldEmpty,
    isFormValid,
    onChangeField,
    onFocusNext,
  } = useFormFields<Pick<User, 'email' | 'password'>>({
    email: '',
    password: '',
  });

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;

  const onPressSubmit = async () => {
    if (isFormValid) {
      try {
        await dispatch(loginUser(formFields.email, formFields.password));
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const toggleForgotPasswordModal = () => setPasswordModalVisible(!passwordModalVisible);

  const sumbitForgotPassword = (value: string) => {
    // api
    toggleForgotPasswordModal();
  };

  return (
    <>
      <InputModal
        visible={passwordModalVisible}
        title="Recover Password"
        placeholder="Email"
        existingValue=""
        validation="email"
        buttonText="Continue"
        onSubmit={sumbitForgotPassword}
        onClose={toggleForgotPasswordModal}
      />
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
              <Text variant="semiBoldLarge">
                Welcome Back
              </Text>
            </View>
          </View>
          <View alignCenter mt={4} mx={5}>
            <FormField
              icon="email"
              placeholder="Email address"
              value={formFields.email}
              validation="email"
              returnKeyType="next"
              keyboardType="email-address"
              onChangeText={onChangeField('email')}
              onSubmitEditing={onFocusNext('password')}
            />
            <FormField
              ref={setFieldRef('password')}
              icon="password"
              secureTextEntry
              placeholder="Password"
              value={formFields.password}
              returnKeyType="done"
              onChangeText={onChangeField('password')}
            />
            <View row mt={3}>
              <View flex={1} alignEnd>
                <Text
                  variant="link"
                  ml={1}
                  onPress={toggleForgotPasswordModal}
                >
                  Forgot Password?
                </Text>
              </View>
            </View>
            <View row mt={5}>
              <View flex={1}>
                <Button
                  variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                  onPress={onPressSubmit}
                  disabled={isButtonDisabled}
                >
                  Login
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LoginModal;
