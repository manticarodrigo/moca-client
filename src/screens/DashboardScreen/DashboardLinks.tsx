import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/core';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LinkCard from '@src/components/LinkCard';

import * as Colors from '@src/styles/global/colors';

type Props = { isActivated: boolean; isTherapist: boolean }

const DashboardLinks = ({ isActivated, isTherapist }: Props) => {
  const navigation = useNavigation();

  const handlePress = (screen: string) => () => navigation.navigate(screen);

  const profilePercent = 50;
  const profilePercentString = `${100 - profilePercent}% of your profile information is missing`;
  const profileReady = profilePercent >= 50;

  const bgColor = (isTherapist && !isActivated) ? 'transparent' : 'lightGrey';

  const styles = useMemo(() => StyleSheet.create({
    progressBarIndicator: {
      width: `${profilePercent}%`,
      backgroundColor: profileReady ? Colors.success : Colors.error,
    },
  }), [profilePercent, profileReady]);

  return (
    <View column spacing={{ px: 3, py: 4 }} flex={1} bgColor={bgColor}>

      {!isTherapist && (
        <LinkCard type="diagnosis" spacing={{ mb: 2 }} onPress={handlePress('ProfileScreen')}>
          <Text variant="regularSmallGrey">
            Neck Hernia
          </Text>
        </LinkCard>
      )}

      <LinkCard type="wallet" spacing={{ mb: 2 }} onPress={handlePress('WalletScreen')}>
        <Text variant="regularSmallGrey">
          **** **** **** **** **54
        </Text>
      </LinkCard>

      {isActivated && (
      <LinkCard type="messages" spacing={{ mb: 2 }} onPress={handlePress('ConversationListScreen')}>
        <>
          <Text variant="regularSmallDark">
            John Doe 10:30am / Today
          </Text>
          <Text variant="light" numberOfLines={1}>
            You can park beside my house...
          </Text>
        </>
      </LinkCard>
      )}

      {isActivated && (
      <LinkCard type="history" spacing={{ mb: 2 }} onPress={handlePress('ProfileScreen')}>
        <Text>
          <Text variant="regularSmallGrey">Last: </Text>
          <Text variant="boldSmallGrey">Adele Dust / Wed</Text>
        </Text>
      </LinkCard>
      )}

      {!isActivated && ( // add a better check
        <LinkCard
          type="contact"
          status={profileReady ? 'success' : 'error'}
          spacing={{ mb: 2 }}
          onPress={handlePress('ProfileScreen')}
        >
          <View>
            <Text variant={profileReady ? 'regularSmallSuccess' : 'regularSmallError'}>
              {profilePercentString}
            </Text>
            <View variant="progressBar" spacing={{ mt: 2 }}>
              <View variant="progressBarIndicator" style={styles.progressBarIndicator} />
            </View>
          </View>
        </LinkCard>
      )}


      {(!isTherapist || isActivated) && <View variant="bottomBounceFill" bgColor="lightGrey" />}

    </View>
  );
};

export default DashboardLinks;
