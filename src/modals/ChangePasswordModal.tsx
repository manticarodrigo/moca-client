import React, { useState, useRef } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import ModalView from '@src/components/ModalView';

import { validateEmailAddress } from '@src/utlities/validations';

import { EmailIcon } from '@src/components/icons';


type ChangePasswordProps = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  sumbitEditPassword: (password: string) => void;
};

const ChangePasswordModal = ({
  closeInputModal,
  isModalVisible,
  sumbitEditPassword,
}: ChangePasswordProps) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const passwordField = useRef(null);
  const newPasswordField = useRef(null);

  const isButtonDisabled = !((password && newPassword) !== '');


  const handleButtonPress = () => {
    sumbitEditPassword(newPassword);
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
              Edit Password
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 4, mx: 5 }}>
          <FormField
            placeholder="password"
            value={password}
            secureTextEntry
            returnKeyType="next"
            ref={passwordField}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={() => newPasswordField.current.focus()}
          />
          <FormField
            placeholder="new password"
            value={newPassword}
            secureTextEntry
            returnKeyType="done"
            ref={newPasswordField}
            onChangeText={(text) => setNewPassword(text)}
          />
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

export default ChangePasswordModal;
