import React, { useEffect, useState } from 'react';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { AddAddressForm } from '@src/store/actions/UserAction';

import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import View from '@src/components/View';
import Text from '@src/components/Text';
import PlacesSearch from '@src/components/PlacesSearch';
import FormField from '@src/components/FormField';
import Checkbox from '@src/components/Checkbox';
import Button from '@src/components/Button';


type Props = {
  existingFields?: Partial<AddAddressForm>;
  isRegistering?: boolean;
  submitText: string;
  onSubmit: (address: AddAddressForm) => void;
}

type Parsed = {
  primary?: boolean;
  coordinates?: [number, number];
  strings: Partial<Omit<AddAddressForm, 'primary' | 'coordinates'>>;
}

const parseStringValues = (fields: Partial<AddAddressForm>): Parsed => {
  const { primary, coordinates, ...strings } = fields;

  return { primary, coordinates, strings };
};

const AddressForm = ({ existingFields, isRegistering, submitText, onSubmit }: Props) => {
  const { store } = useStore();
  const [primary, setPrimary] = useState(!!isRegistering);
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

  const isRegisteringTherapist = store.registration.type === 'PT';

  const {
    fieldValues,
    fieldProps,
    updateFieldValues,
    isFormValid,
    isEveryFieldEmpty,
  } = useFormFields<Omit<AddAddressForm, 'primary' | 'coordinates'>>(
    {
      name: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
    },
    {
      name: { required: true },
      street: { required: true },
      city: { required: true },
      state: { required: true },
      zipCode: { required: true, validation: 'zip' },
    },
  );

  const updateFields = (fields: Partial<AddAddressForm>) => {
    const parsed = parseStringValues(fields);
    updateFieldValues(parsed.strings);
    setCoordinates(parsed.coordinates);

    if (parsed.primary) {
      setPrimary(parsed.primary);
    }
  };

  const handleSubmit = () => {
    // TODO: validate reverse geocode
    if (isFormValid) {
      onSubmit({ ...fieldValues, primary, coordinates });
    }
  };

  useEffect(() => {
    if (existingFields) {
      updateFields(existingFields);
    }
  }, [existingFields]);

  return (
    <View safeArea alignCenter pt={3}>
      <KeyboardAwareScrollView contentContainerStyle={{ width: WINDOW_WIDTH }}>
        <View alignCenter mx={3}>
          <View alignCenter py={4}>
            <View row>
              <Text variant="title" mt={3}>
                {isRegistering ? 'Thanks for signing up, ' : 'Hello, '}
              </Text>
              <Text variant="title" mt={3}>
                {store.user.firstName}
              </Text>
            </View>
            <Text variant="regular" align="center" mt={1}>
              {isRegistering && (
                (isRegisteringTherapist && 'Please enter your address of operation below.')
                || 'What is your preferred address for treatment?'
              )}
              {!isRegistering && 'You can edit and add additional addresses for treatment.'}
            </Text>
          </View>
          <PlacesSearch onSelect={updateFields} />
          <View alignCenter mt={4} mb={3}>
            <FormField
              {...fieldProps.name}
              placeholder="Name"
              returnKeyType="next"
            />
            <FormField
              {...fieldProps.street}
              placeholder="Street"
              returnKeyType="next"
            />
            <FormField
              {...fieldProps.apartment}
              placeholder="Apartment Number"
              returnKeyType="next"
            />
            <FormField
              {...fieldProps.city}
              placeholder="City"
              returnKeyType="done"
            />
            <FormField
              {...fieldProps.state}
              placeholder="State"
              maxLength={2}
            />
            <FormField
              {...fieldProps.zipCode}
              placeholder="Zip Code"
              maxLength={5}
              selectTextOnFocus={false}
            />
          </View>
          {!isRegistering && (
            <View row py={4} variant="borderTop">
              <View flex={1} row justifyEnd alignCenter>
                <Text variant="regularDark" pr={2}>Set active?</Text>
                <Checkbox
                  checked={primary}
                  onChange={setPrimary}
                />
              </View>
            </View>
          )}
          <View row py={4}>
            <View flex={1}>
              <Button
                variant={!isFormValid || isEveryFieldEmpty ? 'primaryDisabled' : 'primary'}
                disabled={!isFormValid || isEveryFieldEmpty}
                onPress={handleSubmit}
              >
                {submitText}
              </Button>
            </View>
          </View>
          <View flex={1} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddressForm;
