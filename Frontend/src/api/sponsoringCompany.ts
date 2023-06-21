import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getSponsoringCompanies = async (
  skip: number,
  limit: number
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.SPONSORING_COMPANY.GET_SPONSORING_COMPANIES,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const deleteSponsoringCompanyById = async (
  id: number | string
) => {
  const res = await authAxios.delete(
    API_ROUTE.SPONSORING_COMPANY.DELETE_SPONSORING_COMPANY_BY_ID(id)
  );

  return res;
};
