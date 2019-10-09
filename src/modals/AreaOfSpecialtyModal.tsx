import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';

import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

type AreaOfSpecialtyModalProps = {
  closeAreaOfSpecialtyModal: () => void;
};

const AreaOfSpecialtyModal = (
  { closeAreaOfSpecialtyModal }: AreaOfSpecialtyModalProps,
) => {
  const { store: { user }, dispatch } = useStore();

  const [areaOfSpecialty, setAreaOfSpecialty] = useState(user.areaOfSpecialty
    ? user.areaOfSpecialty : '');

  const isButtonDisabled = areaOfSpecialty === '';
  const buttonText = user.yearsOfExperience ? 'Update' : 'Add';

  const handleButtonPress = () => {
    dispatch(updateUser({ areaOfSpecialty }));
    closeAreaOfSpecialtyModal();
  };

  return (
    <View alignCenter spacing={{ mx: 3 }}>
      <FormField
        spacing={{ mt: 6 }}
        placeholder="area of specialty"
        value={areaOfSpecialty}
        returnKeyType="done"
        onChangeText={(text) => {
          setAreaOfSpecialty(text);
        }}
      />
      <View row>
        <View flex={1}>
          <Button
            spacing={{ mt: 3 }}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={handleButtonPress}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </Button>
        </View>
      </View>
    </View>
  );
};

AreaOfSpecialtyModal.navigationOptions = {
  header: null,
};

export default AreaOfSpecialtyModal;
