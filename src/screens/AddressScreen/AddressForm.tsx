import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useStore from '@src/hooks/useStore';
import useFormFields from '@src/hooks/useFormFields';

import { AddAddressForm } from '@src/store/actions/UserAction';

import View from '@src/components/View';
import Button from '@src/components/Button';
import Text from '@src/components/Text';
import PlacesSearch from '@src/components/PlacesSearch';
import FormField from '@src/components/FormField';

import { Checkbox } from '@src/components/Checkbox';

type Props = {
  existingFields?: Partial<AddAddressForm>;
  isRegistering?: boolean;
  submitText: string;
  onSubmit: (address: AddAddressForm) => void;
}

const AddressForm = ({ existingFields, isRegistering, submitText, onSubmit }: Props) => {
  const { store } = useStore();

  const {
    formFields,
    isAnyFieldEmpty,
    isFormValid,
    setFieldRef,
    updateFormFields,
    onChangeField,
    onFocusNext,
  } = useFormFields<AddAddressForm>(existingFields || {
    name: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    primary: isRegistering,
    coordinates: [0, 0],
  });

  const isButtonDisabled = isAnyFieldEmpty || !isFormValid;

  const handleSubmit = () => {
    if (isAnyFieldEmpty) {
      return;
    }

    // TODO: validate reverse geocode
    if (isFormValid) {
      onSubmit(formFields);
    } else {
      // alert invalid
    }
  };

  return (
    <View safeArea spacing={{ pt: 3 }} alignCenter>
      <KeyboardAwareScrollView>
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
          <PlacesSearch onSelect={updateFormFields} />
          <View spacing={{ mb: 3, mt: 4 }} alignCenter>
            <FormField
              placeholder="Name"
              value={formFields.name}
              returnKeyType="next"
              onChangeText={onChangeField('name')}
              onSubmitEditing={onFocusNext('street')}
            />
            <FormField
              ref={setFieldRef('street')}
              placeholder="Street"
              value={formFields.street}
              returnKeyType="next"
              onChangeText={onChangeField('street')}
              onSubmitEditing={onFocusNext('apartment')}
            />
            <FormField
              ref={setFieldRef('apartment')}
              placeholder="Apartment Number"
              value={formFields.apartment}
              returnKeyType="next"
              onChangeText={onChangeField('apartment')}
              onSubmitEditing={onFocusNext('city')}
            />
            <FormField
              ref={setFieldRef('city')}
              placeholder="City"
              value={formFields.city}
              returnKeyType="done"
              onChangeText={onChangeField('city')}
              onSubmitEditing={onFocusNext('state')}
            />
            <FormField
              ref={setFieldRef('state')}
              placeholder="State"
              value={formFields.state}
              onChangeText={onChangeField('state')}
              onSubmitEditing={onFocusNext('zipCode')}
            />
            <FormField
              ref={setFieldRef('zipCode')}
              placeholder="Zip Code"
              value={formFields.zipCode}
              validation="zip"
              maxLength={5}
              selectTextOnFocus={false}
              onChangeText={onChangeField('zipCode')}
            />
          </View>
          {!isRegistering && (
            <View variant="borderTop" row spacing={{ py: 4 }}>
              <View flex={1} row justifyEnd alignCenter>
                <Text variant="regularDark" spacing={{ pr: 2 }}>Set as primary?</Text>
                <Checkbox
                  checked={formFields.primary}
                  onChange={onChangeField('primary')}
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddressForm;
