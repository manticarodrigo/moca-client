import React from 'react';

import { BigEnvelopeIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const DashboardAlert = () => (
  <View alignCenter justifyCenter spacing={{ py: 4 }}>
    <BigEnvelopeIcon />
    <View justifyCenter spacing={{ pt: 4 }}>
      <Text variant="titleSmallWhite">You’re almost there!</Text>
    </View>
    <View justifyCenter>
      <Text variant="lightTextCenter" spacing={{ px: 4, pt: 3 }}>
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
