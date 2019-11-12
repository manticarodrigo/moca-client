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

type FormFields = Pick<User, 'firstName' | 'lastName' | 'email'>;

const EditInformationModal = ({ visible, onClose }: Props) => {
  const { store, dispatch } = useStore();

  const {
    fieldValues,
    fieldProps,
    setFieldErrors,
    isEveryFieldEmpty,
    isFormValid,
  } = useFormFields<FormFields>({
    firstName: store.user.firstName,
    lastName: store.user.lastName,
    email: store.user.email,
  });

  const isButtonDisabled = isEveryFieldEmpty || !isFormValid;

  const onPressSubmit = async () => {
    if (isFormValid) {
      const { email, firstName, lastName } = fieldValues;

      const updated = {
        ...(firstName !== store.user.firstName ? { firstName } : null),
        ...(lastName !== store.user.lastName ? { lastName } : null),
        ...(email !== store.user.email ? { email } : null),
      };

      try {
        await dispatch(updateUser(updated));

        onClose();
      } catch ({ response }) {
        const { user } = response.data;

        const errors: Partial<FormFields> = {};
        if (Array.isArray(user.email) && user.email.length) {
          const [emailError] = user.email;
          errors.email = emailError;
        }

        setFieldErrors(errors);
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
            <Text variant="semiBoldLarge">
              Edit Information
            </Text>
          </View>
        </View>
        <View alignCenter mt={4} mx={5}>
          <FormField
            {...fieldProps.firstName}
            required
            placeholder="First name"
            returnKeyType="next"
          />
          <FormField
            {...fieldProps.lastName}
            required
            placeholder="Last name"
            returnKeyType="next"
          />
          <FormField
            {...fieldProps.email}
            required
            icon="email"
            placeholder="Email address"
            validation="email"
            returnKeyType="done"
            keyboardType="email-address"
          />
          <View row mt={5}>
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
