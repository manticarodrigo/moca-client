import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/core';

import { FilterIcon, SearchIcon } from '@src/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import TextInput from '@src/components/TextInput';

const DashboardSearch = ({ name }: { name: string }) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  const onChangeText = (val: string) => setText(val);
  const onPressSearch = () => setText('');
  const onPressFilter = () => navigation.navigate('FilterScreen');

  return (
    <View column>
      <View column spacing={{ px: 4, pt: 5 }}>
        <Text variant="titleSmallWhite">{`Hi, ${name}`}</Text>
      </View>
      <View row spacing={{ px: 4, my: 4 }} height={48}>
        <View
          variant="rounded"
          flex={1}
          row
          alignCenter
          bgColor="lightGrey"
        >
          <View spacing={{ px: 3 }} onPress={onPressSearch}>
            <SearchIcon />
          </View>
          <TextInput
            variant="search"
            typography={{ color: 'primary', weight: '700' }}
            onChangeText={onChangeText}
            placeholder="Therapists Search..."
            value={text}
          />
        </View>
        <View column spacing={{ pl: 2 }} onPress={onPressFilter}>
          <FilterIcon />
        </View>
      </View>
    </View>
  );
};

export default DashboardSearch;
