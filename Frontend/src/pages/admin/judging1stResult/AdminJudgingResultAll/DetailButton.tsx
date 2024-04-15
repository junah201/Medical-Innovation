import { Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

import { JudgingResult } from '@/types';

import DetailModal from './DetailModal';

interface DetailButtonProps {
  row: JudgingResult;
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
          title: `${row.id}번 상세 정보`,
          content: <DetailModal row={row} />,
          dialogProps: {
            maxWidth: 'xl',
          },
        });
      }}
    >
      상세정보
    </Button>
  );
};

export default DetailButton;
