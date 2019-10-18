import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';

import { LogoIcon, StarsIcon, RightIcon } from '@src/components/icons';

import ReviewModal from '@src/modals/ReviewModal';

import { certificate1 } from '@src/utlities/images';
import { mockImg } from '@src/services/mock';


import Image from '@src/components/Image';
import Text from '@src/components/Text';
import View from '@src/components/View';

import TherapistProfileModal from '@src/modals/TherapistProfileModal';
import PatientProfileModal from '@src/modals/PatientProfileModal';

import PatientProfile from './PatientProfile';
import TherapistProfile from './TherapistProfile';

const ProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPressRight = () => navigation.navigate('ProfileSettingsScreen');

  const { store } = useStore();
  const isTherapist = store.user.type === 'PT';

  let ratingTag = null;
  if (isTherapist) {
    ratingTag = (
      <View row alignCenter>
        <Text spacing={{ mr: 2 }} variant="lightTextCenter">{store.user.rating.toString()}</Text>
        <StarsIcon number={store.user.rating} />
      </View>
    );
  }

  // const therapist = {
  //   username: 'John Doe',
  //   licenseNumber: '234423',
  //   reviewsNumber: '4',
  //   qualifications: [
  //     { name: 'Neck', value: true },
  //     { name: 'Shoulder', value: false },
  //     { name: 'Elbow', value: true },
  //   ],
  //   licenseDate: new Date('2010-10-11'),
  //   gender: 'Male',
  //   evaluationPrice: '30',
  //   pricePerThirtyMinutes: '40',
  //   yearsOfExperience: '10',
  //   rating: 4,
  //   certifications: [
  //     { id: '1', description: 'American Board of Internal Medicine', attachmentURI: certificate1 },
  //     { id: '2', description: 'USMLE Certified', attachmentURI: certificate1 },
  //   ],
  // };

  // const appointment = {
  //   appointmentDuration: '30',
  //   appointmentPrice: 40,
  //   name: 'Ahmed',
  // };

  return (
    <View safeArea flex={1} bgColor="primary">

      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      <View row justifyBetween alignCenter width="100%" spacing={{ p: 4, pt: 3 }}>
        <View width={32} height={32} />
        <Text variant="titleSmallWhite">Profile</Text>
        <View onPress={onPressRight}><RightIcon /></View>
      </View>

      <View row spacing={{ p: 4 }}>
        <Image rounded size={80} uri={mockImg} />
        <View column justifyCenter spacing={{ px: 3 }}>
          <Text variant="titleWhite">{store.user.firstName}</Text>
          {ratingTag}
        </View>
      </View>
      { isTherapist ? <TherapistProfile /> : <PatientProfile /> }

      {/* <ReviewModal appointment={appointment} /> */}
      {/* Review modal example */}

      {/* {<TherapistProfileModal therapist={therapist} isModalVisible closeInputModal="" />} */}
      {/* Therapist modal example */}

      {/* {<PatientProfileModal
        patient={{ username: user.username, gender: 'Male' }}
        isModalVisible
        closeInputModal=""
      />} */}

    </View>
  );
};

ProfileScreen.navigationOptions = {
  header: null,
};

export default ProfileScreen;
