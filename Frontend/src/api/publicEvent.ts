import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPublicEvents = async (
  skip: number,
  limit: number
) => {
  const res = await unAuthAxios.getByParams(
    API_ROUTE.PUBLIC_EVENT.GET_PUBLIC_EVENTS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getPublicEventById = async (id: number | string) => {
  const res = await unAuthAxios.get(
    API_ROUTE.PUBLIC_EVENT.GET_PUBLIC_EVENT_BY_ID(id)
  );

  return res;
};

export const uploadPublicEvent = async (
  name: string,
  englishName: string,
  description: string,
  filename: string,
  startDate: string,
  endDate: string,
  joinStartDate: string,
  joinEndDate: string
) => {
  const res = await authAxios.post(
    API_ROUTE.PUBLIC_EVENT.UPLOAD_PUBLIC_EVENT,
    {
      name: name,
      english_name: englishName,
      description: description,
      thumbnail_filename: filename,
      start_date: startDate,
      end_date: endDate,
      join_start_date: joinStartDate,
      join_end_date: joinEndDate,
    }
  );

  return res;
};

export const updatePublicEventById = async (
  id: number | string,
  name: string,
  englishName: string,
  description: string,
  filename: string,
  startDate: string,
  endDate: string,
  joinStartDate: string,
  joinEndDate: string
) => {
  const res = await authAxios.put(
    API_ROUTE.PUBLIC_EVENT.UPDATE_PUBLIC_EVENT_BY_ID(id),
    {
      name: name,
      english_name: englishName,
      description: description,
      thumbnail_filename: filename,
      start_date: startDate,
      end_date: endDate,
      join_start_date: joinStartDate,
      join_end_date: joinEndDate,
    }
  );

  return res;
};
