import { API_ROUTE } from '@/constants';
import { Axios } from '@/libs/Axios';
import {
  JudgingEventSubmitInfo,
  JudgingParticipant,
  JudgingResultList,
} from '@/types';

const authAxios = new Axios(true);

export const submitJudgingEvent = async (
  event_id: number | string,
  data: object
) => {
  const res = await authAxios.post(
    API_ROUTE.JUDGING_PARTICIPANT.SUBMIT_JUDGING_EVENT(
      event_id
    ),
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
  const res = await authAxios.get<JudgingParticipant>(
    API_ROUTE.JUDGING_PARTICIPANT.GET_JUDGING_PARTICIPANT_BY_ID(
      id
    )
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

export const getNthJudgingParticipantsByEventId = async (
  id: number | string,
  nth_pass: number,
  skip: number,
  limit: number
) => {
  const res =
    await authAxios.getByParams<JudgingResultList>(
      API_ROUTE.JUDGING_PARTICIPANT.GET_NTH_JUDGING_PARTICIPANTS_BY_EVENT_ID(
        id,
        nth_pass
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
    API_ROUTE.JUDGING_PARTICIPANT
      .GET_JUDGING_PARTICIPANTS_BY_ME,
    {
      skip: skip,
      limit: limit,
    }
  );

  return res;
};

export const updateJudgingParticipantById = async (
  id: number | string,
  data: any
) => {
  const res = await authAxios.put(
    API_ROUTE.JUDGING_PARTICIPANT.UPDATE_JUDGING_PARTICIPANT_BY_ID(
      id
    ),
    data
  );

  return res;
};

export const updateJudgingParticipantNthPassById = async (
  id: number | string,
  nth_pass: number
) => {
  const res = await authAxios.put(
    API_ROUTE.JUDGING_PARTICIPANT.UPDATE_JUDGING_PARTICIPANT_NTH_PASS_BY_ID(
      id,
      nth_pass
    ),
    {}
  );

  return res;
};
