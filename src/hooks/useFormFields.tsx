import { useState, useMemo, useRef } from 'react';

import { TextInput } from 'react-native';

const useFormFields = <Fields extends object> (initialState) => {
  const [formFields, setFormFields] = useState<Partial<Fields>>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<Fields>>({});

  const fieldRefs = useRef<{ [key in keyof Fields]?: TextInput }>({});

  const setFieldRef = (key: keyof Fields) => (ref) => {
    fieldRefs.current[key] = ref;
  };

  const { isAnyFieldEmpty, isEveryFieldEmpty, isFormValid } = useMemo(() => ({
    isAnyFieldEmpty: Object.values(formFields).includes(''),
    isEveryFieldEmpty: Object.values(formFields).every((v) => !v),
    isFormValid: !Object.keys(formErrors).length,
  }), [formFields, formErrors]);

  const onChangeField = (key: keyof Fields) => (text: string, error?: string) => {
    setFormFields({ ...formFields, [key]: text });

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
    formErrors,
    fieldRefs,
    setFieldRef,
    isAnyFieldEmpty,
    isEveryFieldEmpty,
    isFormValid,
    onChangeField,
    onFocusNext,
  };
};

export default useFormFields;
