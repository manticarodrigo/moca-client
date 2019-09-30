import React from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { primaryScreenOptions } from '@src/routes/config';

const SitemapScreen = ({ navigation }) => {
  navigation.setOptions({
    ...primaryScreenOptions,
    title: 'Developer Sitemap',
  });

  const onPressAuth = (screen: string) => {
    navigation.navigate('AuthStack');
    setTimeout(() => navigation.navigate(screen));
  };

  const onPressTab = (tab: string, screen: string) => {
    navigation.navigate('TabStack');
    setTimeout(() => navigation.navigate(tab));
    setTimeout(() => navigation.navigate(screen));
  };

  const onPressDashboard = (screen: string) => onPressTab('DashboardTab', screen);
  const onPressSchedule = (screen: string) => onPressTab('ScheduleTab', screen);
  const onPressConversation = (screen: string) => onPressTab('ConversationTab', screen);
  const onPressProfile = (screen: string) => onPressTab('ProfileTab', screen);

  const AuthStack = [
    'OnboardingScreen',
    'SelectionScreen',
    'InvalidZipCodeScreen',
    'InvalidMedicareScreen',
    'QualificationsScreen',
    'RegistrationScreen',
    'AddressScreen',
  ];

  const DashboardTab = [
    'DashboardScreen',
    'FilterScreen',
  ];

  const ScheduleTab = [
    'ScheduleScreen',
  ];

  const ConversationTab = [
    'ConversationListScreen',
    'ConversationScreen',
  ];

  const ProfileTab = [
    'ProfileScreen',
  ];

  const map = [
    {
      title: 'Auth Flow',
      screens: AuthStack,
      onPress: onPressAuth,
    },
    {
      title: 'Dashboard',
      screens: DashboardTab,
      onPress: onPressDashboard,
    },
    {
      title: 'Schedule',
      screens: ScheduleTab,
      onPress: onPressSchedule,
    },
    {
      title: 'Conversations',
      screens: ConversationTab,
      onPress: onPressConversation,
    },
    {
      title: 'Profile',
      screens: ProfileTab,
      onPress: onPressProfile,
    },
  ];

  return (
    <View scroll column flex={1} bgColor="white">
      {map.map(({ title, screens, onPress }) => (
        <View key={title} spacing={{ p: 4 }}>
          <Text variant="titlePrimaryLarge">{title}</Text>
          <>
            {screens.map((name) => {
              const handlePress = () => onPress(name);

              return (
                <View
                  key={name}
                  variant="borderBottom"
                  spacing={{ px: 1, py: 3 }}
                  onPress={handlePress}
                >
                  <Text typography={{ size: 3, weight: '700', color: 'primary' }}>{name}</Text>
                </View>
              );
            })}
          </>
        </View>
      ))}
    </View>
  );
};

export default SitemapScreen;
