import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { PublicParticipant } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitPublicEvnet = async (
  eventId: number | string,
  data: PublicParticipant
) => {
  const res = await unAuthAxios.post(
    API_ROUTE.PUBLIC_PARTICIPANT.SUBMIT_PUBLIC_EVENT(eventId),
    data
  );

  return res;
};

export const getPublicParticipantsByEventId = async (
  eventId: number | string,
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.PUBLIC_PARTICIPANT.GET_PUBLIC_PARTICIPANTS_BY_EVENT_ID(
      eventId
    ),
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getPublicParticipantById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.PUBLIC_PARTICIPANT.GET_PUBLIC_PARTICIPANT_BY_ID(id)
  );

  return res;
};

export const updatePublicParticipantById = async (
  id: number | string,
  data: PublicParticipant
) => {
  const res = await authAxios.put(
    API_ROUTE.PUBLIC_PARTICIPANT.UPDATE_PUBLIC_PARTICIPANT_BY_ID(id),
    data
  );

  return res;
};

export const deletePublicParticipantById = async (
  id: number | string
) => {
  const res = await authAxios.delete(
    API_ROUTE.PUBLIC_PARTICIPANT.DELETE_PUBLIC_PARTICIPANT_BY_ID(id)
  );

  return res;
};
