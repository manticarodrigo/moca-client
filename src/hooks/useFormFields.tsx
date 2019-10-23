import { useState, useMemo, useRef } from 'react';

import { TextInput } from 'react-native';

const useFormFields = <Fields extends object> (initialState) => {
  const [formFields, setFormFields] = useState<Fields>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<Fields>>({});

  const fieldRefs = useRef<{ [key in keyof Fields]?: TextInput }>({});

  const { isAnyFieldEmpty, isEveryFieldEmpty, isFormValid } = useMemo(() => ({
    isAnyFieldEmpty: Object.values(formFields).includes(''),
    isEveryFieldEmpty: Object.values(formFields).every((v) => !v),
    isFormValid: !Object.keys(formErrors).length,
  }), [formFields, formErrors]);

  const setFieldRef = (key: keyof Fields) => (ref) => {
    fieldRefs.current[key] = ref;
  };

  const updateFormFields = (values: Fields) => setFormFields((prev) => ({ ...prev, ...values }));

  const onChangeField = (key: keyof Fields) => (value: string | boolean, error?: string) => {
    setFormFields({ ...formFields, [key]: value });

    if (error) {
      setFormErrors({ ...formErrors, [key]: error });
    } else {
      delete formErrors[key];

      setFormErrors(formErrors);
    }
  };

  const onFocusNext = (key: keyof Fields) => () => {
    if (!fieldRefs.current[key]) return;

    fieldRefs.current[key].focus();
  };

  return {
    formFields,
    fieldRefs,
    isAnyFieldEmpty,
    isEveryFieldEmpty,
    isFormValid,
    setFieldRef,
    updateFormFields,
    onChangeField,
    onFocusNext,
  };
};

export default useFormFields;