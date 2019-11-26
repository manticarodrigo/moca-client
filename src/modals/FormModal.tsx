import React from 'react';

import { FieldDict } from '@src/hooks/useFormFields';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import Text from '@src/components/Text';
import Image from '@src/components/Image';
import Form, { Props as FormProps } from '@src/components/Form';

type Props<State extends FieldDict> = FormProps<State> & {
  visible: boolean;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}

const FormModal = <State extends { [key: string]: string }> ({
  visible,
  title,
  subtitle,
  onClose,
  ...formProps
}: Props<State>) => (
  <Modal propagateSwipe isVisible={visible} onToggle={onClose}>

    <View alignCenter pb={6}>

      <View row>
        <View row alignCenter flex={1} variant="borderBottom">
          <View py={4} pl={4}>
            <Text variant="title">{title}</Text>
            {!!subtitle && <Text variant="regularDark">{subtitle}</Text>}
          </View>
        </View>
      </View>

      <Form visible={visible} {...formProps} />

    </View>

  </Modal>
  );

export default FormModal;
