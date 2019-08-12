import styled from 'styled-components/native';
import { space, color, typography, SpaceProps, ColorProps, TypographyProps } from 'styled-system';

type TextProps = SpaceProps & ColorProps & TypographyProps;

const Text = styled.Text<TextProps>(
  space,
  color,
  typography,
);

export default Text;
