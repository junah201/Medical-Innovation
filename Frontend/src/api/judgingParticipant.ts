import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { JudgingEventSubmitInfo } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitJudgingEvent = async (
  data: JudgingEventSubmitInfo
) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_PARTICIPANT.SUBMIT_JUDGING_EVENT,
    data
  );

  return res;
};
