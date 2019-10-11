/* eslint-disable no-nested-ternary */
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

type TherapistProfileProps = {
  therapist?: {
    interests?: string;
    personalBio?: string;
    yearsOfExperience?: string;
    status?: 'available' | 'busy';
    licenseNumber?: string;
    serviceArea?: string;
    areaOfSpecialty?: string;
    pricePerThirtyMinutes?: string;
    pricePerSixtyMinutes?: string;
    pricePerNintyMinutes?: string;
    evaluationPrice?: string;
    certifications?: Certification[];
    reviewsNumber?: string;
    gender?: 'Male' | 'Female' | 'Other';
  };
  modal?: boolean;
};


const TherapistProfile = ({ modal, therapist }: TherapistProfileProps) => {
  const { store: { user }, dispatch } = useStore();
  const { viewer, onPressImage } = useImageViewer(user.certifications ? user.certifications : []);
  const [isAvailable, setAvailable] = useState(user.status ? user.status === 'available' : false);

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

  const maleBgColor = isMale ? 'secondaryLight' : 'white';
  const maleTextColor = isMale ? 'white' : 'secondaryLighter';
  const femaleBgColor = isFemale ? 'secondaryLight' : 'white';
  const femaleTextColor = isFemale ? 'white' : 'secondaryLighter';
  const otherBgColor = isOther ? 'secondaryLight' : 'white';
  const otherTextColor = isOther ? 'white' : 'secondaryLighter';

  // eslint-disable-next-line no-shadow
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


  // eslint-disable-next-line no-shadow
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
                  {...(!modal ? { onPress: () => {
                    setPriceSelection('pricePerThirtyMinutes');
                    setIsPriceModalVisible(true);
                  } } : '')}
                >
                  {!modal
                    ? (
                      <Text variant="titleSecondaryLarge">
                        {user.pricePerThirtyMinutes ? `$${user.pricePerThirtyMinutes}` : 'Set'}
                      </Text>
                    )
                    : (
                      <Text variant="titleSecondaryLarge">
                        { therapist.pricePerThirtyMinutes
                          ? `$${therapist.pricePerThirtyMinutes}` : 'N/A'}
                      </Text>
                    )}
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
                  {...(!modal ? { onPress: () => {
                    setPriceSelection('pricePerSixtyMinutes');
                    setIsPriceModalVisible(true);
                  } } : '')}
                >
                  {!modal
                    ? (
                      <Text variant="titleSecondaryLarge">
                        {user.pricePerSixtyMinutes ? `$${user.pricePerSixtyMinutes}` : 'Set'}
                      </Text>
                    )
                    : (
                      <Text variant="titleSecondaryLarge">
                        { therapist.pricePerSixtyMinutes
                          ? `$${therapist.pricePerSixtyMinutes}` : 'N/A'}
                      </Text>
                    )}
                </View>
              </View>
              <View column alignCenter flex={1}>
                <View><Text variant="regularSmallGrey">90min</Text></View>
                <View
                  spacing={{ pt: 2 }}
                  {...(!modal ? { onPress: () => {
                    setPriceSelection('pricePerNintyMinutes');
                    setIsPriceModalVisible(true);
                  } } : '')}
                >
                  {!modal
                    ? (
                      <Text variant="titleSecondaryLarge">
                        {user.pricePerNintyMinutes ? `$${user.pricePerNintyMinutes}` : 'Set'}
                      </Text>
                    )
                    : (
                      <Text variant="titleSecondaryLarge">
                        { therapist.pricePerNintyMinutes
                          ? `$${therapist.pricePerNintyMinutes}` : 'N/A'}
                      </Text>
                    )}
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
                {...(!modal ? { onPress: () => {
                  setPriceSelection('evaluationPrice');
                  setIsPriceModalVisible(true);
                } } : '')}
              >
                {!modal
                  ? (
                    <Text variant="titleSecondaryLarge">
                      {user.evaluationPrice ? `$${user.evaluationPrice}` : 'Set'}
                    </Text>
                  )
                  : (
                    <Text variant="titleSecondaryLarge">
                      {therapist.evaluationPrice ? `$${user.evaluationPrice}` : 'N/A'}
                    </Text>
                  )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View variant="profileSection">
        {!modal
          ? (
            <View row alignCenter>
              <View spacing={{ p: 3 }}>
                <RadiusLocationIcon />
              </View>
              <View
                flex={1}
                row
                variant="profileCard"
                justifyBetween
                {...(!modal ? { onPress: () => setIsServiceAreaModalVisible(true) } : '')}
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
          )
          : null}
        {!modal
          ? (
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
                    {...(!modal ? { onPress: () => pressStatus(!isAvailable) } : '')}
                  >
                    <SwitchIcon isOn={isAvailable} />
                  </View>
                </View>
              </View>
            </View>
          )
          : null}

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <RateIcon />
          </View>
          <View row justifyBetween flex={1} variant="profileCard">
            <View><Text variant="boldDark">Reviews</Text></View>
            <View alignCenter>
              {!modal
                ? (
                  <Text
                    variant="boldPrimary"
                    spacing={{ mr: 2 }}
                  >
                    {user.reviewsNumber}
                  </Text>
                )
                : (
                  <Text
                    variant="boldPrimary"
                    spacing={{ mr: 2 }}
                  >
                    {therapist.reviewsNumber}

                  </Text>
                )}
            </View>
          </View>
        </View>

        <View row alignCenter>
          <View spacing={{ p: 3 }}>
            <GenderIcon />
          </View>
          <View row flex={1} justifyBetween={modal} variant="profileCardLast">
            <View flex={1}><Text variant="boldDark">Gender</Text></View>
            {!modal ? (
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
            ) : <View alignCenter><Text>{therapist.gender ? therapist.gender : 'N/A'}</Text></View>}
          </View>
        </View>
      </View>
      <View variant="profileSection">
        <View row>
          <View spacing={{ p: 3 }}>
            <BioIcon />
          </View>
          <View
            column
            variant="profileData"
            {...(!modal ? { onPress: () => setIsPersonalBioVisible(true) } : '')}
          >
            <Text variant="boldDark">Personal Bio</Text>
            <View spacing={{ pt: 2 }} width={295}>
              {!modal
                ? (
                  <Text variant="regularSmallGrey">
                    {user.personalBio ? user.personalBio : 'Set Personal Bio'}
                  </Text>
                )
                : (
                  <Text variant="regularSmallGrey">
                    {therapist.personalBio ? therapist.personalBio : 'N/A'}
                  </Text>
                )}
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
              {!modal
                ? (
                  <Text variant="regularSmallGrey">
                    {user.licenseNumber}
                  </Text>
                )
                : (
                  <Text variant="regularSmallGrey">
                    {therapist.licenseNumber}
                  </Text>
                )}
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View
            column
            variant="profileData"
            {...(!modal ? { onPress: () => setIsExperienceModalVisible(true) } : '')}
          >
            <Text variant="boldDark">Years of Experience</Text>
            <View spacing={{ pt: 2 }} width={295}>
              {!modal ? (
                <Text variant="regularSmallGrey">
                  {user.yearsOfExperience ? user.yearsOfExperience : 'Set Years Of Experience'}
                </Text>
              )
                : (
                  <Text variant="regularSmallGrey">
                    {therapist.yearsOfExperience ? therapist.yearsOfExperience : 'N/A'}
                  </Text>
                )}
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View
            column
            variant="profileData"
            {...(!modal ? { onPress: () => setIsAreaOfSpecialtyVisible(true) } : '')}
          >
            <Text variant="boldDark">Areas of Specialty</Text>
            <View spacing={{ pt: 2 }} width={295}>
              {!modal ? (
                <Text variant="regularSmallGrey">
                  {user.areaOfSpecialty ? user.areaOfSpecialty : 'Set Area Of Speciality'}
                </Text>
              )
                : (
                  <Text variant="regularSmallGrey">
                    {therapist.areaOfSpecialty ? therapist.areaOfSpecialty : 'N/A'}
                  </Text>
                )}
            </View>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <QualificationIcon />
          </View>
          <View column variant="profileDataLast">
            <Text variant="boldDark">Certifications</Text>
            <>
              {!modal ? (user.certifications ? (
                user.certifications.map((item) => (
                  <View
                    key={item.id}
                    row
                    flex={1}
                    alignCenter
                    justifyBetween
                    variant="profileData"
                  >
                    <View justifyCenter>
                      <Text variant="regularSmallGrey">{item.description}</Text>
                    </View>
                    <View
                      justifyCenter
                      spacing={{ mr: 4 }}
                      onPress={() => onPressImage(item.attachmentURI)}
                    >
                      <Image width={40} height={40} uri={item.attachmentURI} />
                    </View>
                  </View>
                ))
              ) : <Text variant="regularSmallGrey" spacing={{ mr: 2 }}>PENDING</Text>
              ) : therapist.certifications ? (
                therapist.certifications.map((item) => (
                  <View
                    key={item.id}
                    row
                    flex={1}
                    alignCenter
                    justifyBetween
                    variant="profileData"
                  >
                    <View justifyCenter>
                      <Text variant="regularSmallGrey">{item.description}</Text>
                    </View>
                    <View
                      justifyCenter
                      spacing={{ mr: 4 }}
                      onPress={() => onPressImage(item.attachmentURI)}
                    >
                      <Image width={40} height={40} uri={item.attachmentURI} />
                    </View>
                  </View>
                ))
              ) : <Text variant="regularSmallGrey" spacing={{ mr: 2 }}>PENDING</Text>}
            </>
          </View>
        </View>

        <View row>
          <View spacing={{ p: 3 }}>
            <InterestIcon />
          </View>
          <View
            column
            variant="profileDataLast"
            {...(!modal ? { onPress: () => setIsInterestsModalVisible(true) } : '')}
          >
            <Text variant="boldDark">Interest</Text>
            <View spacing={{ pt: 2 }} width={295}>
              {!modal ? (
                <Text variant="regularSmallGrey">
                  {user.interests ? user.interests : 'Set Your Interests'}
                </Text>
              )
                : (
                  <Text variant="regularSmallGrey">
                    {therapist.interests ? therapist.interests : 'N/A'}
                  </Text>
                )}
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
