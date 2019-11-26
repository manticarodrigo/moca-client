import React from 'react';
import { KeyboardAvoidingView } from 'react-native';


import { CameraIcon, SendIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';

const ConversationInputs = ({ text, onChangeText, onPressCamera, onPressSend }) => (
  <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={125}>
    <View row alignCenter p={3} height={72} variant="borderTop" bgColor="white">
      <View p={1} onPress={onPressCamera}>
        <CameraIcon />
      </View>
      <View flex={1} px={2}>
        <TextInput
          px={3}
          variant="conversation"
          onChangeText={onChangeText}
          placeholder="Type your message..."
          value={text}
        />
      </View>
      <View p={1} onPress={onPressSend}>
        <SendIcon active={text.length} />
      </View>
    </View>
  </KeyboardAvoidingView>
);

export default ConversationInputs;
