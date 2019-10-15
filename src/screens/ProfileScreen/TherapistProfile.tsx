/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { format, differenceInYears } from 'date-fns';

import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import { updateUser } from '@src/store/actions/UserAction';

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

import DatePicker from 'react-native-datepicker';
import useStore from '@src/hooks/useStore';

import {
  validateServiceArea,
  validatePrice,
} from '@src/utlities/validations';

import * as Colors from '@src/styles/global/colors';

import InputModal from '@src/modals/InputModal';
import QualificationsModal from '@src/modals/QualificationsModal';
import ReviewsModal from '@src/modals/ReviewsModal';

import Text from '@src/components/Text';
import View from '@src/components/View';
import Image from '@src/components/Image';
import Button from '@src/components/Button';


import useImageViewer from '@src/hooks/useImageViewer';

type TherapistProfileProps = {
  therapist?: User;
  modal?: boolean;
};


const TherapistProfile = ({ modal, therapist }: TherapistProfileProps) => {
  const { store: { user }, dispatch } = useStore();
  const userInfo = !modal ? user : therapist;


  const { viewer, onPressImage } = useImageViewer(userInfo.certifications);
  const [isAvailable, setAvailable] = useState(userInfo.status
    ? userInfo.status === 'available' : false);


  const [modals, setModals] = useState({
    isPricePerThirtyModalVisible: false,
    isPricePerNintyModalVisible: false,
    isPricePerSixtyModalVisible: false,
    isEvaluationPriceModalVisible: false,
    isServiceAreaModalVisible: false,
    isPersonalBioModalVisible: false,
    isQualificationModalVisible: false,
    isReviewsModalVisible: false,
  });

  const [gender, setGender] = useState(userInfo.gender ? userInfo.gender : '');
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

  const submitPricePerThirtyMinutes = (value: string) => {
    dispatch(updateUser({ pricePerThirtyMinutes: value }));
    setModals({ ...modals, isPricePerThirtyModalVisible: false });
  };
  const submitPricePerSixtyMinutes = (value: string) => {
    dispatch(updateUser({ pricePerSixtyMinutes: value }));
    setModals({ ...modals, isPricePerSixtyModalVisible: false });
  };
  const submitPricePerNintyMinutes = (value: string) => {
    dispatch(updateUser({ pricePerNintyMinutes: value }));
    setModals({ ...modals, isPricePerNintyModalVisible: false });
  };
  const submitEvaluationPrice = (value: string) => {
    dispatch(updateUser({ evaluationPrice: value }));
    setModals({ ...modals, isEvaluationPriceModalVisible: false });
  };
  const submitServiceArea = (value: string) => {
    dispatch(updateUser({ serviceArea: value }));
    setModals({ ...modals, isServiceAreaModalVisible: false });
  };
  const submitPersonalBio = (value: string) => {
    dispatch(updateUser({ personalBio: value }));
    setModals({ ...modals, isPersonalBioModalVisible: false });
  };


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
      title="Thirty Minutes Price"
      formFieldValue={userInfo.pricePerThirtyMinutes ? userInfo.pricePerThirtyMinutes : ''}
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isPricePerThirtyModalVisible}
      onSubmit={(value) => submitPricePerThirtyMinutes(value)}
    />
  );

  const pricePerSixtyModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isPricePerSixtyModalVisible')}
      title="Sixty Minutes Price"
      formFieldValue={userInfo.pricePerSixtyMinutes ? userInfo.pricePerSixtyMinutes : ''}
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isPricePerSixtyModalVisible}
      onSubmit={(value) => submitPricePerSixtyMinutes(value)}

    />
  );


  const pricePerNintyModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isPricePerNintyModalVisible')}
      title="Ninty Minutes Price"
      formFieldValue={userInfo.pricePerNintyMinutes ? userInfo.pricePerNintyMinutes : ''}
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isPricePerNintyModalVisible}
      onSubmit={(value) => submitPricePerNintyMinutes(value)}

    />
  );

  const reviewsModal = (
    <ReviewsModal
      isModalVisible={modals.isReviewsModalVisible}
      closeInputModal={() => closeInputModal('isReviewsModalVisible')}
    />
  );

  const evaluationPriceModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isEvaluationPriceModalVisible')}
      title="Evaluation Price"
      formFieldValue={userInfo.evaluationPrice ? userInfo.evaluationPrice : ''}
      keyboardTypeNumber
      placeHolder="price"
      validate={validatePrice}
      maxLength={3}
      errorText="Please enter a valid price"
      isModalVisible={modals.isEvaluationPriceModalVisible}
      onSubmit={(value) => submitEvaluationPrice(value)}

    />
  );

  const serviceAreaModal = (
    <InputModal
      closeInputModal={() => closeInputModal('isServiceAreaModalVisible')}
      title="Service Area"
      formFieldValue={userInfo.serviceArea ? userInfo.serviceArea : ''}
      keyboardTypeNumber
      placeHolder="service area"
      validate={validateServiceArea}
      errorText="Please enter a valid service area number"
      isModalVisible={modals.isServiceAreaModalVisible}
      onSubmit={(value) => submitServiceArea(value)}

    />
  );

  const personalBio = (
    <InputModal
      closeInputModal={() => closeInputModal('isPersonalBioModalVisible')}
      title="Personal Bio"
      formFieldValue={userInfo.personalBio ? userInfo.personalBio : ''}
      placeHolder="personal bio"
      isModalVisible={modals.isPersonalBioModalVisible}
      onSubmit={(value) => submitPersonalBio(value)}
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
                        <Text variant="titleSecondaryLarge">
                          {userInfo.pricePerThirtyMinutes
                            ? `$${userInfo.pricePerThirtyMinutes}` : modal ? 'N/A' : 'Set'}
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
                        {...(!modal ? { onPress: () => {
                          setModals({ ...modals, isPricePerSixtyModalVisible: true });
                        } } : '')}
                      >
                        <Text variant="titleSecondaryLarge">
                          {userInfo.pricePerSixtyMinutes
                            ? `$${userInfo.pricePerSixtyMinutes}` : modal ? 'N/A' : 'Set'}
                        </Text>
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
                        <Text variant="titleSecondaryLarge">
                          {userInfo.pricePerNintyMinutes
                            ? `$${userInfo.pricePerNintyMinutes}` : modal ? 'N/A' : 'Set'}
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
                      {...(!modal ? { onPress: () => {
                        setModals({ ...modals, isEvaluationPriceModalVisible: true });
                      } } : '')}
                    >
                      <Text variant="titleSecondaryLarge">
                        {userInfo.evaluationPrice
                          ? `$${userInfo.evaluationPrice}` : modal ? 'N/A' : 'Set'}
                      </Text>
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
                      onPress={() => setModals({ ...modals, isServiceAreaModalVisible: true })}
                    >
                      <View justifyCenter>
                        <Text variant="boldDark">Service Area</Text>
                      </View>
                      <View row justifyCenter>
                        <View justifyCenter>
                          <Text variant="boldPrimary" spacing={{ mr: 2 }}>
                            {userInfo.serviceArea ? `${userInfo.serviceArea} miles` : 'add'}
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
                          onPress={() => pressStatus(!isAvailable)}
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
                <View
                  row
                  justifyBetween
                  flex={1}
                  variant="profileCard"
                  {...(userInfo.reviewsNumber > 0
                    ? {
                      onPress: () => setModals({ ...modals, isReviewsModalVisible: true }),
                    } : null)}
                >
                  <View><Text variant="boldDark">Reviews</Text></View>
                  <View alignCenter>
                    <Text
                      variant="boldPrimary"
                      spacing={{ mr: 2 }}
                    >
                      {userInfo.reviewsNumber.toString()}
                    </Text>
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
                  ) : <View alignCenter><Text>{userInfo.gender}</Text></View>}
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
                    <Text variant="regularSmallGrey">
                      {userInfo.personalBio
                        ? userInfo.personalBio : modal ? 'N/A' : 'Set Personal Bio'}
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
                      {userInfo.licenseNumber}
                    </Text>
                  </View>
                </View>
              </View>

              <View row alignCenter={!modal}>
                <View spacing={{ p: 3 }}>
                  <InterestIcon />
                </View>
                <View
                  row={!modal}
                  variant="profileData"
                  alignCenter={!modal}
                  spacing={!modal ? { mt: 2 } : null}
                >
                  <View flex={1}>
                    <Text variant="boldDark">Licence date</Text>
                  </View>
                  {!modal ? (
                    <View flex={1} spacing={{ pt: 2, mb: 2, mr: 3 }}>
                      <DatePicker
                        style={{ width: 150 }}
                        date={userInfo.licenseDate ? userInfo.licenseDate : ''}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {
                          dispatch(updateUser({ licenseDate: new Date(date) }));
                        }}
                        customStyles={{
                          dateIcon: {
                            width: 0,
                            height: 0,
                          },
                        }}
                      />
                    </View>
                  )
                    : (
                      <View spacing={{ mt: 2 }}>
                        <Text variant="regularSmallGrey">
                          {format(userInfo.licenseDate, 'yyyy-MM-dd') }
                        </Text>
                      </View>
                    )}
                </View>
              </View>

              <View row>
                <View spacing={{ p: 3 }}>
                  <InterestIcon />
                </View>
                <View
                  column
                  variant="profileData"
                >
                  <Text variant="boldDark">Years of Experience</Text>
                  <View spacing={{ pt: 2 }} width={295}>
                    <Text variant="regularSmallGrey">
                      {userInfo.licenseDate
                        ? differenceInYears(new Date(), userInfo.licenseDate).toString() : 'N/A'}
                    </Text>
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
                    {(userInfo.qualifications).map(
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
                    {userInfo.certifications ? (
                      userInfo.certifications.map((item) => (
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
                    )}
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
            {viewer}
            {reviewsModal}
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
