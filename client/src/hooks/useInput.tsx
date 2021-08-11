import { useState } from 'react';

export const useInput = (initalValue: number | string) => {
  const [value, setValue] = useState(initalValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
};
