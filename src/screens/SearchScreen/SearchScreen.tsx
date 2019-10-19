import React, { useState, useMemo, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import useStore from '@src/hooks/useStore';
import { getSearchResults } from '@src/store/actions/SearchAction';

import View from '@src/components/View';
import Text from '@src/components/Text';

import SearchField from './SearchField';
import SearchActiveFilters from './SearchActiveFilters';
import SearchCard from './SearchCard';
import SearchFilterModal, { FilterState } from './SearchFilterModal';

const SearchScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const { store, dispatch } = useStore();
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    sortBy: {},
    sessionLength: {},
    gender: {},
    maxPrice: '',
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
        <View bgColor="lightGrey" flex={1}>
          <FlatList
            data={filteredResults}
            ListHeaderComponent={(
              <View>
                <SearchActiveFilters filters={filters} />
                <View alignCenter>
                  <Text variant="light" spacing={{ pt: 4, p: 3 }}>
                    There are
                    {' '}
                    <Text variant="regular">23 Therapists</Text>
                    {' '}
                    in your area
                  </Text>
                </View>
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
