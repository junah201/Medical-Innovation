import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { Sponsor } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitSponsor = async (data: Sponsor) => {
  console.log(data);

  const res = await authAxios.post(
    API_ROUTE.SPONSOR.SUBMIT_SPONSOR,
    data
  );

  return res;
};
