import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';


import { updateUser } from '@src/store/actions/UserAction';

import { validateYearsOfExperience } from '@src/utlities/validations';

import useStore from '@src/hooks/useStore';

type ExperienceModalProps = {
  closeExperienceModal: () => void;
};

const ExperienceModal = (
  { closeExperienceModal }: ExperienceModalProps,
) => {
  const { store: { user }, dispatch } = useStore();

  const [experience, setExperience] = useState(user.yearsOfExperience
    ? user.yearsOfExperience : '');
  const [isExperienceValid, setIsExperienceValid] = useState(true);

  const isButtonDisabled = experience === '' || !isExperienceValid;
  const buttonText = user.yearsOfExperience ? 'Update' : 'Add';

  const handleButtonPress = () => {
    if (validateYearsOfExperience(experience)) {
      dispatch(updateUser({ yearsOfExperience: experience }));
      closeExperienceModal();
    } else { setIsExperienceValid(false); }
  };

  return (
    <View alignCenter spacing={{ mx: 3 }}>
      <FormField
        spacing={{ mt: 6 }}
        placeholder="years of experience"
        value={experience}
        keyboardType="number-pad"
        maxLength={2}
        returnKeyType="done"
        onChangeText={(text) => {
          setExperience(text);
          setIsExperienceValid(true);
        }}
      />
      {!isExperienceValid
        && (
        <Text spacing={{ mt: 1 }} variant="errorSmall">
          Please enter a valid number
        </Text>
        )}
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

ExperienceModal.navigationOptions = {
  header: null,
};

export default ExperienceModal;
