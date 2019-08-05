import React, { ComponentClass } from 'react';
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';

import CareSearch from '@components/CareSearch';

const App = () => {

  return (
    <CareSearch />
  );
};

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(App as unknown as ComponentClass<any>);
