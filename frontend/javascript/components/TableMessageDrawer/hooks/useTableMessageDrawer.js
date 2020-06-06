import { createTableMessage } from 'api';
import useFormData from 'hooks/useFormData';

const initialForm = {
  content: '',
};

const useTableMessageDrawer = tableId => {
  const [form, onChangeForm, setFormData] = useFormData(initialForm);

  const onSubmit = async () => {
    if (form.content.length === 0) return;
    await createTableMessage(tableId, form);
    setFormData(initialForm);
  };

  return { form, onChangeForm, onSubmit };
};

export default useTableMessageDrawer;
