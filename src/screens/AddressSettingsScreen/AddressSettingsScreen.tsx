import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { updateUser } from '@src/store/actions/UserAction';

import { Views, Spacing, Colors } from '@src/styles';

import {
  ArrowRightIcon,
  PinGreyIcon,
  AddIcon,
  BuildingIcon,
} from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import HeaderTitle from '@src/components/HeaderTitle';
import BackButton from '@src/components/BackButton';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';

const AddressSettingsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  type Address = {
    street: string;
    city: string;
    state: string;
    apartment: string;
  }

  const [isOpen, setIsOpen] = useState(false);
  const { store, dispatch } = useStore();

  const handleNewAddressPress = () => {
    navigation.navigate('AddressScreen', { isAdditionalAddress: true, title: 'New Address' });
  };

  const handleDeletePress = (index: number) => {
    const updated = [...store.user.addresses];
    updated.splice(index, 1);

    if (store.user.addresses.length > 1) {

    }

    dispatch(updateUser({ addresses: updated }));
  };

  const handleAddressPress = (userAddress: Address, index: number) => {
    if (!isOpen) {
      let title = '';
      let isOnlyAddress = false;

      if (index === 0) {
        title = 'Home';
      } else {
        title = `Home ${index}`;
      }

      if (store.user.addresses.length === 1) {
        isOnlyAddress = true;
      }

      navigation.navigate('AddressScreen', {
        isExistingAddress: true,
        title,
        userAddress,
        isOnlyAddress,
        index,
        handleDelete: () => handleDeletePress(index) });
    } else {
      setIsOpen(false);
    }
  };

  return (
    <View safeArea flex={1}>
      <View scroll>
        <View>
          <FlatList
            data={store.user.addresses}
            keyExtractor={(item) => item.id.toString() || item.street}
            renderItem={({ item, index }) => (
              <SwipeRow
                disabled={store.user.addresses.length === 1}
                onPress={() => handleAddressPress(item, index)}
              >
                <BinRow onPress={() => handleDeletePress(index)} />
                <View
                  row
                  width="100%"
                  variant="borderBottom"
                  bgColor="white"
                >
                  <View row flex={1} spacing={{ p: 3 }}>
                    <View>
                      <Text variant="titleSmall" typography={{ size: 2 }}>
                        {index === 0 ? 'Home' : `Home ${index}`}
                      </Text>
                      <View row spacing={{ mt: 3 }} alignCenter>
                        <View width={20}>
                          <PinGreyIcon />
                        </View>
                        <View wrap spacing={{ pr: 2 }}>
                          <Text spacing={{ ml: 2, mt: 2 }} variant="regularSmallGrey">
                            {item.street}
                            {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                            {', '}
                            {item.city}
                            {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                            {', '}
                            {item.state}
                          </Text>
                        </View>
                      </View>
                      <View row spacing={{ mt: 2 }} wrap alignCenter>
                        <View width={20}>
                          <BuildingIcon />
                        </View>
                        <View wrap>
                          <Text spacing={{ ml: 2, mt: 2 }} variant="regularSmallGrey">
                            {item.apartment}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </SwipeRow>
            )}
          />
        </View>
        <View
          variant="borderBottom"
          spacing={{ mt: 3, pb: 3 }}
          row
          alignCenter
          justifyBetween
          onPress={handleNewAddressPress}
        >
          <View spacing={{ ml: 3 }}>
            <AddIcon />
          </View>
          <Text variant="titleSmall" typography={{ size: 2 }}>
            Add new Address
          </Text>
          <View spacing={{ mr: 3 }}>
            <ArrowRightIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

AddressSettingsScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Address" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});
export default AddressSettingsScreen;
