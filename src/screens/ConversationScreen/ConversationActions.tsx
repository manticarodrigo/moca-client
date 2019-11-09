import React from 'react';

import useStore from '@src/hooks/useStore';

import { InjuryIcon, ScheduleIcon } from '@src/components/icons';

import View from '@src/components/View';
import Button from '@src/components/Button';

const ConversationActions = ({ onPressAppointment, onPressInjury }) => {
  const { store } = useStore();

  return (
    <View scroll horizontal row p={3}>
      {store.user.type === 'PT' ? (
        <Button
          variant="primarySmall"
          icon={<ScheduleIcon />}
          spacing={{ mr: 2 }}
          onPress={onPressAppointment}
        >
          Send Appointment
        </Button>
      ) : (
        <Button
          variant="primarySmall"
          icon={<InjuryIcon size={0.4} tint="white" />}
          spacing={{ mr: 2 }}
          onPress={onPressInjury}
        >
          Add Injury Info
        </Button>
      )}
    </View>
  );
};

export default ConversationActions;
