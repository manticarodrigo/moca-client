import React from 'react';
import { KeyboardAvoidingView } from 'react-native';


import { CameraIcon, SendIcon } from '@src/components/icons';

import View from '@src/components/View';
import TextInput from '@src/components/TextInput';

const ConversationInputs = ({ text, onChangeText, onPressCamera, onPressSend }) => (
  <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={120}>
    <View variant="borderTop" row alignCenter height={72} spacing={{ p: 3 }} bgColor="white">
      <View spacing={{ p: 1 }} onPress={onPressCamera}>
        <CameraIcon />
      </View>
      <View flex={1} spacing={{ px: 2 }}>
        <TextInput
          variant="conversation"
          spacing={{ px: 3 }}
          onChangeText={onChangeText}
          placeholder="Type your message..."
          value={text}
        />
      </View>
      <View spacing={{ p: 1 }} onPress={onPressSend}>
        <SendIcon active={text.length} />
      </View>
    </View>
  </KeyboardAvoidingView>
);

export default ConversationInputs;
