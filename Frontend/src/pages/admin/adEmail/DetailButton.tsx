import { Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

import { AdEmail } from '@/types';

import DetailModal from './DetailModal';

interface DetailButtonProps {
  row: AdEmail;
}

const DetailButton = ({ row }: DetailButtonProps) => {
  const confirm = useConfirm();

  return (
    <Button
      variant="outlined"
      size="small"
      disableTouchRipple
      onClick={() => {
        confirm({
          title: `${row.id} ${row.email} 상세정보`,
          content: <DetailModal row={row} />,
          dialogProps: {
            maxWidth: 'md',
          },
        });
      }}
    >
      상세정보
    </Button>
  );
};

export default DetailButton;
