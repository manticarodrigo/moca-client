import React from 'react';

import { updateUser } from '@src/store/actions/UserAction';

import { User } from '@src/services/openapi';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';


type Props = {
  visible: boolean;
  onClose: () => void;
};

const EditInformationModal = ({ visible, onClose }: Props) => {
  const { store, dispatch } = useStore();

  const {
    formFields,
    setFieldRef,
    isEveryFieldEmpty,
    isFormValid,
    onChangeField,
    onFocusNext,
  } = useFormFields<User>(store.user);

  const isButtonDisabled = isEveryFieldEmpty || !isFormValid;

  const onPressSubmit = async () => {
    if (isFormValid) {
      const { email, firstName, lastName } = formFields;

      const updated = {
        ...(firstName !== store.user.firstName ? { firstName } : null),
        ...(lastName !== store.user.lastName ? { lastName } : null),
        ...(email !== store.user.email ? { email } : null),
      };

      try {
        await dispatch(updateUser(updated));

        onClose();
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <Modal
      propagateSwipe
      avoidKeyboard
      marginTop={50}
      isVisible={visible}
      onToggle={onClose}
    >

      <View alignCenter>
        <View row>
          <View variant="borderBottom" flex={1} height={70} alignCenter justifyCenter>
            <Text variant="titleSmall">
              Edit Information
            </Text>
          </View>
        </View>
        <View alignCenter spacing={{ mt: 4, mx: 5 }}>
          <FormField
            placeholder="First name"
            value={formFields.firstName}
            returnKeyType="next"
            onChangeText={onChangeField('firstName')}
            onSubmitEditing={onFocusNext('lastName')}
          />
          <FormField
            ref={setFieldRef('lastName')}
            placeholder="Last name"
            value={formFields.lastName}
            returnKeyType="next"
            onChangeText={onChangeField('lastName')}
            onSubmitEditing={onFocusNext('email')}
          />
          <FormField
            ref={setFieldRef('email')}
            icon="email"
            placeholder="Email address"
            value={formFields.email}
            validation="email"
            returnKeyType="done"
            keyboardType="email-address"
            onChangeText={onChangeField('email')}
          />
          <View row spacing={{ mt: 5 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                onPress={onPressSubmit}
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

export default EditInformationModal;
