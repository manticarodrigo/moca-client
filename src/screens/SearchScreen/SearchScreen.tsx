/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useMemo, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { getSearchResults } from '@src/store/actions/SearchAction';
import { FilterParams } from '@src/store/reducers/SearchReducer';

import View from '@src/components/View';
import Text from '@src/components/Text';

import ProfileModal from '@src/modals/ProfileModal';

import SearchField from './SearchField';
import SearchActiveFilters from './SearchActiveFilters';
import SearchCard from './SearchCard';
import SearchFilterModal, { FilterState } from './SearchFilterModal';

const SearchScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [searchText, setSearchText] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: {},
    sessionLength: {},
    gender: {},
    maxPrice: '',
    ailments: [],
  });

  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    const params: FilterParams = {};
    let gender;

    if (filters.gender.male && !filters.gender.female) {
      gender = 'M';
    }

    if (filters.gender.female && !filters.gender.male) {
      gender = 'F';
    }

    if (gender) {
      params.gender = gender;
    }

    if (filters.maxPrice) {
      params.max_price = filters.maxPrice;
    }

    if (filters.ailments.length) {
      params.ailments = filters.ailments;
    }

    if (filters.sortBy.highestRated) {
      params.avg_rating = true;
    }

    if (filters.sortBy.mostReviews) {
      params.review_count = true;
    }

    dispatch(getSearchResults(params));
  }, [filters]);

  const onPressTherapist = (id: number) => setSelectedId(id);

  const onMessageTherapist = (user: object) => {
    if (selectedId) {
      setSelectedId(undefined);
    }

    navigation.navigate('ConversationScreen', { user });
  };

  const onToggleFilters = () => setFiltersVisible(!filtersVisible);

  const onSubmitFilters = (state: FilterState) => {
    setFilters(state);
    setFiltersVisible(false);
  };

  const onSearchChange = (value: string) => setSearchText(value);

  const filteredResults = useMemo(() => {
    const normalizedNames = store.search.map(({ firstName }) => firstName.toLocaleLowerCase());
    const normalizedQuery = searchText.toLocaleLowerCase();

    return store.search.filter((_, index) => normalizedNames[index].includes(normalizedQuery));
  }, [store.search, searchText]);

  return (
    <>
      <ProfileModal
        visible={!!selectedId}
        userId={selectedId}
        onMessage={onMessageTherapist}
        onClose={() => setSelectedId(undefined)}
      />
      <SearchField
        value={searchText}
        onChangeText={onSearchChange}
        onToggleFilters={onToggleFilters}
      />
      <SearchFilterModal
        isVisible={filtersVisible}
        onClose={onSubmitFilters}
      />
      <View safeArea flex={1} bgColor="lightGrey">
        <View flex={1}>
          <FlatList
            data={filteredResults}
            ListHeaderComponent={(
              <View>
                <SearchActiveFilters filters={filters} />
                <View alignCenter>
                  <Text pt={4} p={3} variant="light">
                    There are
                    {' '}
                    <Text variant="regular">
                      {filteredResults.length}
                      {' '}
                      Therapists
                    </Text>
                    {' '}
                    in your area
                  </Text>
                </View>
              </View>
            )}
            renderItem={({ item }) => (
              <SearchCard
                {...item}
                onMessageTherapist={onMessageTherapist}
                onPressTherapist={onPressTherapist}
              />
            )}
            keyExtractor={({ id }) => id.toString()}
          />
        </View>
      </View>
    </>
  );
};

SearchScreen.navigationOptions = {
  headerTitle: 'Search',
};

export default SearchScreen;
