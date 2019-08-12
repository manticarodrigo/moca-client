import styled from 'styled-components/native';
import { border, layout, BorderProps, LayoutProps } from 'styled-system';

type ImageProps = BorderProps & LayoutProps;

const Image = styled.Image<ImageProps>(
  {
    resizeMode: 'cover',
  },
  border,
  layout,
);

export default Image;
