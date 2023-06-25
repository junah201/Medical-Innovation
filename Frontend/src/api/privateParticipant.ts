import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { PrivateEventSubmitInfo } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitPrivateEvent = async (
  data: PrivateEventSubmitInfo
) => {
  const res = await authAxios.post(
    API_ROUTE.PRIVATE_PARTICIPANT.SUBMIT_PRIVATE_EVENT,
    data
  );

  return res;
};

export const getPrivateParticipantsByEventId = async (
  eventId: number | string,
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.PRIVATE_PARTICIPANT.GET_PRIVATE_PARTICIPANTS_BY_EVENT_ID(
      eventId
    ),
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getPrivateParticipantById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.PRIVATE_PARTICIPANT.GET_PRIVATE_PARTICIPANT_BY_ID(id)
  );

  return res;
};

export const updatePrivateParticipantById = async (
  id: number | string,
  data: PrivateEventSubmitInfo
) => {
  const res = await authAxios.put(
    API_ROUTE.PRIVATE_PARTICIPANT.UPDATE_PRIVATE_PARTICIPANT_BY_ID(
      id
    ),
    data
  );

  return res;
};

export const getPrivateParticipantsByMe = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.PRIVATE_PARTICIPANT.GET_PRIVATE_PARTICIPANTS_BY_ME,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};
