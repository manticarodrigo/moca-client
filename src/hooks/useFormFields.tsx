import { useState, useMemo, useRef } from 'react';

import { TextInput } from 'react-native';

type Errors<Fields> = { [key in keyof Fields]?: string };

type FormState<Fields> = {
  fieldValues: Fields;
  fieldErrors: Errors<Fields>;
}

const useFormFields = <Fields extends { [key: string]: string }> (initialState) => {
  const fieldRefs = useRef<{ [key in keyof Fields]?: TextInput }>({});

  const [didBlur, setDidBlur] = useState(false);

  const [{ fieldValues, fieldErrors }, setFormState] = useState<FormState<Fields>>({
    fieldValues: initialState,
    fieldErrors: {},
  });

  const { isAnyFieldEmpty, isEveryFieldEmpty, isFormValid } = useMemo(() => ({
    isAnyFieldEmpty: Object.values(fieldValues).some((v) => !v),
    isEveryFieldEmpty: Object.values(fieldValues).every((v) => !v),
    isFormValid: Object.values(fieldErrors).every((v) => !v),
  }), [fieldValues, fieldErrors]);

  const setFieldRef = (key: keyof Fields) => (ref) => {
    fieldRefs.current[key] = ref;
  };

  const setFieldValues = (values: Fields) => setFormState(
    (prev) => ({ fieldValues: values, fieldErrors: prev.fieldErrors }),
  );

  const setFieldErrors = (errors: Errors<Fields>) => {
    setFormState(
      (prev) => ({ fieldValues: prev.fieldValues, fieldErrors: errors }),
    );

    setDidBlur(true);
  };

  const updateFieldValues = (values: Partial<Fields>) => {
    setFormState(
      (prev) => ({ ...prev, fieldValues: { ...prev.fieldValues, ...values } }),
    );

    setDidBlur(true);
  };

  const onChangeValue = (key: keyof Fields) => (value: string, error?: string) => {
    setFormState((prev) => ({
      fieldValues: { ...prev.fieldValues, [key]: value },
      fieldErrors: { ...prev.fieldErrors, [key]: error },
    }));
  };

  const onChangeError = (key: keyof Fields) => (error?: string) => {
    setFormState((prev) => ({ ...prev, fieldErrors: { ...prev.fieldErrors, [key]: error } }));
  };

  const onFocusNext = (key: keyof Fields) => () => {
    if (!fieldRefs.current[key]) return;

    fieldRefs.current[key].focus();
  };

  type FieldProps = {
    ref: React.Ref<TextInput>;
    value: string;
    error?: string;
    didBlur?: boolean;
    onChangeText: (text?: string, error?: string) => void;
    onChangeError: (error?: string) => void;
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
        ref: setFieldRef(key),
        value: fieldValues[key],
        error: fieldErrors[key],
        didBlur,
        onChangeText: onChangeValue(key),
        onChangeError: onChangeError(key),
        onSubmitEditing,
      };

      return acc;
    }, {} as { [key in keyof Fields]: FieldProps });

    return propMap;
  }, [initialState, fieldValues, fieldErrors, didBlur]);

  return {
    fieldRefs,
    fieldValues,
    fieldProps,
    setFieldRef,
    setFieldValues,
    setFieldErrors,
    updateFieldValues,
    isAnyFieldEmpty,
    isEveryFieldEmpty,
    isFormValid,
    onChangeValue,
    onChangeError,
    onFocusNext,
  };
};

export default useFormFields;
