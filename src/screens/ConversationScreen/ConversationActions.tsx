import React from 'react';

import { DiagnosisIcon, PinIcon } from '@src/icons';

import View from '@src/components/View';
import Button from '@src/components/Button';

const ConversationActions = ({ onPressInjury, onPressLocation }) => (
  <View scroll horizontal row spacing={{ p: 3 }}>
    <Button
      variant="primarySmall"
      icon={<DiagnosisIcon size={0.4} tint="white" />}
      spacing={{ mr: 2 }}
      onPress={onPressInjury}
    >
      Add Injury Info
    </Button>
    <Button
      variant="primarySmall"
      icon={<PinIcon size={0.6} tint="white" />}
      spacing={{ mr: 2 }}
      onPress={onPressLocation}
    >
      Add Location
    </Button>
  </View>
);

export default ConversationActions;
