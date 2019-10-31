import React, { useMemo } from 'react';
import { differenceInMinutes } from 'date-fns';

import { mockImg } from '@src/services/mock';

import { Appointment } from '@src/store/reducers/AppointmentReducer';

import { ClockIcon, InfoIcon } from '@src/components/icons';

import Image from './Image';
import View from './View';
import Text from './Text';
import Rating from './Rating';

type Props = {
  upcoming?: boolean;
  showInfo?: boolean;
  isTherapist: boolean;
  appointment: Appointment;
  children?: JSX.Element | JSX.Element[];
}

const AppointmentHeader = ({ upcoming, showInfo, isTherapist, appointment, children }: Props) => {
  const { price = '', review, startTime, endTime, otherParty } = appointment || {};
  const { firstName = '', lastName = '' } = otherParty || {};
  const { rating } = review || {};

  const { name = '', duration = '' } = useMemo(() => ({
    name: `${firstName || ''} ${lastName || ''}`,
    duration: differenceInMinutes(new Date(endTime), new Date(startTime)),
  }), [startTime, endTime, firstName, lastName]);

  return (
    <View row flex={1}>
      <View>
        <Image rounded size={48} uri={mockImg} />
        {showInfo && (
          <View width={48} height={48} justifyCenter alignCenter>
            <InfoIcon />
          </View>
        )}
      </View>
      <View flex={1} spacing={{ pl: 3 }}>
        <View row justifyBetween>
          <Text variant={upcoming ? 'titleSmall' : 'title'} numberOfLines={2}>
            {name}
          </Text>
          <View row>
            <ClockIcon />
            <Text variant="regularSmall" spacing={{ ml: 1 }}>
              {`${duration}min`}
            </Text>
          </View>
        </View>
        <View
          row
          justifyEnd={isTherapist}
          justifyBetween={!isTherapist}
          spacing={{ py: 1 }}
        >
          {!isTherapist && <Rating rating={rating} spacing={{ mt: -3 }} />}
          <Text variant="titlePrimaryLarge">
            {`$${price}`}
          </Text>
        </View>
        <>
          {children}
        </>
      </View>
    </View>
  );
};

export default AppointmentHeader;
