import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import View from '@src/components/View';
import Text from '@src/components/Text';

import api from '@src/services/api';

const SitemapScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPress = (routeName: string) => navigation.navigate(routeName);

  React.useEffect(() => {
    const register = async () => {
      try {
        // const { data } = await api.login({
        //   email: 'moca-admin@approdite.com',
        //   password: 'xL2L!!6rZ#',
        // });
  
        // const { data } = await api.createANewPatient({
        //   user: {
        //     email: 'test@test.com',
        //     firstName: 'Billy Bob',
        //     lastName: 'Thorton',
        //     password: 'password123',
        //     gender: 'M',
        //   },
        //   addresses: [{
        //     name: 'Home',
        //     primary: true,
        //     apartment: 'Mars',
        //     text: 'awesome',
        //     location: {
        //       type: 'Point',
        //       coordinates: [21.35, 0.53],
        //     },
        //   }],
        //   fcmdeviceSet: [],
        // });
  
        // console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    register();
  }, []);

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
