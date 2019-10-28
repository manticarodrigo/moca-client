import React from 'react';
import { FlatList } from 'react-native';

import { UserState } from '@src/store/reducers/UserReducer';

import View from '@src/components/View';
import Text from '@src/components/Text';
import Modal from '@src/components/Modal';

import Rating from '@src/components/Rating';

type Props = {
  therapist: UserState;
  visible: boolean;
  onClose: () => void;
};

const ReviewsModal = ({ therapist, visible, onClose }: Props) => (
  <Modal
    propagateSwipe
    isVisible={visible}
    onToggle={onClose}
  >
    <View width="100%">
      <View row>
        <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
          <Text variant="titleSmall">
            Reviews
          </Text>
        </View>
      </View>
      <FlatList
        data={therapist.reviews}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View row alignCenter>
            <View variant="borderBottom" flex={1} row>
              <View row spacing={{ ml: 3, my: 3 }}>
                <View spacing={{ px: 3, mt: 1 }}>
                  <Rating rating={item.rating} />
                  <Text spacing={{ ml: 1 }} variant="regularGrey">{item.comment}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  </Modal>
);

ReviewsModal.navigationOptions = {
  header: null,
};

export default ReviewsModal;
