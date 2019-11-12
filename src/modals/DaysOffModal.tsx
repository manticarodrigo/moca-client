import React from 'react';
import { FlatList } from 'react-native';
import { format } from 'date-fns';

import { ScheduleSectionIcon } from '@src/components/icons';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import { UserState } from '@src/store/reducers/UserReducer';

type Props = {
  visible: boolean;
  therapist: UserState;
  onClose: () => void;
}

const DaysOffModal = ({ visible, therapist, onClose }: Props) => {
  const sorted = therapist.awayDays.sort(
    (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
  );

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      onToggle={onClose}
    >
      <View width="100%">
        <View row>
          <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
            <Text variant="semiBoldLarge">
              Days Off
            </Text>
          </View>
        </View>
        <FlatList
          data={sorted}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => {
            const { startDate, endDate } = item;
            const start = new Date(startDate);
            const end = new Date(endDate);

            const startTime = format(start, 'hh:mm aaaa');
            const endTime = format(end, 'hh:mm aaaa');

            const startStr = format(start, 'MMM d, yyyy');
            const endStr = format(end, 'MMM d, yyyy');

            return (
              <View
                row
                justifyBetween
                alignCenter
                p={3}
                variant="borderBottom"
                bgColor="white"
              >
                <View row>
                  <ScheduleSectionIcon />
                  <View justifyBetween ml={2}>
                    <Text variant="regularSmall" color="secondary">{startTime}</Text>
                    <Text variant="regularSmall" color="secondary">{endTime}</Text>
                  </View>
                  <View justifyCenter ml={2}>
                    <Text ml={2} variant="regular">
                      {`${startStr} - ${endStr}`}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default DaysOffModal;
