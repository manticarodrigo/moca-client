import React from 'react';
import styled from 'styled-components/native';

import { userImgSrc } from '@src/constants/urls';
import RoundImage from '@src/components/RoundImage';

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

const HeaderText = styled.Text`
  margin-left: 10px;
  font-size: 20px;
`;

const ChatHeader = ({ params: { img = userImgSrc, title = '' } }) => (
  <HeaderView>
    <RoundImage size={41} url={img} />
    <HeaderText>{title}</HeaderText>
  </HeaderView>
);

export default ChatHeader;
