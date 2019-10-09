import React, { useState, useEffect } from 'react';
import useStore from '@src/hooks/useStore';
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

import AddLocationBigIcon from '@src/components/icons/AddLocationBigIcon';
import FormField from '@src/components/FormField';

import { validateZipCode } from '@src/utlities/validations';

type ZipCodeModalProps = {
  navigateToScreen: (name: string) => void;
};

const ZipCodeModal = ({ navigateToScreen }: ZipCodeModalProps) => {
  const { store: { registrationState: { addresses } }, dispatch } = useStore();
  const [zipCode, setZipCode] = useState('');
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);

  const isButtonDisabled = zipCode === '' || !isZipCodeValid;

  useEffect(() => {
    if (addresses.length !== 0) {
      setZipCode(addresses[0].zipCode);

      if (!validateZipCode(addresses[0].zipCode)) {
        setIsZipCodeValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocation = () => true; // api call to check zipCode availability

  const handleButtonPress = () => {
    const newAddresses = [];
    newAddresses.push({ zipCode });

    dispatch(updateUserInfomation({ addresses: newAddresses }));

    if (validateZipCode(zipCode)) {
      setIsZipCodeValid(true);
      if (getLocation()) {
        navigateToScreen('RegistrationScreen');
      } else {
        navigateToScreen('InvalidZipCodeScreen');
      }
    } else setIsZipCodeValid(false);
  };

  return (

    <View
      spacing={{ mt: 5, mx: 3 }}
      alignCenter
    >
      <View alignCenter>
        <AddLocationBigIcon />
        <Text variant="title" spacing={{ mt: 4 }}>Where are you located?</Text>
        <Text variant="regular" spacing={{ mt: 2 }}>
          {"Enter your zip code to check MOCA's"}
        </Text>
        <Text variant="regular">
          availability in your area
        </Text>
      </View>
      <View alignCenter spacing={{ mt: 4, mb: 4 }}>
        <FormField
          error={!isZipCodeValid}
          placeholder="Zip code"
          value={zipCode}
          returnKeyType="done"
          keyboardType="number-pad"
          maxLength={5}
          onChangeText={(text) => {
            setZipCode(text);
            setIsZipCodeValid(true);
          }}
        />
        {!isZipCodeValid
          && (
            <Text spacing={{ mt: 1 }} variant="errorSmall">
              Please enter a valid Zip code
            </Text>
          )}
      </View>
      <View row>
        <View flex={1}>
          <Button
            disabled={isButtonDisabled}
            variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
            onPress={handleButtonPress}
          >
          Continue
          </Button>
        </View>
      </View>
    </View>
  );
};

ZipCodeModal.navigationOptions = {
  header: null,
};
export default ZipCodeModal;