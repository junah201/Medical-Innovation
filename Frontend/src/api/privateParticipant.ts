import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { PrivateEventSubmitInfo } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitPrivateEvent = async (
  data: PrivateEventSubmitInfo
) => {
  const res = await authAxios.post(
    API_ROUTE.PRIVATE_PARTICIPANT.SUBMIT_PRIVATE_EVENT,
    data
  );

  return res;
};
