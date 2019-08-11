import React from 'react';
import styled, { css } from 'styled-components/native';

type ImageProps = {
  size: number;
};

type RoundImageProps = ImageProps & {
  url: string;
};

const Image = styled.Image(
  ({ size }: ImageProps) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
    resizeMode: cover;
  `);

const RoundImage = ({ size, url }: RoundImageProps) => <Image size={size} source={{ uri: url }} />;

export default RoundImage;
