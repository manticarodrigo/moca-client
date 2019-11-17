import { useState, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';

import { getValidationError } from '@src/utlities/validations';

export type FieldDict = { [key: string]: string }

type Keys<Fields extends FieldDict> = keyof Fields
type Values<Fields extends FieldDict> = Fields
type Errors<Fields extends FieldDict> = Partial<Fields>

type ConfigMap = {
  required?: boolean;
  validation?: 'email' | 'password' | 'zip' | 'number';
}

export type Config<Fields extends FieldDict> = { [key in keyof Fields]?: ConfigMap }

const useFormFields = <Fields extends FieldDict> (
  initialState: Fields,
  fieldConfig?: Config<Fields>,
) => {
  const fieldRefs = useRef<{ [key in Keys<Fields>]?: TextInput }>({});

  const [didBlur, setDidBlur] = useState(false);

  const [fieldValues, setFieldValues] = useState<Values<Fields>>(initialState);
  const [externalErrors, setExternalErrors] = useState<Errors<Fields>>({});

  const validationErrors: Errors<Fields> = useMemo(() => {
    const errors = {};
    Object.entries(fieldValues).forEach(([key, value]) => {
      const config = fieldConfig ? fieldConfig[key] || {} : {};
      const { validation, required } = config;
      errors[key] = getValidationError(value, validation, required);
    });
    return errors;
  }, [fieldValues, fieldConfig]);

  const fieldErrors = useMemo(() => ({
    ...validationErrors,
    ...externalErrors,
  }), [validationErrors, externalErrors]);

  const { isAnyFieldEmpty, isEveryFieldEmpty, isFormValid } = useMemo(() => ({
    isAnyFieldEmpty: Object.values(fieldValues).some((v) => !v),
    isEveryFieldEmpty: Object.values(fieldValues).every((v) => !v),
    isFormValid: Object.values(fieldErrors).every((v) => !v),
  }), [fieldValues, fieldErrors]);


  const onChangeValue = (key: Keys<Fields>) => (value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));

    if (externalErrors[key]) {
      delete externalErrors[key];
      setExternalErrors(externalErrors);
    }
  };

  const onFocusNext = (key: keyof Fields) => () => {
    if (!fieldRefs.current[key]) return;

    fieldRefs.current[key].focus();
  };

  const updateFieldErrors = (errors: Errors<Fields>) => {
    setExternalErrors(errors);
    setDidBlur(true);
  };

  const updateFieldValues = (values: FieldDict) => {
    setFieldValues((prev) => ({ ...prev, ...values }));
    setDidBlur(true);
  };

  type FieldProps = {
    ref: React.Ref<TextInput>;
    value: string;
    error?: string;
    didBlur?: boolean;
    onChangeText: (text?: string) => void;
    onSubmitEditing: (e) => void;
  }

  const fieldProps: { [key in keyof Fields]: FieldProps } = useMemo(() => {
    const keys = Object.keys(initialState);

    const propMap = keys.reduce((acc, c) => {
      const key = c as keyof Fields;
      const index = keys.findIndex((k) => k === key);

      let onSubmitEditing;

      if (index !== -1 && keys.length > index + 1) {
        onSubmitEditing = onFocusNext(keys[index + 1] as keyof Fields);
      }

      acc[key] = {
        ref: (ref) => { fieldRefs.current[key] = ref; },
        value: fieldValues[key],
        error: fieldErrors[key],
        didBlur,
        onChangeText: onChangeValue(key),
        onSubmitEditing,
      };

      return acc;
    }, {} as { [key in Keys<Fields>]: FieldProps });

    return propMap;
  }, [initialState, fieldValues, fieldErrors, didBlur]);

  return {
    fieldValues,
    fieldProps,
    updateFieldValues,
    updateFieldErrors,
    isAnyFieldEmpty,
    isEveryFieldEmpty,
    isFormValid,
    onChangeValue,
  };
};

export default useFormFields;
