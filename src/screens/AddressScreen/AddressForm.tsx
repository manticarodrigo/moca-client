import React, { useState, useEffect, useRef } from 'react';

import useStore from '@src/hooks/useStore';
import { AddAddressForm } from '@src/store/actions/UserAction';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import PlacesSearch from '@src/components/PlacesSearch';
import FormField from '@src/components/FormField';

import { validateZipCode } from '@src/utlities/validations';
import { Checkbox } from '@src/components/Checkbox';

type Props = {
  existingFields?: Partial<AddAddressForm>;
  isRegistering?: boolean;
  submitText: string;
  onSubmit: (address: AddAddressForm) => void;
}

const AddressForm = ({ existingFields, isRegistering, submitText, onSubmit }: Props) => {
  const { store } = useStore();

  const [formFields, setFormFields] = useState<AddAddressForm>({
    name: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    primary: isRegistering,
    coordinates: [0, 0],
  });

  useEffect(() => {
    if (existingFields) setFormFields((prevState) => ({ ...prevState, ...existingFields }));
  }, [existingFields]);

  const [isZipCodeValid, setIsZipCodeValid] = useState(true);

  const streetField = useRef(null);
  const apartmentField = useRef(null);
  const cityField = useRef(null);
  const stateField = useRef(null);
  const zipCodeField = useRef(null);


  const isAnyFieldEmpty = Object.values(formFields).includes('');
  const isButtonDisabled = isAnyFieldEmpty || !isZipCodeValid;

  const updateFormField = (key: keyof typeof formFields) => (value: string | boolean) => {
    setFormFields({ ...formFields, [key]: value });

    if (key === 'zipCode') {
      setIsZipCodeValid(true);
    }
  };

  const validateForm = () => validateZipCode(formFields.zipCode);

  const handleSubmit = () => {
    if (isAnyFieldEmpty) {
      return;
    }

    // TODO: validate reverse geocode
    if (validateForm()) {
      onSubmit(formFields);
    } else {
      // alert invalid
    }
  };

  const handleSelectPlace = (values: AddAddressForm) => setFormFields(
    (prevState) => ({ ...prevState, ...values }),
  );

  return (
    <View scroll flex={1}>
      <View safeArea spacing={{ pt: 3 }} alignCenter>
        <View spacing={{ mx: 3 }} alignCenter>
          <View spacing={{ py: 4 }} alignCenter>
            <View row>
              <Text variant="title" spacing={{ mt: 3 }}>
                {isRegistering ? 'Thanks for signing up, ' : 'Hello, '}
              </Text>
              <Text variant="title" spacing={{ mt: 3 }}>
                {store.user.firstName}
              </Text>
            </View>
            <Text variant="regular" spacing={{ mt: 1 }}>
              {isRegistering
                ? 'What is your preferred address for treatment?'
                : 'You can edit and add additional addresses for treatment.'}
            </Text>
          </View>
          <PlacesSearch onSelect={handleSelectPlace} />
          <View spacing={{ mb: 3, mt: 4 }} alignCenter>
            <FormField
              placeholder="Name"
              value={formFields.name}
              returnKeyType="next"
              onSubmitEditing={() => streetField.current.focus()}
              onChangeText={updateFormField('name')}
            />
            <FormField
              ref={streetField}
              placeholder="Street"
              value={formFields.street}
              returnKeyType="next"
              onSubmitEditing={() => apartmentField.current.focus()}
              onChangeText={updateFormField('street')}
            />
            <FormField
              ref={apartmentField}
              placeholder="Apartment Number"
              value={formFields.apartment}
              returnKeyType="next"
              onSubmitEditing={() => cityField.current.focus()}
              onChangeText={updateFormField('apartment')}
            />
            <FormField
              ref={cityField}
              placeholder="City"
              value={formFields.city}
              returnKeyType="done"
              onSubmitEditing={() => stateField.current.focus()}
              onChangeText={updateFormField('city')}
            />
            <FormField
              ref={stateField}
              placeholder="State"
              value={formFields.state}
              onSubmitEditing={() => zipCodeField.current.focus()}
              onChangeText={updateFormField('state')}
            />
            <FormField
              ref={zipCodeField}
              error={!isZipCodeValid && 'Please enter a valid Zip Code'}
              placeholder="Zip Code"
              value={formFields.zipCode}
              maxLength={5}
              selectTextOnFocus={false}
              onChangeText={updateFormField('zipCode')}
            />
          </View>
          {!isRegistering && (
            <View variant="borderTop" row spacing={{ py: 4 }}>
              <View flex={1} row justifyEnd alignCenter>
                <Text variant="regularDark" spacing={{ pr: 2 }}>Set as primary?</Text>
                <Checkbox
                  checked={formFields.primary}
                  onChange={updateFormField('primary')}
                />
              </View>
            </View>
          )}
          <View row spacing={{ py: 4 }}>
            <View flex={1}>
              <Button
                variant={isButtonDisabled ? 'primaryDisabled' : 'primary'}
                disabled={isButtonDisabled}
                onPress={handleSubmit}
              >
                {submitText}
              </Button>
            </View>
          </View>
          <View flex={1} />
        </View>
      </View>
    </View>
  );
};

export default AddressForm;