import React from 'react';

import { SearchIcon, FilterIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';

const SearchField = ({ value, onChangeText, onToggleFilters }) => (
  <View bgColor="primary">
    <View row py={3} px={4}>
      <View
        row
        alignCenter
        flex={1}
        mr={2}
        height={48}
        variant="rounded"
        bgColor="white"
      >
        <View px={3}><SearchIcon /></View>
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
