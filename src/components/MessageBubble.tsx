import styled, { css } from 'styled-components/native';

import { ThemeProps } from '@src/types';

type MessageBubbleProps = {
  alignRight?: boolean;
};

const MessageBubble = styled.TextInput<MessageBubbleProps & ThemeProps>(
  ({ alignRight, theme }) => css`
    align-self: ${alignRight ? 'flex-end' : 'flex-start'};
    margin-top: ${10}px;
    padding: ${20 / 2}px;
    height: auto;
    background-color: ${alignRight ? '#223063' : '#fff'}
    color: ${alignRight ? theme.colors['white'] : theme.colors['text']}
    border-radius: ${10};
    box-shadow: 0 1px 2px rgba(0,0,0,0.25);
  `);

export default MessageBubble;
