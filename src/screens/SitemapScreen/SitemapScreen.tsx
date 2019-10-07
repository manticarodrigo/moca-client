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
        'InvalidZipCodeScreen',
        'InvalidMedicareScreen',
        'QualificationsScreen',
        'RegistrationScreen',
        'AddressScreen',
      ],
    },
    {
      title: 'Dashboard',
      screens: [
        'DashboardScreen',
        'FilterScreen',
      ],
    },
    {
      title: 'Schedule',
      screens: [
        'ScheduleScreen',
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
      ],
    },
  ];

  return (
    <View scroll column flex={1} bgColor="white">
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
  );
};

SitemapScreen.navigationOptions = {
  title: 'Developer Sitemap',
};

export default SitemapScreen;
