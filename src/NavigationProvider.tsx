import React, { useEffect } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';

import { mockImg } from '@src/services/mock';

import { setUser } from '@src/store/actions/UserActions';
import useStore from '@src/hooks/useStore';

import ConversationStack from '@src/stacks/ConversationStack';

const NavigationProvider = () => {
  const { dispatch } = useStore();

  useEffect(() => {
    // mock user state
    dispatch(setUser({
      id: '0',
      username: 'John Doe',
      imageUrl: mockImg,
    }));
  }, [dispatch]);

  return (
    <NavigationNativeContainer>
      <ConversationStack />
    </NavigationNativeContainer>
  );
};

export default NavigationProvider;
