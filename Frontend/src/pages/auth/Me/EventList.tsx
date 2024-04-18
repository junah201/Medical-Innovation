import { Typography } from '@mui/material';

import { Table } from '@/components';
import { TABLE_CONFIG } from '@/constants';

const EventList = () => {
  return (
    <>
      <Typography variant="h3">행사 참여 내역</Typography>
      <Table
        id="userJudgingEventParticpant"
        {...TABLE_CONFIG.USER_JUDGING_EVENT_PARTICIPANT}
      />
    </>
  );
};

export default EventList;
