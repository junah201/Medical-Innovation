import { Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

import { PublicParticipant } from '@/types';

import EditModal from './EditModal';

interface EditButtonProps {
  row: PublicParticipant;
}

const EditButton = ({ row }: EditButtonProps) => {
  const confirm = useConfirm();

  return (
    <Button
      variant="outlined"
      size="small"
      disableTouchRipple
      onClick={() => {
        confirm({
          title: `${row.id} 수정하기`,
          content: <EditModal row={row} />,
          dialogProps: {
            maxWidth: 'xl',
          },
        });
      }}
    >
      수정
    </Button>
  );
};

export default EditButton;
