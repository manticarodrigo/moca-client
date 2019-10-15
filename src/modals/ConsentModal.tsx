import React, { useState } from 'react';
import Modal from 'react-native-modal';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { LogoIcon } from '@src/components/icons';
import Button from '@src/components/Button';

type ConsentModalProps = {
  visible: boolean,
  onPressButton?: () => void,
}

const ConsentModal = ({ visible, onPressButton }: ConsentModalProps) => {

  const [visibility, setVisibility] = useState(visible);

  return (
    <Modal
      backdropOpacity={0.8}
      isVisible={visibility}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      onBackdropPress={() => setVisibility(!visibility)}
    >
      <View
        flex={1}
        variant="roundedBorder"
        bgColor="white"
        spacing={{ my: 8, p: 3 }}
      >
        <View alignCenter>
          <LogoIcon />
        </View>
        <Text variant="regularDark" spacing={{ my: 4, mx: 4 }}>By scheduling this appointment, you consent to treatment for all scheduled sessions with therapist for this injury.</Text>
        <Button variant="primary" onPress={onPressButton}>Give Consent</Button>
      </View>
    </Modal>
  );
}

export default ConsentModal;