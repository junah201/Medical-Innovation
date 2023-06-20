import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getUsers = async (skip: number, limit: number) => {
  const res = await authAxios.getByParams(API_ROUTE.USER.GET_USERS, {
    skip: skip,
    limit: limit,
  });

  return res;
};

export const getUserById = async (id: number | string) => {
  const res = await authAxios.get(API_ROUTE.USER.GET_USER_BY_ID(id));

  return res;
};

export const updateJudgingPermission = async (
  userId: number | string,
  judgingEventId: number | string,
  firstJudgingPermission: boolean,
  secondJudgingPermission: boolean
) => {
  const res = await authAxios.put(
    API_ROUTE.USER.UPDATE_JUDGING_PERMISSION(userId, judgingEventId),
    {
      first_judging_permission: firstJudgingPermission,
      second_judging_permission: secondJudgingPermission,
    }
  );

  return res;
};
