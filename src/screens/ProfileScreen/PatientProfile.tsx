import React, { useState } from 'react';
import useNavigation from '@src/hooks/useNavigation';

import {
  RadiusLocationIcon,
  CreditCardIcon,
  DiagnosisIcon,
  ArrowRightIcon,
  GenderIcon,
} from '@src/components/icons';

import { mockImg } from '@src/services/mock';

import Image from '@src/components/Image';
import Text from '@src/components/Text';
import View from '@src/components/View';

const PatientProfile = () => {
  const navigation = useNavigation();

  const onPressAdress = () => navigation.navigate('AddressScreen');
  const onPressDiagnosis = () => navigation.navigate('DiagnosisScreen');
  const onPressPayment = () => navigation.navigate('PaymentScreen');

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

  // Diagnosis Image
  // TODO: get real data and loop to create up to 3 images
  const diagnosis = 'Neck Hernia';
  const diagnosisImage = (
    <View flex={1}>
      <Image rounded size={48} uri={mockImg} />
    </View>
  );

  // Payment method
  const card = 'Add payment method';

  return (
    <View flex={1} scroll bgColor="lightGrey">

      <View variant="profileSection">
        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <RadiusLocationIcon />
          </View>
          <View row variant="profileCard">
            <View flex={1}><Text variant="boldDark">Address</Text></View>
            <View flex={1} onPress={onPressAdress}><ArrowRightIcon /></View>
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

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <DiagnosisIcon size={0.5} />
          </View>
          <View row variant="profileCard">
            <View column flex={1}>
              <View><Text variant="boldDark">Diagnosis</Text></View>
              <View spacing={{ pt: 2 }}><Text variant="regularSmallGrey">{diagnosis}</Text></View>
            </View>
            {diagnosisImage}
            <View row flex={1} onPress={onPressDiagnosis}><ArrowRightIcon /></View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <CreditCardIcon />
          </View>
          <View row variant="profileCard" justifyBetween>
            <View column>
              <View><Text variant="boldDark">Payment Method</Text></View>
              <View spacing={{ pt: 2 }}><Text variant="regularSmallGrey">{card}</Text></View>
            </View>
            <View column onPress={onPressPayment}><ArrowRightIcon /></View>
          </View>
        </View>

      </View>
    </View>
  );
};

export default PatientProfile;
