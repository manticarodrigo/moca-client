import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import BaseStyles from '@styles/BaseStyles';

const CareSearch = () => {
  const [text, setText] = useState('');

  const handleChangeText = text => setText(text);

  return (
    <View style={BaseStyles.container}>
      <Text style={BaseStyles.paragraph}>Hello world!</Text>
      <TextInput
        style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleChangeText}
        value={text}
      />
    </View>
  );
};

export default CareSearch;
