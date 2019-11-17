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

import Toast from '@src/components/Toast';


type Props = {
  visible: boolean;
  onClose: () => void;
};

const LoginModal = ({ visible, onClose }: Props) => {
  const { dispatch } = useStore();
  const [error, setError] = useState('');

  const {
    fieldValues,
    fieldProps,
    isAnyFieldEmpty,
    isFormValid,
  } = useFormFields<Pick<User, 'email' | 'password'>>(
    {
      email: '',
      password: '',
    },
    {
      email: { required: true, validation: 'email' },
      password: { required: true, validation: 'password' },
    },
  );

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;

  const onPressSubmit = async () => {
    if (isFormValid) {
      try {
        await dispatch(loginUser(fieldValues.email, fieldValues.password));
      } catch ({ response }) {
        const { nonFieldErrors } = response.data;

        if (nonFieldErrors && nonFieldErrors.length) {
          setError(nonFieldErrors[0]);
        }
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
          <View row bgColor="white">
            <View variant="borderBottom" flex={1} py={4} alignCenter justifyCenter>
              <Text variant="semiBoldLarge">
                Welcome Back
              </Text>
            </View>
          </View>
          <View alignCenter mt={4} mx={5}>
            <FormField
              {...fieldProps.email}
              icon="email"
              placeholder="Email address"
              returnKeyType="next"
              keyboardType="email-address"
            />
            <FormField
              {...fieldProps.password}
              icon="password"
              secureTextEntry
              placeholder="Password"
              returnKeyType="done"
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
        {!!error && (
          <Toast error onClose={() => setError('')}>
            {error}
          </Toast>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
