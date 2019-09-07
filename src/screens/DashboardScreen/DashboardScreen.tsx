import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Button from '@src/components/Button';

import FormField from '@src/components/FormField';
import Tag from '@src/components/Tag';
import Rating from '@src/components/Rating';
import AppointmentIcon from '@src/assets/Icons/appointment.png';
import PriceTable from '@src/components/PriceTable';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  return (
    <View expand alignCenter bgColor="grey">
      <PriceTable
        thirtyMinsRate="$60"
        FourtyFiveMinsRate="$90"
        SixtyMinsRate="$120"
        FirstEvaluationRate="$40"
      />
      <Button onPress={handleButtonPress}>
        Go to Chat
      </Button>
    </View>
  );
};

DashboardScreen.navigationOptions = {
  title: 'Home',
};

export default DashboardScreen;
