import React from 'react';

import { UserState } from '@src/store/reducers/UserReducer';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import InfoList from '@src/components/InfoList';

type Props = {
  patient: UserState;
  visible: boolean;
  readonly?: boolean;
  onClose: () => void;
};

const InjuriesModal = ({ patient, visible, onClose }: Props) => (
  <Modal
    propagateSwipe
    isVisible={visible}
    onToggle={onClose}
  >
    <View safeArea flex={1} width={WINDOW_WIDTH}>
      <View row>
        <View variant="borderBottom" flex={1} height={48} alignCenter justifyCenter>
          <Text variant="semiBoldLarge">
            {`${patient.firstName}'s Injuries`}
          </Text>
        </View>
      </View>

      <InfoList readonly title="Injury" items={patient.injuries} />

      <View py={4} />
    </View>
  </Modal>
);

export default InjuriesModal;
