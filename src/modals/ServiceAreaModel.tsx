import React, { useState } from 'react';

import FormField from '@src/components/FormField';
import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';

import { validateServiceArea } from '@src/utlities/validations';
import { updateUser } from '@src/store/actions/UserAction';

import useStore from '@src/hooks/useStore';

type ServiceAreaModalProps = {
  closeServiceAreaModal: () => void;
};

const ServiceArea = (
  { closeServiceAreaModal }: ServiceAreaModalProps,
) => {
  const { store: { user }, dispatch } = useStore();

  const [serviceArea, setServiceArea] = useState(user.serviceArea ? user.serviceArea : '');
  const [isServiceAreaValid, setIsServiceAreaValid] = useState(true);


  const isButtonDisabled = serviceArea === '' || !isServiceAreaValid;
  const buttonText = user.serviceArea ? 'Update' : 'Add';

  const handleButtonPress = () => {
    if (validateServiceArea(serviceArea)) {
      // api call
      dispatch(updateUser({ serviceArea }));
      closeServiceAreaModal();
    } else { setIsServiceAreaValid(false); }
  };

  return (
    <View alignCenter spacing={{ mx: 3 }}>
      <FormField
        spacing={{ mt: 6 }}
        placeholder="service area"
        value={serviceArea}
        returnKeyType="done"
        keyboardType="number-pad"
        onChangeText={(text) => {
          setServiceArea(text);
          setIsServiceAreaValid(true);
        }}
      />
      {!isServiceAreaValid
        && (
        <Text spacing={{ mt: 1 }} variant="errorSmall">
          Please enter a valid service area
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

ServiceArea.navigationOptions = {
  header: null,
};

export default ServiceArea;
