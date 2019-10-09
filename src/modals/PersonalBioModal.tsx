import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';

import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

type PersonalBioModalProps = {
  closePersonalBioModal: () => void;
};

const PersonalBioModal = (
  { closePersonalBioModal }: PersonalBioModalProps,
) => {
  const { store: { user }, dispatch } = useStore();
  const [personalBio, setPersonalBio] = useState(user.personalBio ? user.personalBio : '');

  const isButtonDisabled = personalBio === '';
  const buttonText = user.personalBio ? 'Update' : 'Add';

  const handleButtonPress = () => {
    dispatch(updateUser({ personalBio }));
    closePersonalBioModal();
  };

  return (
    <View alignCenter spacing={{ mx: 3 }}>
      <FormField
        spacing={{ mt: 6 }}
        placeholder="Personal bio"
        value={personalBio}
        returnKeyType="done"
        onChangeText={(text) => {
          setPersonalBio(text);
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

PersonalBioModal.navigationOptions = {
  header: null,
};

export default PersonalBioModal;
