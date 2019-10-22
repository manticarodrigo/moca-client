import React, { useState, useRef } from 'react';


import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

type Props = {
  closeInputModal: () => void;
  isModalVisible: boolean;
  sumbitEditPassword: (password: string) => void;
};

const ChangePasswordModal = ({
  closeInputModal,
  isModalVisible,
  sumbitEditPassword,
}: Props) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const passwordField = useRef(null);
  const newPasswordField = useRef(null);

  const isButtonDisabled = !((password && newPassword) !== '');


  const handleButtonPress = () => {
    sumbitEditPassword(newPassword);
  };

  return (
    <Modal
      avoidKeyboard
      propagateSwipe
      isVisible={isModalVisible}
      onToggle={closeInputModal}
    >

      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} spacing={{ py: 4 }} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Edit Password
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 4, mx: 5 }}>
          <FormField
            icon="password"
            placeholder="Current password"
            value={password}
            secureTextEntry
            returnKeyType="next"
            ref={passwordField}
            onChangeText={setPassword}
            onSubmitEditing={() => newPasswordField.current.focus()}
          />
          <FormField
            icon="password"
            placeholder="New password"
            value={newPassword}
            secureTextEntry
            returnKeyType="done"
            ref={newPasswordField}
            onChangeText={setNewPassword}
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
    </Modal>

  );
};

export default ChangePasswordModal;
