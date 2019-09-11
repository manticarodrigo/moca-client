import React, { useState } from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LinkCard from '@src/components/LinkCard';
import AppointmentCard from '@src/components/AppointmentCard';


const FilterScreen = () => {
  const navigation = useNavigation();

  const [focus, setfocus] = useState(false);

  // const handleButtonPress = () => navigation.navigate('ChatListScreen');

  const handlePress = () => setfocus(!focus);

  return (
    <View flex={1} bgColor="white">
      <View column bgColor="primaryDark" variant="borderBottom" height={200}>
        <Text typography={{ size: 1, color: 'grey' }} spacing={{ m: 3 }}>Sort by</Text>
        <View row variant="roundedBorder" height={100} spacing={{ mx: 3 }}>
          <View flex={1} bgColor="white">
            <Text>Hello!</Text>
          </View>
          <View flex={1}>
            <Text>Hello!</Text>
          </View>
          <View flex={1} bgColor="white">
            <Text>Hello!</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

FilterScreen.navigationOptions = () => ({
  title: 'Filter',
  headerStyle: {
    backgroundColor: 'transparent',
  },
});

export default FilterScreen;
