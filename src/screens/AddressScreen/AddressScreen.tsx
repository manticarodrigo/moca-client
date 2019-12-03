import React, { useState, useEffect } from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { addAddress, updateAddress, AddAddressForm } from '@src/store/actions/UserAction';

import { Views, Spacing, Colors } from '@src/styles';

import BinIconRed from '@src/components/icons/BinIconRed';

import View from '@src/components/View';
import BackButton from '@src/components/BackButton';
import HeaderTitle from '@src/components/HeaderTitle';
import Toast from '@src/components/Toast';

import AddressForm from './AddressForm';

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const AddressScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [existingFields, setExistingFields] = useState<AddAddressForm>();
  const [toastState, setToastState] = useState<ToastState>();

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

  const onSubmit = async (formFields: AddAddressForm & { id: number }) => {
    if (isRegistering) {
      try {
        await dispatch(addAddress(formFields));
        navigation.navigate('DashboardScreen');
      } catch (e) {
        const { data = ['Submission failed.'] } = e.response;
        setToastState({ type: 'error', message: data[0] });
      }
    }

    if (isExistingAddress) {
      try {
        await dispatch(updateAddress(formFields));
        setToastState({ type: 'success', message: 'Update successful.' });
      } catch (e) {
        const { data = ['Submission failed.'] } = e.response;
        setToastState({ type: 'error', message: data[0] });
      }
    }

    if (isAdditionalAddress) {
      try {
        await dispatch(addAddress(formFields));
        setToastState({ type: 'success', message: 'Submission successful.' });
      } catch (e) {
        const { data = ['Submission failed.'] } = e.response;
        setToastState({ type: 'error', message: data[0] });
      }
    }
  };

  return (
    <>
      <AddressForm
        existingFields={existingFields}
        isRegistering={isRegistering}
        submitText={buttonText}
        onSubmit={onSubmit}
      />
      {!!toastState && (
        <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
          {toastState.message}
        </Toast>
      )}
    </>
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
