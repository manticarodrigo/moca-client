/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

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

import {
  validateYearsOfExperience,
  validateServiceArea,
  validatePrice,
} from '@src/utlities/validations';

import * as Colors from '@src/styles/global/colors';

import InputModal from '@src/modals/InputModal';
import QualificationsModal from '@src/modals/QualificationsModal';

import Text from '@src/components/Text';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Button from '@src/components/Button';


import { updateUser } from '@src/store/actions/UserAction';
import useImageViewer from '@src/hooks/useImageViewer';

type TherapistProfileProps = {
  therapist?: User;
  modal?: boolean;
};


const TherapistProfile = ({ modal, therapist }: TherapistProfileProps) => {
  const { store: { user }, dispatch } = useStore();
  const { viewer, onPressImage } = useImageViewer(!modal
    ? (user.certifications ? user.certifications : [])
    : therapist.certifications);

  const [isAvailable, setAvailable] = useState(user.status ? user.status === 'available' : false);

  const [modals, setModals] = useState({
    isPricePerThirtyModalVisible: false,
    isPricePerNintyModalVisible: false,
    isPricePerSixtyModalVisible: false,
    isEvaluationPriceModalVisible: false,
    isServiceAreaModalVisible: false,
    isPersonalBioModalVisible: false,
    isExperienceModalVisible: false,
    isQualificationModalVisible: false,
  });

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

  const closeInputModal = (value: string) => setModals({ ...modals, [value]: false });

  const handleMessageTherapist = () => {};

  // eslint-disable-next-line no-shadow
  const pressStatus = (type: boolean) => {
    setAvailable(type);
    if (isAvailable) {
      dispatch(updateUser({ status: 'busy' }));
    } else {
      dispatch(updateUser({ status: 'available' }));
    }
  };

  const pricePerThirtyModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isPricePerThirtyModalVisible')}
      title="Thirty minutes Price"
      attribute="pricePerThirtyMinutes"
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isPricePerThirtyModalVisible}
    />
  );

  const pricePerSixtyModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isPricePerSixtyModalVisible')}
      title="Sixty Minutes Price"
      attribute="pricePerSixtyMinutes"
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isPricePerSixtyModalVisible}
    />
  );

  const pricePerNintyModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isPricePerNintyModalVisible')}
      title="Ninty Minutes Price"
      attribute="pricePerNintyMinutes"
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isPricePerNintyModalVisible}
    />
  );

  const evaluationPriceModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isEvaluationPriceModalVisible')}
      title="Evaluation Price"
      attribute="evaluationPrice"
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isEvaluationPriceModalVisible}
    />
  );

  const serviceAreaModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isServiceAreaModalVisible')}
      title="Service Area"
      attribute="serviceArea"
      keyboardTypeNumber
      placeHolder="service area"
      validate={validateServiceArea}
      errorText="Please enter a valid service area number"
      isModalVisible={modals.isServiceAreaModalVisible}
    />
  );

  const personalBio = (
    <InputModal
      closeInputModal={() => closeInputModal('isPersonalBioModalVisible')}
      title="Personal Bio"
      attribute="personalBio"
      placeHolder="personal bio"
      isModalVisible={modals.isPersonalBioModalVisible}
    />
  );

  const experienceModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isExperienceModalVisible')}
      title="Experience"
      attribute="yearsOfExperience"
      maxLength={2}
      keyboardTypeNumber
      placeHolder="years of experience"
      validate={validateYearsOfExperience}
      errorText="Please enter a valid number of years"
      isModalVisible={modals.isExperienceModalVisible}
    />
  );

  const qualificationsModal = (
    <QualificationsModal
      isModalVisible={modals.isQualificationModalVisible}
      closeInputModal={() => closeInputModal('isQualificationModalVisible')}
    />
  );

  return (
    <View scroll bgColor="lightGrey">
      <TouchableWithoutFeedback>
        <TouchableHighlight>
          <View flex={1}>
            <View variant="profileSection" spacing={{ mt: 2 }}>
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
                          setModals({ ...modals, isPricePerThirtyModalVisible: true });
                        } } : '')}
                      >
                        {!modal
                          ? (
                            <Text variant="titleSecondaryLarge">
                              {user.pricePerThirtyMinutes
                                ? `$${user.pricePerThirtyMinutes}` : 'Set'}
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
                          setModals({ ...modals, isPricePerSixtyModalVisible: true });
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
                          setModals({ ...modals, isPricePerNintyModalVisible: true });
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
                        setModals({ ...modals, isEvaluationPriceModalVisible: true });
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
                            {`$${therapist.evaluationPrice}`}
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
                      {...(!modal ? {
                        onPress: () => setModals({ ...modals, isServiceAreaModalVisible: true }),
                      } : '')}
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
                         Unavailable
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
                  ) : <View alignCenter><Text>{therapist.gender}</Text></View>}
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
                  {...(!modal ? {
                    onPress: () => setModals({ ...modals, isPersonalBioModalVisible: true }),
                  } : '')}
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
                  {...(!modal ? { onPress: () => setModals({ ...modals,
                    isExperienceModalVisible: true }),
                  } : '')}
                >
                  <Text variant="boldDark">Years of Experience</Text>
                  <View spacing={{ pt: 2 }} width={295}>
                    {!modal ? (
                      <Text variant="regularSmallGrey">
                        {user.yearsOfExperience
                          ? user.yearsOfExperience : 'Set Years Of Experience'}
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
                  {...(!modal ? { onPress: () => setModals({ ...modals,
                    isQualificationModalVisible: true }),
                  } : '')}
                >
                  <Text variant="boldDark">Qualifications</Text>
                  <View spacing={{ pt: 2 }} width={295}>
                    {(!modal ? user.qualifications : therapist.qualifications).map(
                      (qualifiaciton, index) => (
                        <View key={index}>
                          {qualifiaciton.value === true
                            ? (
                              <Text variant="regularSmallGrey" spacing={{ mr: 2 }}>
                                {qualifiaciton.name}
                              </Text>
                            )
                            : null}
                        </View>
                      ),
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
                    ) : (
                      <View variant="profileData">
                        <Text variant="regularSmallGrey" spacing={{ mt: 2 }}>PENDING</Text>
                      </View>
                    )
                    )
                      : therapist.certifications.map((item) => (
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
                      ))}
                  </>
                </View>
              </View>
            </View>
            {pricePerNintyModal}
            {pricePerSixtyModal}
            {pricePerThirtyModal}
            {evaluationPriceModal}
            {serviceAreaModal}
            {personalBio}
            {qualificationsModal}
            {experienceModal}
            {viewer}
            {modal && (
            <View row spacing={{ mt: 3, mb: 3, mx: 3 }}>
              <View flex={1}>
                <Button onPress={handleMessageTherapist}>
              Message / Schedule
                </Button>
              </View>
            </View>
            )}
          </View>
        </TouchableHighlight>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TherapistProfile;
