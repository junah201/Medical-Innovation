import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await authAxios.postMultipartFormData(
    API_ROUTE.FILE.UPLOAD_FILE,
    formData
  );

  return res;
};

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const res = await authAxios.postMultipartFormData(
    API_ROUTE.FILE.UPLOAD_FILES,
    formData
  );

  return res;
};

export const uploadFileV2 = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const res = await authAxios.postMultipartFormData(
    API_ROUTE.FILE_V2.UPLOAD_FILES,
    formData
  );

  return res;
};

export const deleteFileV2 = async (filename: string) => {
  const res = await authAxios.delete(
    API_ROUTE.FILE_V2.DELETE_FILE(filename)
  );

  return res;
};
