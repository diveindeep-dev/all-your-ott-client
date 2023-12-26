import { ChangeEvent, useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
}

const useForm = <T>({ initialValues }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [error, setError] = useState<string>('');

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleChange,
    resetValues,
    error,
    setError,
  };
};

export default useForm;
