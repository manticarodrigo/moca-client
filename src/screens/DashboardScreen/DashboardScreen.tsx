import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import { mockImg } from '@src/services/mock';
import { WalletIcon } from '@src/components/icons';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View flex={1}>

      <View justifyCenter spacing={{ px: 3, py: 4 }} bgColor="primary">

        <View variant="card">
          <View row spacing={{ p: 1 }}>
            <Image rounded size={48} uri={mockImg} />
            <View column spacing={{ pl: 3 }}>
              <Text spacing={{ mb: 2 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
                Elvis Presley
              </Text>
              <Text typography={{ size: 1, weight: '500', color: 'grey' }}>
                Los Angeles
              </Text>
            </View>
          </View>
        </View>

      </View>

      <View flex={1} spacing={{ px: 3, py: 4 }} bgColor="lightGrey">

        <View variant="shadowCard" width="100%">

          <View row spacing={{ p: 1 }} onPress={handleButtonPress}>
            <WalletIcon />
            <View column spacing={{ pl: 3 }}>
              <Text spacing={{ mb: 2 }} typography={{ size: 3, weight: '700', color: 'primary' }}>
                Wallet
              </Text>
              <Text typography={{ size: 1, weight: '500', color: 'grey' }}>
                **** **** **** **** **54
              </Text>
            </View>
          </View>
        </View>

      </View>

    </View>
  );
};

DashboardScreen.navigationOptions = {
  title: 'Home',
};

export default DashboardScreen;
