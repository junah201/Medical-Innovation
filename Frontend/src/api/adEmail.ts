import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getAdEmails = async (skip = 0, limit = 1000) => {
  const res = await authAxios.getByParams(
    API_ROUTE.AD_EMAIL.GET_AD_EMAILS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const uploadAdEmail = async (
  email: string,
  etc_info: string
) => {
  const res = await authAxios.post(
    API_ROUTE.AD_EMAIL.UPLOAD_AD_EMAIL,
    {
      email: email,
      etc_info: etc_info,
      subscribe: true,
    }
  );

  return res;
};

export const deleteAdEmailById = async (id: number | string) => {
  const res = await authAxios.delete(
    API_ROUTE.AD_EMAIL.DELETE_AD_EMAIL_BY_ID(id)
  );

  return res;
};

export const sendAdEmailAll = async (
  title: string,
  content: string,
  files: string[]
) => {
  const res = await authAxios.post(
    API_ROUTE.AD_EMAIL.SEND_AD_EMAIL_ALL,
    {
      title: title,
      content: content,
      files: files,
    }
  );

  return res;
};

export const sendAdEmailOne = async (
  title: string,
  content: string,
  files: string[],
  email: string
) => {
  const res = await authAxios.post(
    API_ROUTE.AD_EMAIL.SEND_AD_EMAIL_ONE,
    {
      email: email,
      title: title,
      content: content,
      files: files,
    }
  );

  return res;
};
