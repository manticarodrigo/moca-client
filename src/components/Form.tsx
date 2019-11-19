import React, { useState, useEffect } from 'react';

import useFormFields, { FieldDict, Config as FieldConfig } from '@src/hooks/useFormFields';

import { WINDOW_WIDTH } from '@src/utlities/constants';

import View from '@src/components/View';
import KeyboardAwareScrollView from '@src/components/KeyboardAwareScrollView';
import FormField, { Props as FormFieldProps } from '@src/components/FormField';
import Button from '@src/components/Button';
import ImageSelector from '@src/components/ImageSelector';

type FieldProps = { [key: string]: FormFieldProps }
type Image = { id?: number; image?: string }

export type Props<State extends FieldDict> = {
  visible: boolean;
  initialState: State;
  props: FieldProps;
  config?: FieldConfig<State>;
  images: Image[];
  submitText: string;
  onSubmit: (formFields: State) => void;
  onDeleteImage?: (id: number) => void;
}

const Form = <State extends FieldDict> ({
  visible,
  initialState,
  config,
  props,
  images,
  submitText,
  onSubmit,
  onDeleteImage,
}: Props<State>) => {
  const [localImages, setLocalImages] = useState([]);

  const {
    fieldValues,
    fieldProps,
    isFormValid,
    isEveryFieldEmpty,
  } = useFormFields<State>(initialState, config);

  const isValid = isFormValid && (!isEveryFieldEmpty || !!(images && images.length));

  useEffect(() => {
    if (visible) return;
    setLocalImages([]);
  }, [visible, images]);

  const onAddImage = (uri: string) => {
    setLocalImages((prev) => [...prev, { image: uri }]);
  };

  const onPressSubmit = () => isValid && onSubmit({
    ...fieldValues,
    images: localImages,
  });

  const onPressDelete = (index: number) => {
    if (index < images.length) {
      onDeleteImage(images[index].id);
    } else if (index - images.length < localImages.length) {
      localImages.splice(index - images.length, 1);

      setLocalImages([...localImages]);
    }
  };

  return (
    <>
      <View flex={1} bgColor="lightGrey">
        <KeyboardAwareScrollView contentContainerStyle={{ width: WINDOW_WIDTH }} extraHeight={0}>
          <View my={3} p={4} width="100%" bgColor="white">
            <>
              {Object.keys(initialState).map((key) => (
                <FormField
                  key={key}
                  {...props[key]}
                  {...fieldProps[key]}
                />
              ))}
            </>
            <View row pt={5} px={3} pb={2}>
              <ImageSelector
                label="Add Images"
                images={(images || []).concat(localImages)}
                onAdd={onAddImage}
                onDelete={onPressDelete}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <View width={WINDOW_WIDTH} p={4} variant="borderTop">
        <Button
          variant={!isValid ? 'primaryDisabled' : 'primary'}
          disabled={!isValid}
          onPress={onPressSubmit}
        >
          {submitText}
        </Button>
      </View>
    </>
  );
};

export default Form;
