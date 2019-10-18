import React, { useState } from 'react';

import { SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';

type Props = {
  onSearchChange: (isSearching: boolean) => void;
}

const SearchField = ({ onSearchChange }: Props) => {
  const [text, setText] = useState('');

  const onChangeText = (val: string) => {
    setText(val);

    if (text === '') {
      onSearchChange(false);
    } else {
      onSearchChange(true);
    }
  };

  return (
    <View flex={1} row height={48}>
      <View
        row
        alignCenter
        flex={1}
        spacing={{ mr: 2 }}
        variant="rounded"
        bgColor="white"
      >
        <View spacing={{ px: 3 }}>
          <SearchIcon />
        </View>
        <TextInput
          typography={{ color: 'primary', weight: '700' }}
          onChangeText={onChangeText}
          placeholder="Therapists Search..."
          value={text}
        />
      </View>
    </View>
  );
};

export default SearchField;
