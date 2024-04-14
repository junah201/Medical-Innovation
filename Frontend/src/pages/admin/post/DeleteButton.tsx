import { Button } from '@mui/material';

import { AlertDeletePost } from '@/libs/Alert';

interface DeleteButtonProps {
  id: number;
}

const DeleteButton = ({
  id,
}: DeleteButtonProps) => {
  return (
    <Button
      onClick={() => AlertDeletePost(id)}
      variant="outlined"
      color="error"
      size="small"
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
