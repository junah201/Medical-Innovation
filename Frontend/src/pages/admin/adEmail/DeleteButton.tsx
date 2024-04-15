import { Button } from '@mui/material';

import { AlertDeleteAdEmail } from '@/libs/Alert';

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  return (
    <Button
      onClick={() => AlertDeleteAdEmail(id)}
      variant="outlined"
      size="small"
      color="error"
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
