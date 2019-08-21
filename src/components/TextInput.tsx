import styled from 'styled-components/native';
import {
  compose,
  flexbox,
  space,
  layout,
  color,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
} from 'styled-system';

type TextInputProps = FlexboxProps & SpaceProps & LayoutProps & ColorProps;

const TextInput = styled.TextInput<TextInputProps>(
  compose(
    flexbox,
    space,
    layout,
    color,
  ),
);

export default TextInput;
