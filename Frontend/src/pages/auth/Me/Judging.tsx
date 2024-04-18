import { Typography } from '@mui/material';

import { NavLinkButton } from '@/components/buttons';
import { ROUTE } from '@/constants';

const Judging = () => {
  return (
    <>
      <Typography variant="h3">
        심사하기 (심사 위원 전용)
      </Typography>
      <NavLinkButton to={ROUTE.JUDGING.EVENTS}>
        심사하기
      </NavLinkButton>
    </>
  );
};

export default Judging;
