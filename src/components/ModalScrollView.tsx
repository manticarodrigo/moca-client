import React from 'react';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native';

import View from './View';

const ModalScrollView = ({ children }) => (
  <View flex={1} width="100%">
    <TouchableWithoutFeedback>
      <TouchableHighlight>
        <View scroll>
          {children}
        </View>
      </TouchableHighlight>
    </TouchableWithoutFeedback>
  </View>
);

export default ModalScrollView;
