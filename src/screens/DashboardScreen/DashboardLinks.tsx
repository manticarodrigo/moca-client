import React from 'react';
import { StyleSheet } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';

import View from '@src/components/View';
import Text from '@src/components/Text';
import LinkCard from '@src/components/LinkCard';

import * as Colors from '@src/styles/global/colors';

type Props = { isActivated: boolean; isTherapist: boolean }

const DashboardLinks = ({ isActivated, isTherapist }: Props) => {
  const navigation = useNavigation();
  const handleButtonPress = () => navigation.navigate('ConversationListScreen');

  const profilePercent = 50;
  const remainingProfilePercentString = `${100 - profilePercent}% of your profile information is missing`;

  const bgColor = (isTherapist && !isActivated) ? 'primary' : 'lightGrey';

  const styles = StyleSheet.create({
    progressBar: {
      flexDirection: 'row',
      height: '100%',
      width: `${profilePercent}%`,
      backgroundColor: Colors.success,
      borderRadius: 8,
    },
  });

  return (
    <View column spacing={{ px: 3, py: 4 }} flex={1} bgColor={bgColor}>

      {!isTherapist && (
        <LinkCard type="diagnosis" spacing={{ mb: 2 }} onPress={handleButtonPress}>
          <Text variant="regularSmallGrey">
            Neck Hernia
          </Text>
        </LinkCard>
      )}

      <LinkCard type="wallet" spacing={{ mb: 2 }} onPress={handleButtonPress}>
        <Text variant="regularSmallGrey">
          **** **** **** **** **54
        </Text>
      </LinkCard>

      {isActivated && (
      <LinkCard type="messages" spacing={{ mb: 2 }} onPress={handleButtonPress}>
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
      <LinkCard type="history" spacing={{ mb: 2 }} onPress={handleButtonPress}>
        <Text>
          <Text variant="regularSmallGrey">Last: </Text>
          <Text variant="boldSmallGrey">Adele Dust / Wed</Text>
        </Text>
      </LinkCard>
      )}

      {!isActivated && ( // add a better check
        <LinkCard type="contact" spacing={{ mb: 2 }} onPress={handleButtonPress}>
          <View>
            <Text variant="regularSmallSuccess">
              {remainingProfilePercentString}
            </Text>
            <View variant="progressBar" spacing={{ mt: 2 }}>
              <View style={styles.progressBar} />
            </View>
          </View>
        </LinkCard>
      )}

      <View variant="bottomBounceFill" bgColor="lightGrey" />

    </View>
  );
};

export default DashboardLinks;
