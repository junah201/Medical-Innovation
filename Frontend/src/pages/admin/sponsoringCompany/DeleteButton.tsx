import { Button } from '@mui/material';

import { AlertDeleteSponsoringCompany } from '@/libs/Alert';

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  return (
    <Button
      onClick={() => AlertDeleteSponsoringCompany(id)}
      variant="outlined"
      size="small"
      color="error"
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
