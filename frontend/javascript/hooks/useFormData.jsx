import { useState } from 'react';

const useFormData = (form = {}) => {
  const [formData, setFormData] = useState(form);
  const onChangeFormData = event => {
    const { name, value } = event.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  };

  return [formData, onChangeFormData];
};

export default useFormData;
