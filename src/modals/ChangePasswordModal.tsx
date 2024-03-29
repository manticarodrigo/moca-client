import React from 'react';

import useFormFields from '@src/hooks/useFormFields';

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
  const {
    fieldValues,
    fieldProps,
    isFormValid,
  } = useFormFields<{ currentPassword: string; newPassword: string }>(
    {
      currentPassword: '',
      newPassword: '',
    },
    {
      currentPassword: { required: true },
      newPassword: { required: true, validation: 'password' },
    },
  );

  const handleButtonPress = () => {
    sumbitEditPassword(fieldValues.newPassword);
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
          <View alignCenter justifyCenter flex={1} py={4} variant="borderBottom">
            <Text variant="semiBoldLarge">
              Edit Password
            </Text>
          </View>
        </View>
        <View alignCenter mt={4} mx={5}>
          <FormField
            {...fieldProps.currentPassword}
            icon="password"
            placeholder="Current password"
            secureTextEntry
            returnKeyType="next"
          />
          <FormField
            {...fieldProps.newPassword}
            icon="password"
            placeholder="New password"
            secureTextEntry
            returnKeyType="done"
          />
          <View row mt={5}>
            <View flex={1}>
              <Button
                variant={!isFormValid ? 'primaryDisabled' : 'primary'}
                disabled={!isFormValid}
                onPress={handleButtonPress}
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
