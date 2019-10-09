import React, { useState } from 'react';

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

import useStore from '@src/hooks/useStore';

import PriceModal from '@src/modals/PriceModal';
import ServiceAreaModal from '@src/modals/ServiceAreaModel';
import InterestsModal from '@src/modals/InterestsModal';
import PersonalBio from '@src/modals/PersonalBioModal';
import ExperienceModal from '@src/modals/ExperienceModal';
import AreaOfSpecialtyModal from '@src/modals/AreaOfSpecialtyModal';


import * as Colors from '@src/styles/global/colors';

import ModalView from '@src/components/ModalView';
import Text from '@src/components/Text';
import View from '@src/components/View';
import Image from '@src/components/Image';

import { updateUser } from '@src/store/actions/UserAction';
import useImageViewer from '@src/hooks/useImageViewer';

type priceSelection =
'pricePerThirtyMinutes' |
 'pricePerSixtyMinutes' |
  'pricePerNintyMinutes' |
   'evaluationPrice' |
    '';


const TherapistProfile = () => {
  const { store: { user }, dispatch } = useStore();
  const { viewer, onPressImage } = useImageViewer(user.certifications);

  const [isAvailable, setAvailable] = useState(user.status === 'available');
  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);
  const [isServiceAreaModalVisible, setIsServiceAreaModalVisible] = useState(false);
  const [isInterestsModalVisible, setIsInterestsModalVisible] = useState(false);
  const [isPersonalBioVisible, setIsPersonalBioVisible] = useState(false);
  const [isExperienceModalVisible, setIsExperienceModalVisible] = useState(false);
  const [isAreaOfSpecialtyVisible, setIsAreaOfSpecialtyVisible] = useState(false);


  const [priceSelection, setPriceSelection] = useState<priceSelection>('');
  const [gender, setGender] = useState(user.gender ? user.gender : '');

  const isMale = gender === 'Male';
  const isFemale = gender === 'Female';
  const isOther = gender === 'Other';

  const reviewsNumber = '12';

  const maleBgColor = isMale ? 'secondaryLight' : 'white';
  const maleTextColor = isMale ? 'white' : 'secondaryLighter';
  const femaleBgColor = isFemale ? 'secondaryLight' : 'white';
  const femaleTextColor = isFemale ? 'white' : 'secondaryLighter';
  const otherBgColor = isOther ? 'secondaryLight' : 'white';
  const otherTextColor = isOther ? 'white' : 'secondaryLighter';

  const pressGender = (type: 'Male' | 'Female' | 'Other') => {
    setGender(type);
    dispatch(updateUser({ gender: type }));
  };

  const closePriceModal = () => setIsPriceModalVisible(false);
  const closeServiceAreaModal = () => setIsServiceAreaModalVisible(false);
  const closeInterestsModal = () => setIsInterestsModalVisible(false);
  const closePersonalBioModal = () => setIsPersonalBioVisible(false);
  const closeExperienceModal = () => setIsExperienceModalVisible(false);
  const closeAreaOfSpecialtyModal = () => setIsAreaOfSpecialtyVisible(false);


  const pressStatus = (type: boolean) => {
    setAvailable(type);
    if (isAvailable) {
      dispatch(updateUser({ status: 'busy' }));
    } else {
      dispatch(updateUser({ status: 'available' }));
    }
  };

  const priceModal = (
    <ModalView
      height={200}
      isVisible={isPriceModalVisible}
      onBackdropPress={() => setIsPriceModalVisible(false)}
      onSwipeComplete={() => setIsPriceModalVisible(false)}
      handleArrowClick={() => setIsPriceModalVisible(false)}
    >
      <PriceModal
        closePriceModal={closePriceModal}
        priceSelection={priceSelection}
      />
    </ModalView>
  );

  const serviceAreaModal = (
    <ModalView
      height={200}
      isVisible={isServiceAreaModalVisible}
      onBackdropPress={() => setIsServiceAreaModalVisible(false)}
      onSwipeComplete={() => setIsServiceAreaModalVisible(false)}
      handleArrowClick={() => setIsServiceAreaModalVisible(false)}
    >
      <ServiceAreaModal
        closeServiceAreaModal={closeServiceAreaModal}
      />
    </ModalView>
  );


  const interestsModal = (
    <ModalView
      height={200}
      isVisible={isInterestsModalVisible}
      onBackdropPress={() => setIsInterestsModalVisible(false)}
      onSwipeComplete={() => setIsInterestsModalVisible(false)}
      handleArrowClick={() => setIsInterestsModalVisible(false)}
    >
      <InterestsModal
        closeInterestsModal={closeInterestsModal}
      />
    </ModalView>
  );

  const personalBio = (
    <ModalView
      height={200}
      isVisible={isPersonalBioVisible}
      onBackdropPress={() => setIsPersonalBioVisible(false)}
      onSwipeComplete={() => setIsPersonalBioVisible(false)}
      handleArrowClick={() => setIsPersonalBioVisible(false)}
    >
      <PersonalBio
        closePersonalBioModal={closePersonalBioModal}
      />
    </ModalView>
  );

  const experienceModal = (
    <ModalView
      height={200}
      isVisible={isExperienceModalVisible}
      onBackdropPress={() => setIsExperienceModalVisible(false)}
      onSwipeComplete={() => setIsExperienceModalVisible(false)}
      handleArrowClick={() => setIsExperienceModalVisible(false)}
    >
      <ExperienceModal
        closeExperienceModal={closeExperienceModal}
      />
    </ModalView>
  );

  const areaOfSpecialty = (
    <ModalView
      height={200}
      isVisible={isAreaOfSpecialtyVisible}
      onBackdropPress={() => setIsAreaOfSpecialtyVisible(false)}
      onSwipeComplete={() => setIsAreaOfSpecialtyVisible(false)}
      handleArrowClick={() => setIsAreaOfSpecialtyVisible(false)}
    >
      <AreaOfSpecialtyModal
        closeAreaOfSpecialtyModal={closeAreaOfSpecialtyModal}
      />
    </ModalView>
  );

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
            <View
              row
              width="100%"
              spacing={{ pr: 3, pb: 3 }}
              style={{ borderBottomWidth: 1, borderColor: Colors.secondaryLightest }}
            >
              <View
                flex={1}
                column
                alignCenter
                style={{ borderRightWidth: 1, borderColor: Colors.secondaryLightest }}
              >
                <View><Text variant="regularSmallGrey">30min</Text></View>
                <View
                  spacing={{ pt: 2 }}
                  onPress={() => {
                    setPriceSelection('pricePerThirtyMinutes');
                    setIsPriceModalVisible(true);
                  }}
                >
                  <Text variant="titleSecondaryLarge">
                    {user.pricePerThirtyMinutes ? `$${user.pricePerThirtyMinutes}` : 'Set'}
                  </Text>
                </View>
              </View>
              <View
                flex={1}
                column
                alignCenter
                style={{ borderRightWidth: 1, borderColor: Colors.secondaryLightest }}
              >
                <View><Text variant="regularSmallGrey">60min</Text></View>
                <View
                  spacing={{ pt: 2 }}
                  onPress={() => {
                    setPriceSelection('pricePerSixtyMinutes');
                    setIsPriceModalVisible(true);
                  }}
                >
                  <Text variant="titleSecondaryLarge">
                    {user.pricePerSixtyMinutes ? `$${user.pricePerSixtyMinutes}` : 'Set'}
                  </Text>
                </View>
              </View>
              <View column alignCenter flex={1}>
                <View><Text variant="regularSmallGrey">90min</Text></View>
                <View
                  spacing={{ pt: 2 }}
                  onPress={() => {
                    setPriceSelection('pricePerNintyMinutes');
                    setIsPriceModalVisible(true);
                  }}
                >
                  <Text variant="titleSecondaryLarge">
                    {user.pricePerNintyMinutes ? `$${user.pricePerNintyMinutes}` : 'Set'}
                  </Text>
                </View>
              </View>
            </View>
            <View row alignCenter height={65}>
              <View column flex={2}>
                <Text variant="regularSmallGrey">First time evaluation price</Text>
              </View>
              <View
                column
                flex={1}
                onPress={() => {
                  setPriceSelection('evaluationPrice');
                  setIsPriceModalVisible(true);
                }}
              >
                <Text variant="titleSecondaryLarge">
                  {user.evaluationPrice ? `$${user.evaluationPrice}` : 'Set'}
                </Text>
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
          <View
            flex={1}
            row
            variant="profileCard"
            justifyBetween
            onPress={() => setIsServiceAreaModalVisible(true)}
          >
            <View justifyCenter>
              <Text variant="boldDark">Service Area</Text>
            </View>
            <View row justifyCenter>
              <View justifyCenter>
                <Text variant="boldPrimary" spacing={{ mr: 2 }}>
                  {user.serviceArea ? `${user.serviceArea} miles` : 'add'}
                </Text>
              </View>
              <View>
                <ArrowRightIcon />
              </View>
            </View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <StatusIcon />
          </View>
          <View row flex={1} justifyBetween variant="profileCard">
            <View justifyCenter>
              <Text variant="boldDark">
                Status
              </Text>
            </View>
            <View row justifyCenter>
              <View justifyCenter>
                {isAvailable ? (
                  <Text spacing={{ mr: 2 }} variant="regularSmallSuccess">
                    Available
                  </Text>
                ) : (
                  <Text spacing={{ mr: 2 }} variant="regularSmallGrey">
                    not Available
                  </Text>
                )}
              </View>
              <View
                onPress={() => pressStatus(!isAvailable)}
              >
                <SwitchIcon isOn={isAvailable} />
              </View>
            </View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <RateIcon />
          </View>
          <View row justifyBetween flex={1} variant="profileCard">
            <View><Text variant="boldDark">Reviews</Text></View>
            <View alignCenter><Text>{reviewsNumber}</Text></View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <GenderIcon />
          </View>
          <View row variant="profileCardLast">
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
          <View column variant="profileData" onPress={() => setIsPersonalBioVisible(true)}>
            <Text variant="boldDark">Personal Bio</Text>
            <View spacing={{ pt: 2 }} width={295}>
              <Text variant="regularSmallGrey">
                {user.personalBio ? user.personalBio : 'Set Personal Bio'}
              </Text>
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <Badge2Icon />
          </View>
          <View column variant="profileData">
            <Text variant="boldDark">PT Licence Number</Text>
            <View spacing={{ pt: 2 }} width={295}>
              <Text variant="regularSmallGrey">
                {user.licenseNumber}
              </Text>
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View column variant="profileData" onPress={() => setIsExperienceModalVisible(true)}>
            <Text variant="boldDark">Years of Experience</Text>
            <View spacing={{ pt: 2 }} width={295}>
              <Text variant="regularSmallGrey">
                {user.yearsOfExperience ? user.yearsOfExperience : 'Set Years Of Experience'}
              </Text>
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View column variant="profileData" onPress={() => setIsAreaOfSpecialtyVisible(true)}>
            <Text variant="boldDark">Areas of Specialty</Text>
            <View spacing={{ pt: 2 }} width={295}>
              <Text variant="regularSmallGrey">
                {user.areaOfSpecialty ? user.areaOfSpecialty : 'Set Area Of Speciality'}
              </Text>
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <QualificationIcon />
          </View>
          <View column variant="profileDataLast">
            <Text variant="boldDark">Certifications</Text>
            {user.certifications.map((item, index) => (
              <View row flex={1} justifyBetween key={index} variant="profileData">
                <View justifyCenter>
                  <Text variant="regularSmallGrey">{item.description}</Text>
                </View>
                <View
                  alignCenter
                  spacing={{ mr: 2 }}
                  onPress={() => onPressImage(item.attachmentURI)}
                >
                  <Image width={40} height={40} uri={item.attachmentURI} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View column variant="profileDataLast" onPress={() => setIsInterestsModalVisible(true)}>
            <Text variant="boldDark">Interest</Text>
            <View spacing={{ pt: 2 }} width={295}>
              <Text variant="regularSmallGrey">
                {user.interests ? user.interests : 'Set Your Interests'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {priceModal}
      {serviceAreaModal}
      {interestsModal}
      {personalBio}
      {experienceModal}
      {areaOfSpecialty}
      {viewer}
    </View>
  );
};

export default TherapistProfile;
