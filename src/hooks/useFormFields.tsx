import { useState, useMemo, useRef } from 'react';

import { TextInput } from 'react-native';

type Errors<Fields> = { [key in keyof Fields]?: string };

type FormState<Fields> = {
  fieldValues: Fields;
  fieldErrors: Errors<Fields>;
}

const useFormFields = <Fields extends object> (initialState) => {
  const fieldRefs = useRef<{ [key in keyof Fields]?: TextInput }>({});

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

  const setFieldErrors = (errors: Errors<Fields>) => setFormState(
    (prev) => ({ fieldValues: prev.fieldValues, fieldErrors: errors }),
  );

  const updateFieldValues = (values: Partial<Fields>) => setFormState(
    (prev) => ({ ...prev, fieldValues: { ...prev.fieldValues, ...values } }),
  );

  const onChangeField = (key: keyof Fields) => (value: string, error?: string) => {
    setFormState((prev) => ({
      fieldValues: { ...prev.fieldValues, [key]: value },
      fieldErrors: { ...prev.fieldErrors, [key]: error },
    }));
  };

  const onFocusNext = (key: keyof Fields) => () => {
    if (!fieldRefs.current[key]) return;

    fieldRefs.current[key].focus();
  };

  const getFieldProps = (key: keyof Fields) => {
    const keys = Object.keys(initialState);
    const index = keys.findIndex((k) => k === key);

    let onSubmitEditing;

    if (index !== -1 && keys.length > index + 1) {
      onSubmitEditing = onFocusNext(keys[index + 1] as keyof Fields);
    }

    return {
      ref: setFieldRef(key),
      value: fieldValues[key],
      error: fieldErrors[key],
      onChangeText: onChangeField(key),
      onSubmitEditing,
    };
  };

  return {
    fieldRefs,
    fieldValues,
    setFieldRef,
    setFieldValues,
    setFieldErrors,
    updateFieldValues,
    isAnyFieldEmpty,
    isEveryFieldEmpty,
    isFormValid,
    onChangeField,
    onFocusNext,
    getFieldProps,
  };
};

export default useFormFields;
