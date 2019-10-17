import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { format, addMinutes } from 'date-fns';

import { mockImg } from '@src/services/mock';

import { ScheduleSectionIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Modal from '@src/components/Modal';
import Tag from '@src/components/Tag';

const ScheduleDateModal = ({ selectedDate, onClose }) => {
  const { timestamp = new Date() } = selectedDate || {};

  const { dayOfMonth, monthAndYear, dayOfWeek } = useMemo(() => ({
    dayOfMonth: format(timestamp, 'dd'),
    monthAndYear: format(timestamp, 'MMM yyyy'),
    dayOfWeek: format(timestamp, 'cccc'),
  }), [timestamp]);

  const data = [
    {
      id: '1',
      name: 'Jane Doe',
      start: 1570566600,
      duration: 45,
      earnings: 60,
      reportTimeLeft: 6,
    },
    {
      id: '2',
      name: 'John Smith',
      start: 1570570328,
      duration: 30,
      earnings: 120,
      reportTimeLeft: 16,
    },
  ];

  const total = data.reduce((acc, { earnings }) => acc + earnings, 0);

  return (
    <Modal
      isVisible={!!selectedDate}
      onToggle={onClose}
      bgColor="lightGrey"
    >
      <View column flex={1} width="100%">
        <View row justifyBetween spacing={{ p: 3 }}>
          <View row>
            <Text variant="titlePrimaryLarge">{dayOfMonth}</Text>
            <View column spacing={{ ml: 2 }}>
              <Text variant="lightPrimarySmallest">{monthAndYear}</Text>
              <Text variant="regularPrimary">{dayOfWeek}</Text>
            </View>
          </View>
          <Tag icon="dollar" type="fill" placeholder={total} />
        </View>
        <View column flex={1} bgColor="white">
          <FlatList
            data={data}
            renderItem={({ item }) => {
              const { name, start, duration, earnings, reportTimeLeft } = item;
              const startFormatted = format(start, 'hh:mm aaaa');
              const endFormatted = format(addMinutes(start, duration), 'hh:mm aaaa');

              return (
                <View variant="borderBottom" row justifyBetween alignCenter spacing={{ p: 3 }}>
                  <View row>
                    <ScheduleSectionIcon />
                    <View column justifyBetween spacing={{ ml: 2 }}>
                      <Text variant="regularSecondary">{startFormatted}</Text>
                      <Text variant="regularSecondary">{endFormatted}</Text>
                    </View>
                    <View row alignCenter spacing={{ ml: 2 }}>
                      <Image rounded size={36} uri={mockImg} />
                      <Text variant="titleSmallDark" spacing={{ ml: 2 }}>{name}</Text>
                    </View>
                  </View>
                  <View column>
                    <Tag icon="report" type="borderLight" placeholder={`${reportTimeLeft}h`} />
                    <Tag icon="dollar" type="fill" placeholder={earnings} spacing={{ mt: 2 }} />
                  </View>
                </View>
              );
            }}
            keyExtractor={({ id }) => id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ScheduleDateModal;
