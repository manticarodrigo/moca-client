import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LinkCard from '@src/components/LinkCard';

import DashboardHeader from './DashboardHeader';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View column flex={1} bgColor="lightGrey">

      <View scroll flex={1} spacing={{ px: 3 }} insets={{ top: 4, bottom: 4 }}>

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
            <Text variant="light">
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

      </View>

    </View>
  );
};

DashboardScreen.navigationOptions = {
  title: 'Appointments',
  header: DashboardHeader,
  headerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
};

export default DashboardScreen;
