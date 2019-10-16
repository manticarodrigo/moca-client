import React, { useEffect, useState } from 'react';
import { Modal, Keyboard, FlatList } from 'react-native';

import useStore from '@src/hooks/useStore';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';

import AppointmentRequestCard from '@src/components/MessagingCards/AppointmentRequestCard';

import {
  LowestPriceIcon,
  MorningIcon,
  AfternoonIcon,
  EveningIcon,
  MostReviewedIcon,
  HighestRatedIcon,
  MaleIcon,
  FemaleIcon,
  BothGendersIcon,
  LogoIcon,
  ClockIcon,
} from '@src/components/icons';

import ModalView from '@src/components/ModalView';
import FilterScreen from '@src/screens/FilterScreen';
import DashboardSearch from './DashboardSearch';
import DashboardAlert from './DashboardAlert';
import DashboardAppointments from './DashboardAppointments';
import DashboardLinks from './DashboardLinks';

const DashboardScreen = () => {
  const { store } = useStore();
  const [isTherapist] = useState(store.user.type === 'patient');
  const [isActivated] = useState(true);
  const [isFiltering, setFiltering] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFiltersIcons, setSelectedFiltersIcons] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const filters = {
    'Lowest': <LowestPriceIcon focused={false} />,
    'Most': <MostReviewedIcon focused={false} />,
    'Highest': <HighestRatedIcon focused={false} />,
    'Morning': <MorningIcon focused={false} />,
    'Afternoon': <AfternoonIcon focused={false} />,
    'Evening': <EveningIcon focused={false} />,
    'Female': <FemaleIcon focused={false} />,
    'Male': <MaleIcon focused={false} />,
    'Either': <BothGendersIcon focused={false} />,
  };

  const SearchResults = [
    {
      id: '1',
      name: 'John Denver',
      rating: '4',
      sessionDuration: '60',
      sessionPrice: '40',
      experience: '8',
      licenseNumber: '4675934',
    },
    {
      id: '2',
      name: 'John Doe',
      rating: '2',
      sessionDuration: '30',
      sessionPrice: '60',
      experience: '2',
      licenseNumber: '4675934',
    },
    {
      id: '3',
      name: 'John Doe',
      rating: '5',
      sessionDuration: '45',
      sessionPrice: '100',
      experience: '5',
      licenseNumber: '4675934',
    },
  ];

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setFiltering(true));
    Keyboard.addListener('keyboardDidHide', () => setFiltering(false));

    return Keyboard.removeAllListeners;
  }, []);

  const handleFiltering = (value: boolean) => setFiltering(value);

  const handleButtonPress = () => {
    // navigate to therapist chat screen.
  };

  const getActiveFilters = (selectedFiltersNames) => {
    const newSelectedFiltersIcons = [...selectedFiltersIcons];
    if (selectedFiltersNames) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }

    for (const filter in selectedFiltersNames) {
      if (filters[filter]) {
        newSelectedFiltersIcons.push(filters[filter]);
      }
    }
    setSelectedFiltersIcons(newSelectedFiltersIcons);
  };

  const handleModalVisibility = () => setIsVisible(!isVisible);

  return (
    <View safeArea flex={1} bgColor="primary">
      <View row justifyEnd absoluteFill spacing={{ mt: -6, mr: -5 }}>
        <LogoIcon size={2} />
      </View>

      {isActivated && isTherapist && (
        <View row justifyCenter alignCenter spacing={{ p: 4, pt: 3 }}>
          <Text variant="titleSmallWhite">Appointments</Text>
        </View>
      )}
      {!isTherapist
        && (
          <DashboardSearch
            name={store.user.username}
            handleFiltering={handleFiltering}
            handleModalVisibility={handleModalVisibility}
          />
        )}

      {!isFiltering && (
        <View scroll flex={1}>
          {!isActivated && isTherapist && <DashboardAlert />}
          {(!isTherapist || isActivated) && <DashboardAppointments isTherapist={isTherapist} />}
          <DashboardLinks isActivated={isActivated} isTherapist={isTherapist} />
        </View>
      )}
      {showFilters && (
        <View row wrap bgColor="white" spacing={{ p: 4 }}>
          {selectedFiltersIcons}
        </View>
      )}
      {isFiltering && (
        <View bgColor="lightGrey" flex={1}>
          <FlatList
            data={SearchResults}
            ListHeaderComponent={
              <View alignCenter>
                <Text variant="light" spacing={{ p: 3 }}>
                  There are
                {' '}
                  <Text variant="regular">23 Therapists</Text>
                  {' '}
                  in your area
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const {
                name,
                rating,
                sessionDuration,
                sessionPrice,
                experience,
                licenseNumber,
              } = item;

              return (
                // <View spacing={{ my: 2, p: 4 }} bgColor="white">
                //   <View row justifyBetween>
                //     <View row>
                //       <Image rounded size={58} />
                //       <View spacing={{ p: 2 }}>
                //         <Text variant="titleSmall" spacing={{ mx: 3 }}>{name}</Text>
                //         <Rating rate={rating} spacing={{ mx: 3 }} />
                //       </View>
                //     </View>
                //     <View alignEnd spacing={{ py: 2 }}>
                //       <View row>
                //         <ClockIcon />
                //         <Text variant="regular" spacing={{ ml: 2 }}>
                //           {sessionDuration}
                //           {' '}
                //           mins
                //         </Text>
                //       </View>
                //       <Text variant="titlePrimary" spacing={{ mt: 2 }}>
                //         $
                //         {''}
                //         {sessionPrice}
                //       </Text>
                //     </View>
                //   </View>
                //   <View row justifyEnd spacing={{ mt: 1, mr: 5 }}>
                //     <View variant="borderTopAndRight" spacing={{ py: 2, pl: 3, pr: 5 }}>
                //       <Text variant="regularSmallGrey">
                //         {experience}
                //         {' '}
                //         year of experience
                //       </Text>
                //     </View>
                //     <View variant="borderTop" spacing={{ py: 2, px: 3 }}>
                //       <Text variant="regularSmallGrey">
                //         {licenseNumber}
                //       </Text>
                //     </View>
                //   </View>
                //   <Button variant="secondary" spacing={{ my: 2, mx: 6 }} onPress={handleButtonPress}>Message / Schedule</Button>
                // </View>
                <AppointmentRequestCard isPatient />
              );
            }}
            keyExtractor={({ id }) => id}
          />
        </View>
      )}
      <ModalView isVisible={isVisible} handleArrowClick={handleModalVisibility} onBackdropPress={handleModalVisibility}>
        <View>
          <View flex={1}>
            <FilterScreen getActiveFilters={getActiveFilters} />
          </View>
        </View>
      </ModalView>

    </View>
  );
};

DashboardScreen.navigationOptions = {
  header: null,
};

export default DashboardScreen;
