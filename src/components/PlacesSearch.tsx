import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import useStore from '@src/hooks/useStore';
import { AddAddressForm } from '@src/store/actions/UserAction';

import { Colors, Spacing, Texts, Views, Typography } from '@src/styles';
import { SearchIcon } from './icons';
import View from './View';

const regularText = Typography.getStyles(Texts.regular);

const styles = {
  container: {
    ...Views.rounded,
    backgroundColor: Colors.lightGrey,
  },
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
    ...regularText,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: 60,
  },
  description: {
    ...regularText,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.secondaryLighter,
  },
};

type Props = {
  onChangeText?: (text: string) => void;
  onSelect: (values: Partial<AddAddressForm>) => void;
}

const PlacesSearch = ({ onChangeText, onSelect }: Props) => {
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

  const getDefaultValue = () => {
    const { street, city, state, zipCode } = store.registration.address;

    if (!Object.keys(store.registration.address).length) {
      return '';
    }

    return `${street}, ${city}, ${state}, ${zipCode}`;
  };

  return (
    <GooglePlacesAutocomplete
      autoFocus
      fetchDetails
      // currentLocation
      // predefinedPlacesAlwaysVisible
      styles={styles}
      enablePoweredByContainer={false}
      listViewDisplayed={false} // hide list on select place
      minLength={2} // minimum length of text to search
      getDefaultValue={getDefaultValue}
      placeholderTextColor={Colors.semiGrey}
      placeholder="Search"
      returnKeyType="search"
      query={{
        key: 'AIzaSyDqB3-LiPTYFBFGXj0VIwvJhGMAwqlPxp4',
        language: 'en', // language of the results
        types: 'address', // default: 'geocode'
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      currentLocationLabel="Current location"
      debounce={200}
      renderLeftButton={() => <View justifyCenter spacing={{ px: 3 }}><SearchIcon /></View>}
      textInputProps={{
        onChangeText,
        autoCorrect: false,
      }}
      onPress={onPressPlace}
    />
  );
};

export default PlacesSearch;
