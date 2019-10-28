import React, { useMemo } from 'react';

import View from '@src/components/View';
import Text from '@src/components/Text';

const Row = ({ last, title, subtitle, content, onPress }) => (
  <View
    row
    flex={1}
    variant={last ? 'profileCardLast' : 'profileCard'}
    justifyBetween
    onPress={onPress}
  >
    {subtitle ? (
      <View>
        <Text variant="boldDark">{title}</Text>
        <View spacing={{ pt: 2 }}>
          <Text variant="regularSmallGrey">{subtitle}</Text>
        </View>
      </View>
    ) : (
      <View justifyCenter>
        <Text variant="boldDark">{title}</Text>
      </View>
    )}
    {content}
  </View>
);

const Column = ({ last, title, content, onPress }) => (
  <View
    variant={last ? 'profileDataLast' : 'profileData'}
    onPress={onPress}
  >
    <Text variant="boldDark">{title}</Text>
    <View spacing={{ pt: 2 }} width={295}>
      {typeof content === 'string' ? (
        <Text variant="regularSmallGrey">
          {content}
        </Text>
      ) : content}
    </View>
  </View>
);

const ProfileListCard = ({ column = false, readonly, rows = [], bottomChildren = null }) => {
  const readableRows = useMemo(() => readonly
    ? rows.filter(({ hideOnReadonly }) => !hideOnReadonly)
    : rows,
  [rows, readonly]);

  return (
    <View variant="profileSection">
      {readableRows.map(({
        title,
        subtitle,
        icon,
        content,
        onPress,
      }, index) => {
        const Icon = icon;

        const last = index === readableRows.length - 1;
        const rowProps = { last, title, subtitle, onPress, content };

        return (
          <View key={title} row alignCenter>
            <View spacing={{ p: 3 }}>
              {typeof icon === 'function' ? (
                <Icon />
              ) : icon}
            </View>
            {column ? <Column {...rowProps} /> : <Row {...rowProps} />}
          </View>
        );
      })}
      {bottomChildren}
    </View>
  );
};

export default ProfileListCard;
