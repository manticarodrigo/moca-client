import React, { useEffect, useMemo } from 'react';
import { SectionList } from 'react-native';
import { format, differenceInMinutes } from 'date-fns';

import { Appointment } from '@src/store/reducers/AppointmentReducer';
import { getFinishedAppointments, getPastAppointments } from '@src/store/actions/AppointmentAction';

import useStore from '@src/hooks/useStore';
import useDateSections from '@src/hooks/useDateSections';

import { ClockIcon, CreditCardIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';

const BillingSectionList: SectionList<Appointment> = SectionList;

const BillingHistoryTab = ({ visible }) => {
  const { store, dispatch } = useStore();

  const sections = useDateSections(store.appointments.past, ({ endTime }) => endTime, true);

  useEffect(() => {
    if (visible) {
      dispatch(getFinishedAppointments());
      dispatch(getPastAppointments());
    }
  }, [visible]);

  const composedSections = useMemo(() => {
    const composed = [];
    if (store.appointments.finished.length) {
      composed.push({
        title: 'Recently Finished',
        data: store.appointments.finished,
      });
    }
    return composed.concat(sections);
  }, [store.appointments.finished, sections]);

  if (!visible) return null;

  return (
    <BillingSectionList
      sections={composedSections}
      renderItem={(({ item }) => {
        const { startTime, endTime, otherParty, price } = item;
        const startDate = new Date(startTime);
        const day = format(startDate, 'dd');
        const month = format(startDate, 'MM');
        const year = format(startDate, 'yyyy');

        const therapist = `${otherParty.firstName} ${otherParty.lastName}`;
        const duration = `${differenceInMinutes(new Date(endTime), new Date(startTime))} mins`;
        const paymentMethod = 'Primary Card';
        const payment = `$${price}`;

        return (
          <View key={item.id} row py={3} variant="borderBottom">
            <View column justifyCenter px={3} variant="borderRight">
              <Text variant="light" size={5} color="secondary" align="center">{day}</Text>
              <Text variant="regular" color="secondary">
                {`${month} / ${year}`}
              </Text>
            </View>
            <View flex={1} column justifyEnd px={3} variant="borderRight">
              <Text ml={2} variant="semiBoldLarge">{therapist}</Text>
              <View flex={1} my={2} row wrap>
                <View row alignCenter m={1}>
                  <ClockIcon />
                  <Text mx={1} variant="regular">{duration}</Text>
                </View>
                <View row alignCenter m={1}>
                  <CreditCardIcon />
                  <Text mx={1} variant="regular">{paymentMethod}</Text>
                </View>
              </View>
            </View>
            <View justifyCenter px={4}>
              <Text variant="title">{payment}</Text>
            </View>
          </View>
        );
      })}
      renderSectionHeader={({ section }) => (
        <View ml={3} py={3}>
          <Text variant="regular">
            {section.title.charAt(0).toUpperCase() + section.title.slice(1)}
          </Text>
        </View>
      )}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default BillingHistoryTab;
