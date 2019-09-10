import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import { LogoIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LinkCard from '@src/components/LinkCard';
import AppointmentCard from '@src/components/AppointmentCard';

import FormField from '@src/components/FormField';
import Tag from '@src/components/Tag';
import Rating from '@src/components/Rating';
import AppointmentIcon from '@src/assets/Icons/appointment.png';
import PriceTable from '@src/components/PriceTable';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View flex={1} bgColor="primary">

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      <View scroll flex={1}>

        <View column spacing={{ px: 3, py: 4 }}>

          <View column justifyCenter spacing={{ mb: 3 }}>
            <Text variant="boldWhite" spacing={{ mb: 2 }}>Current</Text>
            <AppointmentCard current />
          </View>

          <View column justifyCenter>
            <Text variant="boldWhite" spacing={{ mb: 2 }}>Next</Text>
            <AppointmentCard />
          </View>
        </View>

        <View column spacing={{ px: 3, py: 4 }} flex={1} bgColor="lightGrey">

          <LinkCard type="wallet" spacing={{ mb: 2 }} onPress={handleButtonPress}>
            <Text variant="regularSmallGrey">
              **** **** **** **** **54
            </Text>
          </LinkCard>

          <LinkCard type="messages" spacing={{ mb: 2 }} onPress={handleButtonPress}>
            <>
              <Text variant="regularSmallDark">
                John Doe 10:30am / Today
              </Text>
              <Text variant="light" numberOfLines={1}>
                You can park beside my house...
              </Text>
            </>
          </LinkCard>

          <LinkCard type="history" onPress={handleButtonPress}>
            <Text>
              <Text variant="regularSmallGrey">Last: </Text>
              <Text variant="boldSmallGrey">Adele Dust / Wed</Text>
            </Text>
          </LinkCard>

          <View variant="bottomBounceFill" bgColor="lightGrey" />

        </View>

      </View>

    </View>
  );
};

DashboardScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Appointments',
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: 'transparent',
  },
});

export default DashboardScreen;
