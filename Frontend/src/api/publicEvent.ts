import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { PublicEvent, PublicEventList } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const getPublicEvents = async (
  skip: number,
  limit: number
) => {
  const res =
    await unAuthAxios.getByParams<PublicEventList>(
      API_ROUTE.PUBLIC_EVENT.GET_PUBLIC_EVENTS,
      {
        skip: skip,
        limit: limit,
      }
    );

  return res;
};

export const getLimitedPublicEvents = async (
  skip: number,
  limit: number
) => {
  const res =
    await unAuthAxios.getByParams<PublicEventList>(
      API_ROUTE.PUBLIC_EVENT.GET_LIMITED_PUBLIC_EVENTS,
      {
        skip: skip,
        limit: limit,
      }
    );

  return res;
};

interface PublicEventUpdate {
  name: string;
  english_name: string;
  description: string;
  filename: string;
  start_date: string;
  end_date: string;
  join_start_date: string;
  join_end_date: string;
}

export const getPublicEventById = async (
  id: number | string
) => {
  const res = await unAuthAxios.get<PublicEvent>(
    API_ROUTE.PUBLIC_EVENT.GET_PUBLIC_EVENT_BY_ID(id)
  );

  return res;
};

export const uploadPublicEvent = async (
  userInput: PublicEventUpdate
) => {
  const res = await authAxios.post(
    API_ROUTE.PUBLIC_EVENT.UPLOAD_PUBLIC_EVENT,
    userInput
  );

  return res;
};

export const updatePublicEventById = async (
  id: number | string,
  userInput: PublicEventUpdate
) => {
  const res = await authAxios.put(
    API_ROUTE.PUBLIC_EVENT.UPDATE_PUBLIC_EVENT_BY_ID(id),
    userInput
  );

  return res;
};
