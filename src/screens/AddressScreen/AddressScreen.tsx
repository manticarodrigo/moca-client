import React, { useState, useEffect } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { addUserAddress, AddAddressForm } from '@src/store/actions/UserAction';

import { Views, Spacing, Colors } from '@src/styles';

import BinIconRed from '@src/components/icons/BinIconRed';

import View from '@src/components/View';
import BackButton from '@src/components/BackButton';
import HeaderTitle from '@src/components/HeaderTitle';

import AddressForm from './AddressForm';

const AddressScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [existingFields, setExistingFields] = useState<AddAddressForm>();

  const isAdditionalAddress = navigation.getParam('isAdditionalAddress', false);
  const isExistingAddress = navigation.getParam('isExistingAddress', false);
  const isRegistering = !(isExistingAddress || isAdditionalAddress);

  let buttonText = 'Continue';

  if (isExistingAddress) {
    buttonText = 'Update';
  }

  if (isAdditionalAddress) {
    buttonText = 'Add';
  }

  useEffect(() => {
    if (isRegistering) {
      const { address = {} } = store.registration;

      setExistingFields({ ...existingFields, ...address });
    }

    if (isExistingAddress) {
      const userAddress = navigation.getParam('userAddress', {});

      setExistingFields({ ...existingFields, ...userAddress });
    }
  }, []);

  const onSubmit = (formFields: AddAddressForm) => {
    if (isRegistering) {
      dispatch(addUserAddress(formFields));
      navigation.navigate('DashboardScreen');
    }

    if (isExistingAddress) {
      // dispatch(updateUser({ address: formFields }));
      navigation.goBack();
    }

    if (isAdditionalAddress) {
      dispatch(addUserAddress(formFields));
      navigation.goBack();
    }
  };

  return (
    <AddressForm
      existingFields={existingFields}
      isRegistering={isRegistering}
      submitText={buttonText}
      onSubmit={onSubmit}
    />
  );
};


AddressScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const { params = {} } = navigation.state;

  return {
    headerTitle: <HeaderTitle title={params.title || 'Address'} />,
    headerBackImage: BackButton,
    headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
    headerStyle: {
      ...navigationOptions.headerStyle as {},
      ...Views.borderBottom,
      backgroundColor: Colors.white,
    },
    headerRightContainerStyle: { ...Spacing.getStyles({ pt: 2, pr: 3 }) },
    headerRight: (params.isExistingAddress && !params.isOnlyAddress) && (
      <View
        alignCenter
        onPress={() => {
          params.handleDelete();
          navigation.goBack();
        }}
      >
        <BinIconRed />
      </View>
    ),
  };
};

export default AddressScreen;
