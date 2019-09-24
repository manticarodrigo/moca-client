import React from 'react';

import { Colors } from '@src/styles';

import Header from '@src/components/Header';
import View from '@src/components/View';
import Text from '@src/components/Text';

// import { ScreenProps } from '@src/stacks/AuthStack';

// type Props = ScreenProps<'SitemapScreen'>;

const SitemapScreen = ({ navigation }) => {
  navigation.setOptions({
    title: 'Developer Sitemap',
    header: Header,
    headerStyle: {
      backgroundColor: Colors.primary,
      borderBottomColor: Colors.primary,
    },
    headerTitleStyle: {
      color: Colors.white,
    },
  });

  const handleNavigate = (screenName) => navigation.replace(screenName);

  const screensNames = [
    'AuthStack',
    'TabStack',
  ];

  return (
    <View scroll column flex={1} bgColor="white">
      {screensNames.map((name: string) => {
        const handleCardPress = () => handleNavigate(name);

        return (
          <View key={name} variant="borderBottom" spacing={{ p: 4 }} onPress={handleCardPress}>
            <Text typography={{ size: 3, weight: '700', color: 'primary' }}>{name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default SitemapScreen;
