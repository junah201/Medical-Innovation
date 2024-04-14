import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getAdvisors = async (
  skip = 0,
  limit = 1000
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.ADVISOR.GET_ADVISORS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

interface AdvisorUpdate {
  name: string;
  type: string;
  description: string;
  filename: string;
}

export const uploadAdvisor = async (
  userInput: AdvisorUpdate
) => {
  const res = await authAxios.post(
    API_ROUTE.ADVISOR.UPLOAD_ADVISOR,
    userInput
  );

  return res;
};

export const deleteAdvisorById = async (
  id: string | number
) => {
  const res = await authAxios.delete(
    API_ROUTE.ADVISOR.DELETE_ADVISOR_BY_ID(id)
  );

  return res;
};

export const getAdvisorById = async (
  id: string | number
) => {
  const res = await unAuthAxios.get(
    API_ROUTE.ADVISOR.GET_ADVISOR_BY_ID(id)
  );

  return res;
};

export const updateAdvisorById = async (
  id: string | number,
  userInput: AdvisorUpdate
) => {
  const res = await authAxios.put(
    API_ROUTE.ADVISOR.UPDATE_ADVISOR_BY_ID(id),
    userInput
  );

  return res;
};
