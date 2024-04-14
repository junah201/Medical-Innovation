import { Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

import { Mou } from '@/types';

import EditModal from './EditModal';

interface EditButtonProps {
  row: Mou;
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
          title: `${row.id} ${row.name} 수정하기`,
          content: <EditModal row={row} />,
          dialogProps: {
            maxWidth: 'md',
          },
        });
      }}
    >
      수정
    </Button>
  );
};

export default EditButton;
