import styled from 'styled-components/native';

import { Text as StyledText } from '@src/theme/components';

type TextProps = {
  uppercase?: boolean;
};

const Text = styled(StyledText)<TextProps>`
  textTransform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')}
`;

export default Text;
