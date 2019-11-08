import React, { useMemo, useState } from 'react';
import { differenceInMinutes } from 'date-fns';

import { mockImg } from '@src/services/mock';

import { UserState } from '@src/store/reducers/UserReducer';
import { Appointment } from '@src/store/reducers/AppointmentReducer';

import ProfileModal from '@src/modals/ProfileModal';

import { ClockIcon, InfoIcon } from '@src/components/icons';

import Image from './Image';
import View from './View';
import Text from './Text';
import Rating from './Rating';

type Props = {
  minimal?: boolean;
  upcoming?: boolean;
  showInfo?: boolean;
  isTherapist: boolean;
  appointment: Appointment;
  onMessageUser?: (user: UserState) => void;
  children?: JSX.Element | JSX.Element[];
}

const AppointmentHeader = ({
  minimal,
  upcoming,
  showInfo,
  isTherapist,
  appointment,
  onMessageUser,
  children,
}: Props) => {
  const [profileVisible, setProfileVisible] = useState(false);

  const { price = '', review, startTime, endTime, otherParty } = appointment || {};
  const { id, firstName = '', lastName = '' } = otherParty || {};
  const { rating } = review || {};

  const { userId, name = '', duration = '' } = useMemo(() => ({
    name: `${firstName || ''} ${lastName || ''}`,
    duration: differenceInMinutes(new Date(endTime), new Date(startTime)),
    userId: id,
  }), [startTime, endTime, id, firstName, lastName]);

  const toggleProfile = () => setProfileVisible(!profileVisible);

  const handleMessageUser = (user: UserState) => {
    if (profileVisible) {
      setProfileVisible(false);
    }

    onMessageUser(user);
  };

  return (
    <>
      {onMessageUser && (
        <ProfileModal
          userId={profileVisible && userId}
          visible={profileVisible}
          onMessage={handleMessageUser}
          onClose={toggleProfile}
        />
      )}

      <View row flex={1}>
        <View onPress={onMessageUser && toggleProfile}>
          <Image rounded size={48} uri={mockImg} />
          {showInfo && (
            <View width={48} height={48} justifyCenter alignCenter>
              <InfoIcon />
            </View>
          )}
        </View>
        <View flex={1} spacing={{ pl: 3 }}>
          <View row justifyBetween>
            <Text variant={upcoming ? 'semiBold' : 'title'} numberOfLines={2}>
              {name}
            </Text>
            <View row>
              <ClockIcon />
              <Text variant="regular" size={1} ml={1}>
                {`${duration}min`}
              </Text>
            </View>
          </View>

          {!minimal && (
            <View
              row
              justifyEnd={isTherapist}
              justifyBetween={!isTherapist}
              spacing={{ py: 1 }}
            >
              {!isTherapist && <Rating rating={rating} spacing={{ mt: -3 }} />}
              <Text variant="titleLarge">
                {`$${price}`}
              </Text>
            </View>
          )}
          <>
            {children}
          </>
        </View>
      </View>
    </>
  );
};

export default React.memo(AppointmentHeader);
