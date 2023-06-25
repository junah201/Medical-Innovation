import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import { JudgingEventSubmitInfo } from '@/types';

const unAuthAxios = new Axios();
const authAxios = new Axios(true);

export const submitJudgingEvent = async (
  data: JudgingEventSubmitInfo
) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_PARTICIPANT.SUBMIT_JUDGING_EVENT,
    data
  );

  return res;
};

export const getJudgingParticipants = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_PARTICIPANT.GET_JUDGING_PARTICIPANTS,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getJudgingParticipantById = async (
  id: number | string
) => {
  const res = await authAxios.get(
    API_ROUTE.JUDGING_PARTICIPANT.GET_JUDGING_PARTICIPANT_BY_ID(id)
  );

  return res;
};

export const getJudgingParticipantsByEventId = async (
  id: number | string,
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_PARTICIPANT.GET_JUDGING_PARTICIPANTS_BY_EVENT_ID(
      id
    ),
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const getJudgingParticipantsByMe = async (
  skip: number,
  limit: number
) => {
  const res = await authAxios.getByParams(
    API_ROUTE.JUDGING_PARTICIPANT.GET_JUDGING_PARTICIPANTS_BY_ME,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const updateJudgingParticipantById = async (
  id: number | string,
  data: JudgingEventSubmitInfo
) => {
  const res = await authAxios.put(
    API_ROUTE.JUDGING_PARTICIPANT.UPDATE_JUDGING_PARTICIPANT_BY_ID(
      id
    ),
    data
  );

  return res;
};
