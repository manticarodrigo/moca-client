import React from 'react';

import {
  DashboardTabIcon,
  ScheduleTabIcon,
  ConversationTabIcon,
  ProfileTabIcon,
} from '@src/components/icons';

const TabBarIcon = ({ focused, navigation }) => {
  const { routeName } = navigation.state;

  switch (routeName) {
    case 'DashboardTab':
      return <DashboardTabIcon focused={focused} />;
    case 'ScheduleTab':
      return <ScheduleTabIcon focused={focused} />;
    case 'ConversationTab':
      return <ConversationTabIcon focused={focused} />;
    case 'ProfileTab':
      return <ProfileTabIcon focused={focused} />;
    default:
      return null;
  }
};

export default TabBarIcon;
