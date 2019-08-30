import React from 'react';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';


const SitemapScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = (screenName) => navigation.navigate(screenName);

  const screensNames = [
    'OnboardingScreen',
    'DashboardScreen',
    'ChatListScreen',
    'ChatScreen',
  ];

  return screensNames.map((name: string) => {
    const handleCardPress = () => handleNavigate(name);

    return (
      <View key={name} variant="borderBottom" spacing={{ p: 4 }} onPress={handleCardPress}>
        <Text typography={{ size: 3, weight: '700', color: 'primary' }}>{name}</Text>
      </View>
    );
  });
};

export default SitemapScreen;
