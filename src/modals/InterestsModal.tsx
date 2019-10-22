import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';

import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

type InterestsModalProps = {
  closeInterestsModal: () => void;
};

const InterestsModal = (
  { closeInterestsModal }: InterestsModalProps,
) => {
  const { store: { user }, dispatch } = useStore();

  const [interests, setInterests] = useState(user.interests ? user.interests : '');


  const isButtonDisabled = interests === '';
  const buttonText = user.interests ? 'Update' : 'Add';

  const handleButtonPress = () => {
    dispatch(updateUser({ interests }));
    closeInterestsModal();
  };

  return (
    <View alignCenter spacing={{ mx: 3 }}>
      <FormField
        spacing={{ mt: 6 }}
        placeholder="interests"
        value={interests}
        returnKeyType="done"
        onChangeText={(text) => {
          setInterests(text);
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

InterestsModal.navigationOptions = {
  header: null,
};

export default InterestsModal;
