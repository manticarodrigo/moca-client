import React, { useState, useMemo, useEffect, useRef } from 'react';

import useFormFields from '@src/hooks/useFormFields';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import FormField, { Props as FormFieldProps } from '@src/components/FormField';
import Button from '@src/components/Button';
import ImageSelector from '@src/components/ImageSelector';

type FieldConfig = {
  [key: string]: FormFieldProps;
}

type Image = {
  id?: number;
  image?: string;
}

export type Props<State> = {
  visible: boolean;
  fieldConfig: FieldConfig;
  images: Image[];
  submitText: string;
  onSubmit: (formFields: State) => void;
}

const Form = <State extends { [key: string]: string }> ({
  visible,
  fieldConfig,
  images = [],
  submitText,
  onSubmit,
}: Props<State>) => {
  const [localImages, setLocalImages] = useState([]);

  const mounted = useRef(true);

  const initialState = useMemo(
    () => Object.entries(fieldConfig).reduce(
      (a, [key, config]) => ({ ...a, [key]: config.value }), {},
    ), [fieldConfig],
  );

  const {
    fieldValues,
    fieldProps,
    setFieldValues,
    isFormValid,
  } = useFormFields<State>(initialState);

  useEffect(() => {
    if (!mounted.current) return;

    setFieldValues(initialState as State);
  }, [initialState]);

  useEffect(() => {
    setLocalImages(visible ? images : []);
  }, [visible, images]);

  const onAddImage = (uri: string) => {
    setLocalImages((prev) => [...prev, { image: uri }]);
  };

  const onPressSubmit = () => isFormValid && onSubmit({ ...fieldValues, images: localImages });

  return (
    <>
      <View flex={1} bgColor="lightGrey">
        <KeyboardAwareScrollView contentContainerStyle={{ width: WINDOW_WIDTH }} extraHeight={0}>
          <View my={3} p={4} width="100%" bgColor="white">
            <>
              {Object.entries(fieldConfig).map(([key, config]) => (
                <FormField
                  key={key}
                  {...config}
                  {...fieldProps[key]}
                />
              ))}
            </>
            <View row pt={5} px={3} pb={2}>
              <ImageSelector
                label="Add Images"
                images={images.concat(localImages)}
                onAdd={onAddImage}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <View width={WINDOW_WIDTH} p={4} variant="borderTop">
        <Button
          variant={!isFormValid ? 'primaryDisabled' : 'primary'}
          disabled={!isFormValid}
          onPress={onPressSubmit}
        >
          {submitText}
        </Button>
      </View>
    </>
  );
};

export default Form;
