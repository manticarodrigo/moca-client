import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import useNavigation from '@src/hooks/useNavigation';
import useStore from '@src/hooks/useStore';

import { BigEnvelopIcon, LogoIcon, FilterIcon, SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import TextInput from '@src/components/TextInput';
import LinkCard from '@src/components/LinkCard';
import AppointmentCard from '@src/components/AppointmentCard';
import Button from '@src/components/Button';

import * as Colors from '@src/styles/global/colors';

const BackgroundCheckPanel = () => (
  <View alignCenter justifyCenter spacing={{ pb: 4 }}>
    <BigEnvelopIcon />
    <View justifyCenter spacing={{ pt: 4 }}>
      <Text variant="titleSmallWhite">You’re almost there!</Text>
    </View>
    <View justifyCenter>
      <Text variant="lightTextCenter" spacing={{ px: 4, pt: 3 }}>
        In order to provide quality and safety for
        MOCA’s Patients and Providers, we have sent
        you an email to assist you in completing the
        background check process. Once complete,
        your profile will become active.
      </Text>
    </View>
  </View>
);

const SearchPanel = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const onChangeText = (val: string) => setText(val);
  const onPressSearch = () => setText('');
  const onPressFilter = () => navigation.navigate('FilterScreen');

  return (
    <View>
      <View column spacing={{ px: 4, pt: 5, pb: 3 }}>
        <Text variant="titleSmallWhite">Hi, John</Text>
      </View>
      <View row spacing={{ px: 4, my: 3 }} height={48} width={271}>
        <View
          row
          alignCenter
          style={{ borderRadius: 8, backgroundColor: Colors.lightGrey }}
        >
          <View spacing={{ px: 3 }} onPress={onPressSearch}>
            <SearchIcon />
          </View>
          <TextInput
            variant="search"
            typography={{ color: 'primary' }}
            onChangeText={onChangeText}
            placeholder="Therapists Search..."
            value={text}
          />
        </View>
        <View column spacing={{ px: 2 }} onPress={onPressFilter}>
          <FilterIcon />
        </View>
      </View>
    </View>
  );
};

const LinkCardList = (props) => {
  const navigation = useNavigation();
  const handleButtonPress = () => navigation.navigate('ConversationListScreen');

  const { isActivated, isTherapist } = props;
  const profilePercent = 50; // TODO: get the real value
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
  const [isActivated, setActivated] = useState(false);
  // direct access: store not provided set by default to patient
  const [{ registrationState: { userInformation } }] = useStore();
  const isTherapist = userInformation.type === 'Therapist';

  const [isFiltering, setFiltering] = useState(false);

  const _keyboardDidShow = () => { setFiltering(true); };
  const _keyboardDidHide = () => { setFiltering(false); };

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
  });

  return (
    <View flex={1} bgColor="primary">

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      <Button variant="secondary" onPress={() => setActivated(!isActivated)}>
        activated button, click to change
      </Button>

      { !isActivated && isTherapist && <BackgroundCheckPanel /> }
      { isActivated && isTherapist && (
        <View alignCenter><Text variant="titleSmallWhite">Appointments</Text></View>
      )}
      { !isTherapist && <SearchPanel /> }

      { !isFiltering && (
        <View scroll flex={1}>
          { (!isTherapist || isActivated) && (
          <AppointmentList isTherapist={isTherapist} />
          )}
          <LinkCardList isActivated={isActivated} isTherapist={isTherapist} />

        </View>
      )}
    </View>
  );
};

DashboardScreen.navigationOptions = () => ({
  header: null,
});

export default DashboardScreen;
