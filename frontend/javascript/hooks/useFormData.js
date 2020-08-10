import { useCallback, useState } from 'react';

const useFormData = (form = {}) => {
  const [formData, setFormData] = useState(form);
  const onChangeFormData = useCallback(event => {
    const { name, value } = event.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }, []);

  return [formData, onChangeFormData, setFormData];
};

export default useFormData;
