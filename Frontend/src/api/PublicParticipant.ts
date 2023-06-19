import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { PublicParticipant } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitPublicEvnet = async (
  eventId: number | string,
  data: PublicParticipant
) => {
  const res = await unAuthAxios.post(
    API_ROUTE.PUBLIC_PARTICIPANT.SUBMIT_PUBLIC_EVENT(eventId),
    data
  );

  return res;
};
