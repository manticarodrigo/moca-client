import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
  RadiusLocationIcon,
  ArrowRightIcon,
  Badge2Icon,
  BioIcon,
  GenderIcon,
  InterestIcon,
  PriceRateIcon,
  QualificationIcon,
  RateIcon,
  StatusIcon,
  SwitchIcon,
} from '@src/components/icons';

import Text from '@src/components/Text';
import View from '@src/components/View';
import * as Colors from '@src/styles/global/colors';

const TherapistProfile = () => {
  const navigation = useNavigation();

  const onPressRadioLocation = () => navigation.navigate('RadioLocationScreen');

  // Status form
  // TODO: get real initial value
  const [isAvailable, setAvailable] = useState(false);
  const pressStatus = (type: boolean) => {
    setAvailable(type);
    // TODO save into DB
  };

  // Gender form
  // TODO: get real initial value
  const [gender, setGender] = useState('');
  const isMale = gender === 'Male';
  const isFemale = gender === 'Female';
  const isOther = gender === 'Other';

  const maleBgColor = isMale ? 'secondaryLight' : 'white';
  const maleTextColor = isMale ? 'white' : 'secondaryLighter';
  const femaleBgColor = isFemale ? 'secondaryLight' : 'white';
  const femaleTextColor = isFemale ? 'white' : 'secondaryLighter';
  const otherBgColor = isOther ? 'secondaryLight' : 'white';
  const otherTextColor = isOther ? 'white' : 'secondaryLighter';

  const pressGender = (type: 'Male' | 'Female' | 'Other') => {
    setGender(type);
    // TODO save into DB
  };


  // TODO: get real datas
  const rate = ['$60', '$90', '$120', '$40'];
  const distance = '4 Miles';
  const reviewsNumber = '12';
  const personalBio = 'Brigham-trained internal medicine specialist, Weill Cornell medicine attending, co-founder of Medicenter, and New Yorker.';
  const licenceNumber = '4789652';
  const experience = '6 years work of experience';
  const specialty = 'Cardiorespiratory, Orthopaedic, Paediatrics, Sports Physiotherapy, Women\'s Health, Neurology, Geriatrics';
  const qualifications = '';
  const interest = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue arcu dolor, vel viverra mauris sodales in. Integer lectus elit, posuere ut sem eget, ullamcorper sagittis sem. ';

  return (
    <View flex={1} scroll bgColor="lightGrey">

      <View variant="profileSection">
        <View row>
          <View spacing={{ p: 3 }}>
            <PriceRateIcon />
          </View>
          <View column flex={1}>
            <View row alignCenter spacing={{ py: 3 }}>
              <Text variant="boldDark">Price Rate</Text>
            </View>
            <View row width="100%" spacing={{ pr: 3, pb: 3 }} style={{ borderBottomWidth: 1, borderColor: Colors.secondaryLightest }}>
              <View
                flex={1}
                column
                alignCenter
                style={{ borderRightWidth: 1, borderColor: Colors.secondaryLightest }}
              >
                <View><Text variant="regularSmallGrey">30min</Text></View>
                <View spacing={{ pt: 2 }}><Text variant="titleSecondaryLarge">{rate[0]}</Text></View>
              </View>
              <View
                flex={1}
                column
                alignCenter
                style={{ borderRightWidth: 1, borderColor: Colors.secondaryLightest }}
              >
                <View><Text variant="regularSmallGrey">60min</Text></View>
                <View spacing={{ pt: 2 }}><Text variant="titleSecondaryLarge">{rate[1]}</Text></View>
              </View>
              <View column alignCenter flex={1}>
                <View><Text variant="regularSmallGrey">90min</Text></View>
                <View spacing={{ pt: 2 }}><Text variant="titleSecondaryLarge">{rate[2]}</Text></View>
              </View>
            </View>
            <View row alignCenter height={65}>
              <View column flex={2}>
                <Text variant="regularSmallGrey">First time evaluation price</Text>
              </View>
              <View column flex={1}>
                <Text variant="titleSecondaryLarge">{rate[3]}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View variant="profileSection">
        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <RadiusLocationIcon />
          </View>
          <View row variant="profileCard">
            <View flex={1}><Text variant="boldDark">Service Area</Text></View>
            <View row flex={1}>
              <Text variant="boldPrimary">{distance}</Text>
              <View onPress={onPressRadioLocation}>
                <ArrowRightIcon />
              </View>
            </View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <StatusIcon />
          </View>
          <View row variant="profileCard">
            <View flex={1}><Text variant="boldDark">Status</Text></View>
            <View row alignCenter flex={2}>
              {isAvailable ? <Text variant="regularSmallSuccess">Available</Text> : <Text variant="regularSmallGrey"> not Available</Text>}
              <View onPress={() => pressStatus(!isAvailable)}>
                <SwitchIcon isOn={isAvailable} />
              </View>
            </View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <RateIcon />
          </View>
          <View row variant="profileCard">
            <View flex={1}><Text variant="boldDark">Reviews</Text></View>
            <View flex={1} alignCenter><Text>{reviewsNumber}</Text></View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <GenderIcon />
          </View>
          <View row variant="profileCard">
            <View flex={1}><Text variant="boldDark">Gender</Text></View>
            <View row flex={3}>
              <View
                variant="genderButton"
                {...(!isMale ? { onPress: () => pressGender('Male') } : '')}
                bgColor={maleBgColor}
              >
                <Text typography={{ color: maleTextColor }}>Male</Text>
              </View>
              <View
                variant="genderButton"
                {...(!isFemale ? { onPress: () => pressGender('Female') } : '')}
                bgColor={femaleBgColor}
              >
                <Text typography={{ color: femaleTextColor }}>Female</Text>
              </View>
              <View
                variant="genderButton"
                {...(!isOther ? { onPress: () => pressGender('Other') } : '')}
                bgColor={otherBgColor}
              >
                <Text typography={{ color: otherTextColor }}>Other</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View variant="profileSection">
        <View row>
          <View spacing={{ p: 3 }}>
            <BioIcon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">Personal Bio</Text>
            <View spacing={{ pt: 2 }} width={295}><Text variant="regularSmallGrey">{personalBio}</Text></View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <Badge2Icon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">PT Licence Number</Text>
            <View spacing={{ pt: 2 }} width={295}><Text variant="regularSmallGrey">{licenceNumber}</Text></View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">Years of Experience</Text>
            <View spacing={{ pt: 2 }} width={295}><Text variant="regularSmallGrey">{experience}</Text></View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">Areas of Specialty</Text>
            <View spacing={{ pt: 2 }} width={295}><Text variant="regularSmallGrey">{specialty}</Text></View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <QualificationIcon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">Certifications</Text>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">Interest</Text>
            <View spacing={{ pt: 2 }} width={295}><Text variant="regularSmallGrey">{interest}</Text></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TherapistProfile;
