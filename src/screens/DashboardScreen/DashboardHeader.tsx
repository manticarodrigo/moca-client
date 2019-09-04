import React from 'react';
import { Header, HeaderProps } from 'react-navigation';

import { LogoIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import AppointmentCard from '@src/components/AppointmentCard';

const DashboardHeader = (props: HeaderProps) => (
  <View column bgColor="primary">

    <View row justifyEnd absoluteFill spacing={{ pt: 2, mr: -5 }}>
      <LogoIcon size={2} />
    </View>

    <Header {...props} />

    <View column justifyCenter spacing={{ px: 3, py: 4 }}>
      <Text variant="boldWhite" spacing={{ mb: 2 }}>Current</Text>
      <AppointmentCard />
    </View>

  </View>
);

export default DashboardHeader;
