import React, { useState, useEffect } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { updateRegistration } from '@src/store/actions/RegistrationAction';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Button from '@src/components/Button';
import ModalView from '@src/components/ModalView';

import { getLocation } from '@src/utlities/location';

import AddLocationBigIcon from '@src/components/icons/AddLocationBigIcon';
import FormField from '@src/components/FormField';

import { validateZipCode } from '@src/utlities/validations';

type Props = {
  isVisible: boolean;
  navigation: NavigationStackProp;
  onClose: () => void;
};

const ZipCodeModal = ({ isVisible, navigation, onClose }: Props) => {
  const { store, dispatch } = useStore();
  const [zipCode, setZipCode] = useState('');
  const [isZipCodeValid, setIsZipCodeValid] = useState(true);
  const [screenName, setScreenName] = useState();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const isButtonDisabled = zipCode === '' || !isZipCodeValid;

  useEffect(() => {
    const onMount = async () => {
      const location = await getLocation(() => {
        // if no location,
        // pop back to onboarding
        navigation.popToTop();
      });

      if (location) {
        const { latitude, longitude } = location.coords;
        const partialAddress = {
          location: {
            type: 'Point',
            coordinates: [latitude, longitude] as [number, number],
          },
        };
        dispatch(updateRegistration({ address: partialAddress }));
      }

      if (store.registration.address) {
        setZipCode(store.registration.address.zipCode);

        if (!validateZipCode(store.registration.address.zipCode)) {
          setIsZipCodeValid(false);
        }
      }
    };
    onMount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToScreen = (name: string) => {
    onClose();
    setScreenName(name);
    setShouldNavigate(true);
  };

  const getAvailability = () => true; // api call to check zipCode availability

  const handleButtonPress = () => {
    dispatch(updateRegistration({ address: { zipCode } }));

    if (validateZipCode(zipCode)) {
      setIsZipCodeValid(true);
      if (getAvailability()) {
        navigateToScreen('RegistrationScreen');
      } else {
        navigateToScreen('InvalidZipCodeScreen');
      }
    } else setIsZipCodeValid(false);
  };

  return (
    <ModalView
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      handleArrowClick={onClose}
      onModalHide={() => {
        if (shouldNavigate) {
          navigation.push(screenName);
          setShouldNavigate(false);
        }
      }}
    >
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
    </ModalView>
  );
};

ZipCodeModal.navigationOptions = {
  header: null,
};
export default ZipCodeModal;
