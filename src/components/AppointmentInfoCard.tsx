import React, { useMemo } from 'react';
import { format, differenceInMinutes, parseISO } from 'date-fns';

import { mockImg } from '@src/services/mock';

import { openMapMarker } from '@src/utlities/maps';

import useStore from '@src/hooks/useStore';

import { Message } from '@src/store/reducers/ConversationReducer';
import { UserSnippet } from '@src/services/openapi';

import { ClockIcon, PinIcon, BookmarkBadgeIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';

type Props = {
  message: Message;
  otherUser: UserSnippet;
}

const AppointmentInfoCard = ({ message, otherUser = {} }: Props) => {
  const { store } = useStore();

  const { endTime, price, startTime, address } = message.content;

  const { duration, time } = useMemo(() => ({
    duration: differenceInMinutes(new Date(endTime), new Date(startTime)),
    time: format(new Date(parseISO(startTime)), 'MM/dd - hh:mm aaaa'),
  }), [startTime, endTime]);

  const onPressLocation = () => {
    const label = `${otherUser.firstName}'s Location`;
    const [lat, lng] = address.location.coordinates;

    openMapMarker(label, lat, lng);
  };

  return (
    <View m={3} mt={0} variant="rounded" bgColor="white">
      <View row p={3}>
        <View>
          <Image rounded size={48} uri={mockImg} />
        </View>
        <View flex={1} pl={3}>
          <View row justifyBetween>
            <Text variant="title" numberOfLines={2}>
              {`${otherUser.firstName} ${otherUser.lastName}`}
            </Text>
            <View row mt={-3}>
              <BookmarkBadgeIcon />
            </View>
          </View>
          <View row alignCenter justifyBetween pt={3}>
            <View row>
              <ClockIcon />
              <Text variant="regularSmall" ml={1}>
                {`${duration}min`}
              </Text>
            </View>
            <Text variant="titleLarge">
              {`$${price}`}
            </Text>
          </View>
        </View>
      </View>
      <View row justifyBetween variant="borderTop" p={3}>
        <View row flex={1}>
          <View column flex={1}>
            <Text variant="semiBold" color="secondary">{time}</Text>
            <Text variant="regular">{address.street}</Text>
          </View>
        </View>

        {store.user.type === 'PT' && (
          <View row>
            <View variant="iconButton" ml={2} onPress={onPressLocation}>
              <PinIcon size={0.8} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AppointmentInfoCard;
