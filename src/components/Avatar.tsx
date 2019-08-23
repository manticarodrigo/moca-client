import React from 'react';

import { Image } from '@src/theme/components';
import { mockImg } from '@src/services/mock';

type AvatarProps = {
  size: number;
  borderRadius?: number;
  uri?: string;
};

const Avatar = ({ size, borderRadius, uri = mockImg }: AvatarProps) => (
  <Image size={size} borderRadius={borderRadius} source={{ uri }} />
);

export default Avatar;
