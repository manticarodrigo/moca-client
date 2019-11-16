import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { Address } from '@src/store/reducers/ConversationReducer';

import useStore from '@src/hooks/useStore';
import { deleteAddress } from '@src/store/actions/UserAction';

import { ArrowRightIcon, PinGreyIcon, AddIcon, BuildingIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import BackButton from '@src/components/BackButton';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';
import Toast from '@src/components/Toast';

type ToastState = {
  type: 'success' | 'error';
  message: string;
}

const AddressSettingsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastState, setToastState] = useState<ToastState>();

  const handleNewAddressPress = () => {
    navigation.navigate('AddressScreen', { isAdditionalAddress: true, title: 'New Address' });
  };

  const handleDeletePress = (addressId: Address['id']) => async () => {
    try {
      await dispatch(deleteAddress(addressId));
      setToastState({ type: 'success', message: 'Address deleted successfully.' });
    } catch (e) {
      const { detail } = e.response.data;
      setToastState({ type: 'error', message: detail || 'Failed to delete Address.' });
    }
  };

  const handleAddressPress = ({ location, ...address }: Address) => () => {
    if (!isOpen) {
      navigation.navigate('AddressScreen', {
        isExistingAddress: true,
        isOnlyAddress: store.user.addresses.length === 1,
        userAddress: { ...address, coordinates: location.coordinates },
        handleDelete: handleDeletePress(address.id),
      });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <View safeArea flex={1}>
        <FlatList
          data={store.user.addresses}
          keyExtractor={(item) => item.id.toString() || item.street}
          renderItem={({ item }) => (
            <SwipeRow
              disabled={store.user.addresses.length === 1}
              onPress={handleAddressPress(item)}
            >
              <BinRow onPress={handleDeletePress(item.id)} />
              <View
                row
                width="100%"
                variant="borderBottom"
                bgColor="white"
              >
                <View row flex={1} p={3}>
                  <View>
                    <Text variant="semiBoldLarge" size={2}>
                      {item.name}
                    </Text>
                    <View row alignCenter mt={3}>
                      <View width={20}>
                        <PinGreyIcon />
                      </View>
                      <View wrap pr={2}>
                        <Text mt={2} ml={2} variant="regularSmall" color="grey">
                          {`${item.street}, ${item.city}, ${item.state}`}
                        </Text>
                      </View>
                    </View>
                    <View row wrap alignCenter mt={2}>
                      <View width={20}>
                        <BuildingIcon />
                      </View>
                      <View wrap>
                        <Text mt={2} ml={2} variant="regularSmall" color="grey">
                          {item.apartment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </SwipeRow>
          )}
          ListFooterComponent={() => (
            <View
              row
              alignCenter
              justifyBetween
              mt={3}
              pb={3}
              variant="borderBottom"
              onPress={handleNewAddressPress}
            >
              <View ml={3}><AddIcon /></View>
              <Text variant="semiBoldLarge" size={2}>Add new Address</Text>
              <View mr={3}><ArrowRightIcon /></View>
            </View>
          )}
        />

        {!!toastState && (
          <Toast error={toastState.type === 'error'} onClose={() => setToastState(undefined)}>
            {toastState.message}
          </Toast>
        )}
      </View>
    </>
  );
};

AddressSettingsScreen.navigationOptions = {
  title: 'Addresses',
  headerBackImage: BackButton,
};

export default AddressSettingsScreen;
