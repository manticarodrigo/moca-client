import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import useStore from '@src/hooks/useStore';
import { AddAddressForm } from '@src/store/actions/UserAction';

import { Colors, Spacing, Texts } from '@src/styles';

const styles = {
  textInputContainer: {
    ...Spacing.getStyles({ p: 0, m: 0 }),
    flexDirection: 'row',
    borderRadius: Spacing.spaceSize[2],
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
  },
  textInput: {
    ...Texts.regular,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: Spacing.spaceSize[2],
    borderWidth: 2,
    borderColor: Colors.secondaryLight,
    backgroundColor: Colors.lightGrey,
    width: '100%',
    height: 60,
  },
  description: {
    ...Texts.regular,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.secondaryLighter,
  },
};

const PlacesSearch = ({ onSelect }: { onSelect: (values: Partial<AddAddressForm>) => void }) => {
  const { store } = useStore();

  const onPressPlace = (_, details = null) => { // 'details' is provided when fetchDetails = true
    const components = details.address_components;
    const { lat, lng } = details.geometry.location;
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    const formObject = components.reduce((acc, val) => {
      const addressType = val.types[0];
      switch (addressType) {
        case 'street_number':
          acc.street += `${val.long_name || val.short_name} `;
          return acc;
        case 'route':
          acc.street += val.long_name || val.short_name;
          return acc;
        case 'locality':
          acc.city = val.long_name || val.short_name;
          return acc;
        case 'administrative_area_level_1':
          acc.state = val.short_name || val.long_name;
          return acc;
        case 'postal_code':
          acc.zipCode = val.long_name || val.short_name;
          return acc;
        default:
          return acc;
      }
    }, {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });

    onSelect({ ...formObject, coordinates: [lat, lng] });
  };

  const { street, city, state, zipCode } = store.registration.address;

  return (
    <GooglePlacesAutocomplete
      fetchDetails
      currentLocation
      styles={styles}
      predefinedPlacesAlwaysVisible
      getDefaultValue={() => `${street}, ${city}, ${state}, ${zipCode}`}
      placeholderTextColor={Colors.semiGrey}
      placeholder="Search"
      minLength={2} // minimum length of text to search
      returnKeyType="search"
      listViewDisplayed={false} // true/false/undefined
      query={{
        key: 'AIzaSyDqB3-LiPTYFBFGXj0VIwvJhGMAwqlPxp4',
        language: 'en', // language of the results
        types: 'address', // default: 'geocode'
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      currentLocationLabel="Current location"
      debounce={200}
      onPress={onPressPlace}
    />
  );
};

export default PlacesSearch;
