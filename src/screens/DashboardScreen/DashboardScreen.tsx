import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';

import { LogoIcon, PersonIcon, SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import TextInput from '@src/components/TextInput';
import LinkCard from '@src/components/LinkCard';
import AppointmentCard from '@src/components/AppointmentCard';

// TODO: design not ok yet
const SearchPanel = () => {
  const [text, setText] = useState('');
  const onChangeText = (val: string) => setText(val);
  const onPressSearch = () => setText('');

  return (
    <View>
      <View column height={57} />
      <Text variant="titleSmallWhite">Hi, John</Text>
      <View height={48}>
        <View spacing={{ px: 2 }}>
          <SearchIcon />
          <TextInput
            variant="search"
            spacing={{ px: 3 }}
            onChangeText={onChangeText}
            placeholder="Therapists Search"
            value={text}
          />
        </View>
        <View spacing={{ p: 1 }} onPress={onPressSearch}>
          <PersonIcon />
        </View>
      </View>
    </View>
  );
};

const LinkCardList = (props) => {
  const navigation = useNavigation();
  const handleButtonPress = () => navigation.navigate('ChatListScreen');

  const { isTherapist } = props;
  const profilePercent = 50; // TODO: get the real value
  const remainingProfilePercentString = `${100 - profilePercent}% of your profile information is missing`;

  const styles = StyleSheet.create({
    progressBar: {
      flexDirection: 'row',
      height: '100%',
      width: `${profilePercent}%`,
      backgroundColor: '#819e3f',
      borderRadius: 8,
    },
  });

  return (
    <View column spacing={{ px: 3, py: 4 }} flex={1} bgColor="lightGrey">

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

      <LinkCard type="history" spacing={{ mb: 2 }} onPress={handleButtonPress}>
        <Text>
          <Text variant="regularSmallGrey">Last: </Text>
          <Text variant="boldSmallGrey">Adele Dust / Wed</Text>
        </Text>
      </LinkCard>

      {!isTherapist && (
        <LinkCard type="contact" spacing={{ mb: 2 }} onPress={handleButtonPress}>
          <View>
            <Text variant="regularSmallSuccess">
              {remainingProfilePercentString}
            </Text>
            <View style={{ height: 16, width: 200, backgroundColor: '#f3f2f7', borderRadius: 8 }}>
              <View style={styles.progressBar} />
            </View>
          </View>
        </LinkCard>
      )}

      <View variant="bottomBounceFill" bgColor="lightGrey" />

    </View>
  );
};

const AppointmentList = (props) => {
  const { isTherapist } = props;
  return (
    <View column spacing={{ px: 3, py: 4 }}>

      {!isTherapist && (<Text variant="titleSecondaryLight" spacing={{ mb: 2 }}>Appointments</Text>)}

      <View column justifyCenter spacing={{ mb: 3 }}>
        <Text variant="boldWhite" spacing={{ mb: 2 }}>Current</Text>
        <AppointmentCard current isTherapist={isTherapist} />
      </View>

      <View column justifyCenter>
        <Text variant="boldWhite" spacing={{ mb: 2 }}>Next</Text>
        <AppointmentCard isTherapist={isTherapist} />
      </View>
    </View>
  );
};

const DashboardScreen = () => {
  // TODO: get the real value and remove first View below
  const [isTherapist, setTherapist] = useState(true);

  return (
    <View flex={1} bgColor="primary">

      <View key="Therapist" onPress={() => setTherapist(!isTherapist)}>
        {isTherapist && (<Text> set to therapist, click to change</Text>)}
        {!isTherapist && (<Text> set to patient, click to change</Text>)}
      </View>

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      { !isTherapist && <SearchPanel /> }

      <View scroll flex={1}>

        <AppointmentList isTherapist={isTherapist} />

        <LinkCardList isTherapist={isTherapist} />

      </View>

    </View>
  );
};

DashboardScreen.navigationOptions = ({ navigationOptions }) => ({
  title: 'Appointments',
  headerStyle: {
    ...navigationOptions.headerStyle,
    backgroundColor: 'transparent',
  },
});

export default DashboardScreen;
