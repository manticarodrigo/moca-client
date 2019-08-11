import styled, { css } from 'styled-components/native';

import { ThemeProps } from '@src/types';

type MessageBubbleProps = {
  alignRight?: boolean;
};

const MessageBubble = styled.TextInput<MessageBubbleProps & ThemeProps>(
  ({ alignRight, theme }) => css`
    align-self: ${alignRight ? 'flex-end' : 'flex-start'};
    margin-top: ${theme.margin}px;
    padding: ${theme.padding / 2}px;
    height: auto;
    background-color: ${alignRight ? '#223063' : '#fff'}
    color: ${alignRight ? theme.colors.white : theme.colors.text}
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.boxShadow};
  `);

export default MessageBubble;
