import React from 'react';
import Modal from 'react-native-modal';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { ConsentIcon, CloseIcon } from '@src/components/icons';
import Button from '@src/components/Button';

type ConsentModalProps = {
  visible: boolean;
  ptName: string;
  onAccept?: () => void;
  onClose: () => void;
}

const ConsentModal = ({ visible, ptName, onAccept, onClose }: ConsentModalProps) => (
  <Modal
    backdropOpacity={0.8}
    isVisible={visible}
    animationInTiming={500}
    animationOutTiming={500}
    backdropTransitionInTiming={300}
    backdropTransitionOutTiming={300}
    onBackdropPress={onClose}
  >
    <View
      p={3}
      variant="curveBorder"
      bgColor="white"
    >
      <View alignEnd m={1} onPress={onClose}>
        <CloseIcon />
      </View>
      <View alignCenter>
        <ConsentIcon />
      </View>
      <View alignCenter my={5} mx={4}>
        <Text m={1} variant="regularDark">
          {`By scheduling this appointment, you consent to treatment for all scheduled sessions with ${ptName} for this injury.`}
        </Text>
      </View>
      <Button m={2} variant="primary" onPress={onAccept}>Give Consent</Button>
    </View>
  </Modal>
);

export default ConsentModal;
