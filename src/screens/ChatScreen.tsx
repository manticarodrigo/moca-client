import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';

const ChatContainer = styled.View(props => css`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`);

const ChatNavTitle = styled.Text(props => css`
  font-size: 30;
`);

const ChatTextInput = styled.TextInput(props => css`
  height: 40;
  width: 100;
  borderColor: #ddd;
  borderWidth: 1;
`);

const ChatScreen = () => {
  const [text, setText] = useState('');

  const handleChangeText = (val: string) => setText(val);

  return (
    <ChatContainer>
      <ChatNavTitle>Hello world!</ChatNavTitle>
      <ChatTextInput
        style={{  }}
        onChangeText={handleChangeText}
        value={text}
      />
    </ChatContainer>
  );
};

ChatScreen.navigationOptions = {
  title: 'Chat',
};

export default ChatScreen;
