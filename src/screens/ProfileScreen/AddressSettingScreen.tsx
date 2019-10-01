/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react';
import Swipeable from 'react-native-swipeable-row';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';
import HeaderTitle from '@src/components/HeaderTitle';
import BackButton from '@src/components/BackButton';

import ArrowRightIcon from '@src/components/icons/ArrowRightIcon';
import PinGreyIcon from '@src/components/icons/PinGreyIcon';
import AddIcon from '@src/components/icons/AddIcon';
import BuildingIcon from '@src/components/icons/BuildingIcon';
import BinIcon from '@src/components/icons/BinIcon';

import useStore from '@src/hooks/useStore';
import { Views, Spacing, Colors } from '@src/styles';
import { updateUserInfomation } from '@src/store/actions/RegistrationAction';


const AddressSettingScreen = () => {
  type Address = {
    street: string;
    city: string;
    state: string;
    apartmentNumber: string;
  }

  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [{ registrationState: { userInformation: { addresses } } }, dispatch] = useStore();
  const swipableItems = useRef(Array.from({ length: addresses.length }, (a) => React.createRef()));

  const recenterItems = () => {
    [...Array(addresses.length)].map((el, i) => swipableItems.current[i].recenter());
  };

  const handleNewAddressPress = () => {
    recenterItems();
    navigation.navigate('AddressScreen',
      { isAdditionalAddress: true, title: `Home ${addresses.length}` });
  };


  const handleDeletePress = (index: number) => {
    // api call
    recenterItems();
    const newAddresses = addresses.map((x) => ({ ...x }));
    newAddresses.splice(index, 1);
    dispatch(updateUserInfomation({ addresses: newAddresses }));
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

      if (addresses.length === 1) {
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
      recenterItems();
      setIsOpen(false);
    }
  };

  return (
    <View safeArea flex={1}>
      <View scroll>
        <View>
          { addresses.map((userAddress: Address, index) => (
            <Swipeable
              key={index}
              rightButtonsActivationDistance={20}
              onRef={(ref) => { swipableItems.current[index] = ref; }}
              rightButtonWidth={100}
              disable={addresses.length === 1}
              onRightButtonsCloseRelease={() => {
                setIsOpen(false);
              }}
              onRightButtonsOpenRelease={() => {
                setIsOpen(true);
              }}
              onRightButtonsActivate={() => {
                recenterItems();
              }}
              rightButtons={[
                <View
                  key={index}
                  flex={1}
                  bgColor="error"
                  justifyCenter
                  onPress={() => handleDeletePress(index)}
                  spacing={{ pl: 5 }}
                >
                  <BinIcon />
                </View>,
              ]}
            >
              <View
                key={index}
                row
                width="100%"
                variant="borderBottom"
                onPress={() => handleAddressPress(userAddress, index)}
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
                          {userAddress.street}
                          {', '}
                          {userAddress.city}
                          {', '}
                          {userAddress.state}
                        </Text>
                      </View>
                    </View>
                    <View row spacing={{ mt: 2 }} wrap alignCenter>
                      <View width={20}>
                        <BuildingIcon />
                      </View>
                      <View wrap>
                        <Text spacing={{ ml: 2, mt: 2 }} variant="regularSmallGrey">
                          {userAddress.apartmentNumber}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Swipeable>
          ))}
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

AddressSettingScreen.navigationOptions = () => ({
  headerTitle: <HeaderTitle title="Address" />,
  headerBackImage: BackButton,
  headerLeftContainerStyle: { ...Spacing.getStyles({ pt: 2, pl: 3 }) },
  headerStyle: {
    ...Views.borderBottom,
    backgroundColor: Colors.white,
    height: 80,
  },
});
export default AddressSettingScreen;
