import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import View from '@src/components/View';
import Text from '@src/components/Text';

const SitemapScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPress = (routeName: string) => navigation.navigate(routeName);

  const map = [
    {
      title: 'Auth Flow',
      screens: [
        'OnboardingScreen',
        'SelectionScreen',
        'RegistrationScreen',
        'InvalidRegistrationScreen',
        'QualificationsScreen',
        'AddressScreen',
      ],
    },
    {
      title: 'Dashboard',
      screens: [
        'DashboardScreen',
        'SearchScreen',
      ],
    },
    {
      title: 'Schedule',
      screens: [
        'ScheduleScreen',
        'ScheduleDayScreen',
      ],
    },
    {
      title: 'Conversations',
      screens: [
        'ConversationListScreen',
        'ConversationScreen',
      ],
    },
    {
      title: 'Profile',
      screens: [
        'ProfileScreen',
        'WalletScreen',
        'HistoryScreen',
      ],
    },
  ];

  return (
    <View safeArea flex={1} bgColor="white">

      <View scroll column flex={1}>
        {map.map(({ title, screens }) => (
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
    </View>
  );
};

SitemapScreen.navigationOptions = {
  title: 'Developer Sitemap',
};

export default SitemapScreen;
