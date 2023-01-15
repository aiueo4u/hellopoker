import { createTournament } from 'api';
import { camelizeKeys } from 'humps';
import { useHistory } from 'react-router-dom';

import useFormData from 'hooks/useFormData';

const initialFormData = {
  name: '',
};

const useCreateTournamentFormDialog = onClose => {
  const history = useHistory();
  const [formData, onChangeFormData] = useFormData(initialFormData);

  const onSubmit = async () => {
    const response = await createTournament(formData);
    const { tournament } = camelizeKeys(response.data);
    onClose();
    history.push(`/tournaments/${tournament.id}`);
  };

  return { formData, onChangeFormData, onSubmit };
};

export default useCreateTournamentFormDialog;
