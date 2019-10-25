import React from 'react';

import useStore from '@src/hooks/useStore';

import AppointmentsTab from './AppointmentsTab';

const HistoryScreen = () => {
  const { store } = useStore();

  return (
    <AppointmentsTab
      isTherapist={store.user.type === 'PT'}
      appointments={store.appointments}
    />
  );
};

HistoryScreen.navigationOptions = () => ({
  headerTitle: 'History',
});

export default HistoryScreen;
