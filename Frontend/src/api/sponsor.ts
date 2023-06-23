import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { Sponsor } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitSponsor = async (data: Sponsor) => {
  const res = await authAxios.post(
    API_ROUTE.SPONSOR.SUBMIT_SPONSOR,
    data
  );

  return res;
};

export const getSponsors = async (skip: number, limit: number) => {
  const res = await authAxios.getByParams(
    API_ROUTE.SPONSOR.GET_SPONSORS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};
