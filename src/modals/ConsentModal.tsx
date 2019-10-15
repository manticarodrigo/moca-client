import React, { useState } from 'react';
import Modal from 'react-native-modal';

import View from '@src/components/View';
import Text from '@src/components/Text';

import { ConsentIcon, CloseIcon } from '@src/components/icons';
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
        variant="curveBorder"
        bgColor="white"
        spacing={{ my: 8, p: 3 }}
      >
        <View alignEnd spacing={{ m: 1 }} onPress={() => setVisibility(!visibility)}>
          <CloseIcon />
        </View>
        <View alignCenter>
          <ConsentIcon />
        </View>
        <View alignCenter spacing={{ my: 5, mx: 4 }}>
          <Text variant="regularDark" spacing={{ m: 1 }}>By scheduling this appointment, you</Text>
          <Text variant="regularDark" spacing={{ m: 1 }}>consent to treatment for all scheduled</Text>
          <Text variant="regularDark" spacing={{ m: 1 }}>sessions with therapist for this injury.</Text>
        </View>
        <Button variant="primary" spacing={{ m: 2 }} onPress={onPressButton}>Give Consent</Button>
      </View>
    </Modal>
  );
}

export default ConsentModal;