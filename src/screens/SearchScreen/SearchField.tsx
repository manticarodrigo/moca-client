import React from 'react';

import { SearchIcon, FilterIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';

const SearchField = ({ value, onChangeText, onToggleFilters }) => (
  <View bgColor="primary">
    <View row spacing={{ py: 3, px: 4 }}>
      <View flex={1} row alignCenter spacing={{ mr: 2 }} height={48} variant="rounded" bgColor="white">
        <View spacing={{ px: 3 }}><SearchIcon /></View>
        <TextInput
          typography={{ color: 'primary', weight: '700' }}
          onChangeText={onChangeText}
          placeholder="Therapists Search..."
          value={value}
        />
      </View>
      <View column onPress={onToggleFilters}>
        <FilterIcon />
      </View>
    </View>
  </View>
);

export default SearchField;
