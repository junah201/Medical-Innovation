import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getUsers = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.USER.GET_USERS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getAllLimitedUser = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.USER.GET_ALL_LIMITED_USER,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getUserById = async (id: number | string) => {
  const res = await authAxios.get(
    API_ROUTE.USER.GET_USER_BY_ID(id)
  );

  return res;
};

export const updateJudgingPermission = async (
  userId: number | string,
  judgingEventId: number | string,
  firstJudgingPermission: boolean,
  secondJudgingPermission: boolean
) => {
  const res = await authAxios.put(
    API_ROUTE.USER.UPDATE_JUDGING_PERMISSION(
      userId,
      judgingEventId
    ),
    {
      first_judging_permission: firstJudgingPermission,
      second_judging_permission: secondJudgingPermission,
    }
  );

  return res;
};

interface UserUpdate {
  name: string;
  email: string;
  phone: string;
  birth: string;
}

export const updateUserInfo = async (data: UserUpdate) => {
  const res = await authAxios.put(
    API_ROUTE.USER.UPDATE_USER_INFO,
    data
  );

  return res;
};

interface UserPasswordUpdate {
  password: string;
  new_password: string;
  confirm_new_password: string;
}

export const updateUserPassword = async (
  data: UserPasswordUpdate
) => {
  const res = await authAxios.put(
    API_ROUTE.USER.UPDATE_USER_PASSWORD,
    data
  );

  return res;
};
