import React from 'react';
import { FlatList } from 'react-native';

import { ArrowRightIcon, AddIcon, InjuryIcon } from '@src/components/icons';

import View from '@src/components/View';
import Text from '@src/components/Text';
import SwipeRow, { BinRow } from '@src/components/SwipeRow';
import ImageSelector, { ImageObject } from '@src/components/ImageSelector';

type InfoItem = {
  id?: number;
  title: string;
  description?: string;
  images?: ImageObject[];
}

type Props<T extends InfoItem> = {
  title: string;
  items: T[];
  readonly?: boolean;
  onPress?: (item: T) => void;
  onDelete?: (id: T['id']) => void;
  onAdd?: () => void;
};

const InfoList = <T extends InfoItem>({
  title,
  items,
  readonly,
  onPress,
  onDelete,
  onAdd,
}: Props<T>) => {
  const handlePress = (item: T) => () => onPress(item);
  const handleDelete = (id: T['id']) => () => onDelete(id);

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SwipeRow disabled={readonly || items.length === 1}>
          <BinRow onPress={handleDelete(item.id)} />
          <View row alignCenter flex={1} bgColor="white">
            <View p={3} width={55}><InjuryIcon size={0.5} /></View>
            <View
              row
              justifyBetween
              alignCenter
              flex={1}
              py={4}
              pr={4}
              variant="borderBottom"
              bgColor="white"
              onPress={!readonly ? handlePress(item) : undefined}
            >
              <View flex={1.25} justifyCenter>
                <Text variant="semiBoldLarge" color="dark">{item.title}</Text>
                <View pt={2}>
                  <Text variant="regularSmall" color="grey">{item.description}</Text>
                </View>
              </View>
              <View flex={1} row justifyEnd alignCenter>
                <ImageSelector disableViewer={!readonly} images={item.images} />
                <View pl={3}><ArrowRightIcon /></View>
              </View>
            </View>
          </View>
        </SwipeRow>
      )}
      ListFooterComponent={onAdd ? () => (
        <View
          row
          alignCenter
          justifyBetween
          py={3}
          variant="borderBottom"
          onPress={onAdd}
        >
          <View ml={3}><AddIcon /></View>
          <Text variant="semiBoldLarge" size={2}>{`Add new ${title}`}</Text>
          <View mr={3}><ArrowRightIcon /></View>
        </View>
      ) : null}
    />
  );
};

export default InfoList;
