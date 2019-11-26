import React from 'react';
import { BottomTabBar } from 'react-navigation-tabs';

import useStore from '@src/hooks/useStore';

const TabBar: typeof BottomTabBar = ({ navigation, ...rest }) => {
  const { store } = useStore();
  const { state } = navigation;

  // filter tabs items
  let { routes } = state;

  if (store.user.type === 'PA') {
    routes = state.routes.filter((route) => route.routeName !== 'ScheduleTab');
  }

  if (store.user.type === 'PT') {
    routes = state.routes.filter((route) => route.routeName !== 'SearchTab');
  }

  // find the active route index
  const index = routes.findIndex((route) => (
    route.routeName === state.routes[state.index].routeName
  ));

  return (
    <BottomTabBar
      {...rest}
      navigation={{
        ...navigation,
        state: {
          ...navigation.state,
          routes,
          index,
        },
      }}
    />
  );
};

export default React.memo(TabBar);
