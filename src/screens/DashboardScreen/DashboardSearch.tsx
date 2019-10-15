import React, { useState } from 'react';

import useNavigation from '@src/hooks/useNavigation';

import { FilterIcon, SearchIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import TextInput from '@src/components/TextInput';

type DashboardSearchProps = {
  name: string;
  handleFiltering: (value: boolean) => void;
  handleModalVisibility: (value: boolean) => void;
}

const DashboardSearch = ({ name, handleFiltering, handleModalVisibility }: DashboardSearchProps) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  const onChangeText = (val: string) => {
    setText(val);
    if (text === '') {
      handleFiltering(false);
    } else {
      handleFiltering(true);
    }
  };

  // const onPressSearch = () => setText('');
  const onPressFilter = () => handleModalVisibility(true);

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
        <View column spacing={{ pl: 2 }} onPress={onPressFilter}>
          <FilterIcon />
        </View>
      </View>
    </View>
  );
};

export default DashboardSearch;
