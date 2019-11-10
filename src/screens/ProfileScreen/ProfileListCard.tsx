import React from 'react';

import { UserState } from '@src/store/reducers/UserReducer';

import { ArrowRightIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Toggle from '@src/components/Toggle';
import RadioButtons from '@src/components/RadioButtons';
import ImageSelector from '@src/components/ImageSelector';
import DatePicker from '@src/components/DatePicker';

type RowBase = {
  readonly?: boolean;
  column?: boolean;
  last?: boolean;
  icon?: React.FunctionComponent;
  title: string;
  subtitle?: string;
}

type Row = RowBase & {
  field: keyof UserState;
  existingValue?: string | string[] | boolean;
  onPress?: (value?: string | boolean) => void;
};

const Row = ({ field, readonly, column, last, title, subtitle, existingValue, onPress }: Row) => {
  const hasOwnSubmit = field === 'status' || field === 'gender' || field === 'certDate';

  const renderContent = () => {
    switch (field) {
      case 'status':
        if (typeof existingValue === 'boolean') {
          return (
            <Toggle
              onLabel="Available"
              offLabel="Unavailable"
              existingValue={existingValue}
              onToggle={onPress}
            />
          );
        }
        return null;
      case 'gender':
        if (typeof existingValue === 'string') {
          return (
            <RadioButtons
              readonly={readonly}
              options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]}
              existingValue={existingValue}
              onChange={onPress}
            />
          );
        }
        return null;
      case 'injury':
        if (typeof existingValue === 'object') {
          return (
            <View row alignCenter>
              <ImageSelector images={existingValue} />
              {!readonly && (
                <View pl={3}><ArrowRightIcon /></View>
              )}
            </View>
          );
        }
        return null;
      case 'certDate':
        if (typeof existingValue === 'string') {
          return (
            <DatePicker
              existingDate={existingValue}
              placeholder="Set License Date"
              onChange={onPress}
            />
          );
        }
        return null;
      default:
        return !readonly && !column ? <ArrowRightIcon /> : undefined;
    }
  };

  return (
    <View
      flex={!column ? 1 : undefined}
      row={!column}
      justifyBetween={!column}
      alignCenter={!column}
      pt={column ? 3 : undefined}
      pr={4}
      pb={column ? 4 : undefined}
      variant={!last ? 'borderBottom' : undefined}
      width="100%"
      height={!column ? 80 : undefined}
      bgColor="white"
      onPress={!hasOwnSubmit ? onPress : undefined}
    >
      {subtitle ? (
        <View>
          <Text variant="semiBoldLarge" color="dark">{title}</Text>
          <View pt={2}>
            <Text variant="regularSmall" color="grey">{subtitle}</Text>
          </View>
        </View>
      ) : (
        <View justifyCenter>
          <Text variant="semiBoldLarge" color="dark">{title}</Text>
        </View>
      )}
      {renderContent()}
    </View>
  );
};

export type Props = {
  column?: boolean;
  readonly?: boolean;
  rows: Row[];
  bottomChildren?: JSX.Element[] | JSX.Element;
}

const ProfileListCard = ({ column, readonly, rows, bottomChildren }: Props) => (
  <View mb={3} bgColor="white">
    <>
      {rows.map((props, index) => {
        const last = index === rows.length - 1;

        const rowProps = { readonly, column, last, ...props };

        return (
          <View key={props.field} row alignCenter>
            <View p={3} width={55}><props.icon /></View>
            <Row {...rowProps} />
          </View>
        );
      })}
    </>
    <>{bottomChildren}</>
  </View>
);

export default ProfileListCard;
