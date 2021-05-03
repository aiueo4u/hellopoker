import { useHistory } from 'react-router-dom';
import { camelizeKeys } from 'humps';
import { createTournament } from 'api';
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
