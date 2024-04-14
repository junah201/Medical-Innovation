import { Button } from '@mui/material';

import { AlertDeleteMou } from '@/libs/Alert';

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  return (
    <Button
      onClick={() => AlertDeleteMou(id)}
      variant="outlined"
      size="small"
      color="error"
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
