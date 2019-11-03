import React, { useState, useMemo, useEffect } from 'react';

import useFormFields from '@src/hooks/useFormFields';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import Modal from '@src/components/Modal';
import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import Text from '@src/components/Text';
import FormField, { Props as FormFieldProps } from '@src/components/FormField';
import Image from '@src/components/Image';
import Button from '@src/components/Button';
import ImageSelector from '@src/components/ImageSelector';

type FieldConfig = {
  [key: string]: FormFieldProps;
}

type Props<State> = {
  visible: boolean;
  fieldConfig: FieldConfig;
  images: string[];
  title: string;
  subtitle?: string;
  submitText: string;
  onSubmit: (formFields: State) => void;
  onClose: () => void;
}

const FormModal = <State extends { [key: string]: string }> ({
  visible,
  fieldConfig,
  images = [],
  title,
  subtitle,
  submitText,
  onSubmit,
  onClose,
}: Props<State>) => {
  const [localImages, setLocalImages] = useState(images);

  const initialState = useMemo(
    () => Object.entries(fieldConfig).reduce(
      (a, [key, config]) => ({ ...a, [key]: config.value }), {},
    ), [fieldConfig],
  );

  const { formFields, setFormFields, getFieldProps } = useFormFields<State>(initialState);

  useEffect(() => {
    setFormFields(initialState as State);
  }, [initialState]);

  const onAddImage = (uri: string) => setLocalImages((prev) => [...prev, uri]);

  const onPressSubmit = () => onSubmit({ ...formFields, images: localImages });

  return (
    <Modal propagateSwipe isVisible={visible} onToggle={onClose}>

      <View alignCenter spacing={{ pb: 6 }}>

        <View row>
          <View flex={1} row alignCenter spacing={{ p: 4 }} variant="borderBottom">
            <Image rounded size={70} />
            <View spacing={{ pl: 4, py: 4 }}>
              <Text variant="titlePrimary">{title}</Text>
              {!!subtitle && <Text variant="regularDark">{subtitle}</Text>}
            </View>
          </View>
        </View>

        <View flex={1} bgColor="lightGrey">
          <KeyboardAwareScrollView contentContainerStyle={{ width: WINDOW_WIDTH }} extraHeight={0}>
            <View width="100%" spacing={{ p: 4, my: 3 }} bgColor="white">
              <>
                {Object.entries(fieldConfig).map(([key, config]) => (
                  <FormField
                    key={key}
                    {...config}
                    {...getFieldProps(key as keyof State)}
                  />
                ))}
              </>
              <View row spacing={{ pt: 5, px: 3, pb: 2 }}>
                <ImageSelector
                  label="Add Images"
                  images={images}
                  onAdd={onAddImage}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <View width={WINDOW_WIDTH} spacing={{ p: 4 }} variant="borderTop">
          <Button variant="primary" onPress={onPressSubmit}>
            {submitText}
          </Button>
        </View>

      </View>

    </Modal>
  );
};

export default FormModal;
