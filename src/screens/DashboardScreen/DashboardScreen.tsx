import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import { mockImg } from '@src/services/mock';
import { WalletIcon, ClockIcon, InfoIcon, ChatIcon, PinIcon } from '@src/components/icons';

import View from '@src/components/View';
import Image from '@src/components/Image';
import Text from '@src/components/Text';
import Button from '@src/components/Button';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View column flex={1}>

      <View column justifyCenter spacing={{ px: 3, py: 4 }} bgColor="primary">

        <View column variant="borderCard">

          <View row justifyBetween>
            <View row>
              <Image rounded size={48} uri={mockImg} />
              <Text variant="titleSmall" spacing={{ ml: 3 }}>
                Elvis Presley
              </Text>
            </View>
            <View column alignEnd>
              <View row spacing={{ mb: 1 }}>
                <ClockIcon />
                <Text variant="regularSmall" spacing={{ ml: 1 }}>30 min</Text>
              </View>
              <Text variant="title">$60</Text>
            </View>
          </View>

          <View row justifyBetween spacing={{ mt: 2 }}>
            <View row>
              <View width={48} height={48} justifyCenter alignCenter>
                <InfoIcon />
              </View>
              <View column spacing={{ ml: 3 }}>
                <Text variant="regularAlt">
                  12:00pm / Today
                </Text>
                <Text variant="regular">
                  Chestnut St.
                </Text>
              </View>
            </View>
            <View row>
              <View variant="iconButton" onPress={() => null}>
                <ChatIcon />
              </View>
              <View variant="iconButton" spacing={{ ml: 2 }} onPress={() => null}>
                <PinIcon />
              </View>
            </View>
          </View>

          <View row justifyCenter spacing={{ mt: 2, ml: 5 }}>
            <Button variant="secondary">
              Begin Session
            </Button>
          </View>

        </View>

      </View>

      <View flex={1} spacing={{ px: 3, py: 4 }} bgColor="lightGrey">

        <View variant="shadowCard" width="100%">

          <View row spacing={{ p: 1 }} onPress={handleButtonPress}>
            <WalletIcon />
            <View column spacing={{ pl: 3 }}>
              <Text variant="titleSmall" spacing={{ mb: 2 }}>
                Wallet
              </Text>
              <Text variant="regularSmallAlt">
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
