import React, { useState, useMemo, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { getSearchResults } from '@src/store/actions/SearchAction';

import View from '@src/components/View';
import Text from '@src/components/Text';

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
} from '@src/components/icons';


import SearchField from './SearchField';
import SearchCard from './SearchCard';
import SearchFilterModal, { FilterState } from './SearchFilterModal';

const filtersConfig = {
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

const SearchScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    sortBy: {},
    sessionLength: {},
    gender: {},
    desiredCost: {
      maxPrice: '',
    },
    ailments: [],
  });

  const [filtersVisible, setFiltersVisible] = useState(false);


  useEffect(() => {
    dispatch(getSearchResults());
  }, []);

  const onMessageTherapist = () => {
    // navigate to therapist chat screen.
  };


  const onToggleFilters = () => setFiltersVisible(!filtersVisible);

  const onSubmitFilters = (state: FilterState) => {
    setFilters(state);
    setFiltersVisible(false);
  };

  const onSearchChange = (value: string) => setSearchText(value);

  const filteredResults = useMemo(() => {
    const normalizedNames = store.search.map(({ name }) => name.toLocaleLowerCase());
    const normalizedQuery = searchText.toLocaleLowerCase();

    return store.search.filter((_, index) => normalizedNames[index].includes(normalizedQuery));
  }, [store.search, searchText]);

  return (
    <>
      <SearchField
        value={searchText}
        onChangeText={onSearchChange}
        onToggleFilters={onToggleFilters}
      />
      <View safeArea flex={1}>
        {!!filters && (
          <View row wrap bgColor="white" spacing={{ p: 4 }}>
            {/* {selectedFiltersIcons} */}
          </View>
        )}
        <View bgColor="lightGrey" flex={1}>
          <FlatList
            data={filteredResults}
            ListHeaderComponent={(
              <View alignCenter>
                <Text variant="light" spacing={{ pt: 4, p: 3 }}>
                  There are
                  {' '}
                  <Text variant="regular">23 Therapists</Text>
                  {' '}
                  in your area
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <SearchCard {...item} onMessageTherapist={onMessageTherapist} />
            )}
            keyExtractor={({ id }) => id}
          />
        </View>
        <SearchFilterModal
          isVisible={filtersVisible}
          onClose={onSubmitFilters}
        />
      </View>
    </>
  );
};

SearchScreen.navigationOptions = {
  headerTitle: 'Search',
};

export default SearchScreen;
