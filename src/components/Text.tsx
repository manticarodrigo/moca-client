import styled from 'styled-components/native';
import {
  compose,
  space,
  color,
  typography,
  SpaceProps,
  ColorProps,
  TypographyProps,
} from 'styled-system';

type TextProps = SpaceProps & ColorProps & TypographyProps & {
  uppercase?: boolean;
};

const Text = styled.Text<TextProps>`
  ${compose(
    space,
    color,
    typography,
  )}
  textTransform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')}
`;

export default Text;
