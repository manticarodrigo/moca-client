import React, { useState, useMemo } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Rating from '@src/components/Rating';
import Button from '@src/components/Button';

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
  ClockIcon,
} from '@src/components/icons';

import FiltersModal from '@src/modals/FiltersModal';

import SearchField from './SearchField';

const _randomIntInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const initialResults = Array.from({ length: 56 }, (_, i) => {
  const names = ['John', 'Mary', 'Tim', 'Sally', 'Joe'];
  const index = _randomIntInRange(0, names.length - 1);

  return {
    id: i.toString(),
    name: `${names[index]} Doe`,
    rating: '5',
    sessionDuration: '45',
    sessionPrice: '100',
    experience: '5',
    licenseNumber: '4675934',
  };
});

const SearchScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState(initialResults);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFiltersIcons, setSelectedFiltersIcons] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const filters = {
    Lowest: <LowestPriceIcon focused={false} />,
    Most: <MostReviewedIcon focused={false} />,
    Highest: <HighestRatedIcon focused={false} />,
    Morning: <MorningIcon focused={false} />,
    Afternoon: <AfternoonIcon focused={false} />,
    Evening: <EveningIcon focused={false} />,
    Female: <FemaleIcon focused={false} />,
    Male: <MaleIcon focused={false} />,
    Either: <BothGendersIcon focused={false} />,
  };

  const onMessageTherapist = () => {
    // navigate to therapist chat screen.
  };

  const getActiveFilters = (selectedFiltersNames) => {
    const newSelectedFiltersIcons = [...selectedFiltersIcons];
    if (selectedFiltersNames) {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }

    Object.keys(selectedFiltersNames).forEach((filter) => {
      if (filters[filter]) {
        newSelectedFiltersIcons.push(filters[filter]);
      }
    });

    setSelectedFiltersIcons(newSelectedFiltersIcons);
  };

  const onToggleFilters = () => setIsVisible(!isVisible);

  const onSearchChange = (value: string) => setSearchText(value);

  const filteredResults = useMemo(() => {
    const normalizedNames = searchResults.map(({ name }) => name.toLocaleLowerCase());
    const normalizedQuery = searchText.toLocaleLowerCase();

    return searchResults.filter((_, index) => normalizedNames[index].includes(normalizedQuery));
  }, [searchResults, searchText]);

  return (
    <>
      <SearchField
        value={searchText}
        onChangeText={onSearchChange}
        onToggleFilters={onToggleFilters}
      />
      <View safeArea flex={1}>
        {showFilters && (
          <View row wrap bgColor="white" spacing={{ p: 4 }}>
            {selectedFiltersIcons}
          </View>
        )}
        <View bgColor="lightGrey" flex={1}>
          <FlatList
            data={filteredResults}
            ListHeaderComponent={(
              <View alignCenter>
                <Text variant="light" spacing={{ p: 3 }}>
                  There are
                  {' '}
                  <Text variant="regular">23 Therapists</Text>
                  {' '}
                  in your area
                </Text>
              </View>
            )}
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
                <View spacing={{ my: 2, p: 4 }} bgColor="white">
                  <View row justifyBetween>
                    <View row>
                      <Image rounded size={58} />
                      <View spacing={{ p: 2 }}>
                        <Text variant="titleSmall" spacing={{ mx: 3 }}>{name}</Text>
                        <Rating rate={rating} spacing={{ mx: 3 }} />
                      </View>
                    </View>
                    <View alignEnd spacing={{ py: 2 }}>
                      <View row>
                        <ClockIcon />
                        <Text variant="regular" spacing={{ ml: 2 }}>
                          {sessionDuration}
                          {' '}
                          mins
                        </Text>
                      </View>
                      <Text variant="titlePrimary" spacing={{ mt: 2 }}>
                        $

                        {sessionPrice}
                      </Text>
                    </View>
                  </View>
                  <View row justifyEnd spacing={{ mt: 1, mr: 5 }}>
                    <View variant="borderTopAndRight" spacing={{ py: 2, pl: 3, pr: 5 }}>
                      <Text variant="regularSmallGrey">
                        {experience}
                        {' '}
                        year of experience
                      </Text>
                    </View>
                    <View variant="borderTop" spacing={{ py: 2, px: 3 }}>
                      <Text variant="regularSmallGrey">
                        {licenseNumber}
                      </Text>
                    </View>
                  </View>
                  <Button variant="secondary" spacing={{ my: 2, mx: 6 }} onPress={onMessageTherapist}>
                    Message / Schedule
                  </Button>
                </View>
              );
            }}
            keyExtractor={({ id }) => id}
          />
        </View>
        <FiltersModal isVisible={isVisible} onToggle={onToggleFilters} onFilter={getActiveFilters} />
      </View>
    </>
  );
};

SearchScreen.navigationOptions = {
  headerTitle: 'Search',
};

export default SearchScreen;
