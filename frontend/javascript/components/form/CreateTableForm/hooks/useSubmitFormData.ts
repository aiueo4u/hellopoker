import { createTable } from 'api';
import { camelizeKeys } from 'humps';
import { useHistory } from 'react-router-dom';

export const useSubmitFormData = () => {
  const history = useHistory();

  const onSubmitFormData = async (formData: any) => {
    const response = await createTable(formData);
    const { tableId }: any = camelizeKeys(response.data);
    history.push(`/tables/${tableId}`);
  };

  return onSubmitFormData;
};
