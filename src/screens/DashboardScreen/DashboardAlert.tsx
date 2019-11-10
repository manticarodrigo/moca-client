import React from 'react';

import { BigEnvelopeIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const DashboardAlert = () => (
  <View alignCenter justifyCenter py={4}>
    <BigEnvelopeIcon />
    <View justifyCenter pt={4}>
      <Text variant="semiBoldLarge" color="white">You’re almost there!</Text>
    </View>
    <View justifyCenter>
      <Text
        pt={3}
        px={4}
        variant="regularSmall"
        color="secondaryLighter"
        align="center"
      >
        In order to provide quality and safety for
        MOCA’s Patients and Providers, we have sent
        you an email to assist you in completing the
        background check process. Once complete,
        your profile will become active.
      </Text>
    </View>
  </View>
);

export default DashboardAlert;
