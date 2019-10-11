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
import PatientProfile from './PatientProfile';
import TherapistProfile from './TherapistProfile';

const ProfileScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const onPressRight = () => navigation.navigate('ProfileSettingsScreen');

  const { store: { user } } = useStore();
  const isTherapist = user.type === 'caregiver';

  let ratingTag = null;
  if (isTherapist) {
    ratingTag = (
      <View row alignCenter>
        <Text spacing={{ mr: 2 }} variant="lightTextCenter">{user.rating.toString()}</Text>
        <StarsIcon number={user.rating} />
      </View>
    );
  }
  const therapist = {
    username: 'John Doe',
    licenseNumber: '234423',
    reviewsNumber: '0',
    qualifications: [
      { name: 'Neck', value: 1 },
      { name: 'Shoulder', value: 0 },
      { name: 'Elbow', value: 1 },
    ],
    gender: 'Male',
    evaluationPrice: '30',
    pricePerThirtyMinutes: '40',
    yearsOfExperience: '10',
    rating: 4,
    certifications: [
      { id: '1', description: 'American Board of Internal Medicine', attachmentURI: certificate1 },
      { id: '2', description: 'USMLE Certified', attachmentURI: certificate1 },
    ],
  };

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
          <Text variant="titleWhite">{user.username}</Text>
          {ratingTag}
        </View>
      </View>
      { isTherapist ? <TherapistProfile /> : <PatientProfile /> }

      {/* <ReviewModal /> */}
      {/* Review modal example */}

      {/* {<TherapistProfileModal therapist={therapist} isModalVisible closeInputModal="" />} */}
      {/* Therapist modal example */}
    </View>
  );
};

ProfileScreen.navigationOptions = {
  header: null,
};

export default ProfileScreen;
