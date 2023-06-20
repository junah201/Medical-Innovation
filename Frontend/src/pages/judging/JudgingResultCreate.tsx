import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  getJudgingEventById,
  getJudgingParticipantById,
  getJudgingResult,
  getMe,
  submitJudgingResult,
} from '@/api';
import {
  Message,
  HtmlContent,
  JudgingForm,
  ReactHookInput,
  InputLabel,
} from '@/components';
import {
  CONFIG,
  ERROR_MESSAGE,
  INPUT_TYPE,
  JUDGING_CONFIG,
  REGISTER_TYPE,
} from '@/constants';
import {
  RegisterField,
  JudgingParticipant,
  JudgingPermission,
  JudgingResultSubmitInfo,
} from '@/types';

const { VITE_CDN_URL } = import.meta.env;

export const JudgingResultCreate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [judgingParticipant, setJudgingParticipant] =
    useState<JudgingParticipant>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  const { mutate } = useMutation(
    (userInfo) => {
      const data: JudgingResultSubmitInfo = {
        ...userInfo,
        judging_event_id: parseInt(params.event_id),
        participant_id: parseInt(params.participant_id),
        nth: parseInt(params.nth),
      };

      return submitJudgingResult(data);
    },
    {
      onSuccess: () => {
        navigate(-1);
      },
      onError: (err: AxiosError) => {
        alert(err.response?.data.message);
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  useQuery('me', getMe, {
    retry: false,
    onSuccess: (res) => {
      const checkJudgingPermission = (
        JudgingPermissions: JudgingPermission[]
      ) => {
        if (JudgingPermissions === undefined) return false;
        if (JudgingPermissions.length === 0) return false;

        const JudgingPermission = JudgingPermissions.find(
          (permission) => {
            return (
              permission.judging_event_id ===
              parseInt(params.event_id)
            );
          }
        );

        if (!JudgingPermission) return false;

        if (
          params.nth === '1' &&
          JudgingPermission.first_judging_permission === true
        )
          return true;

        if (
          params.nth === '2' &&
          JudgingPermission.second_judging_permission === true
        )
          return true;

        return false;
      };
      if (checkJudgingPermission(res.data.judging_permissions))
        return;

      alert('심사 권한이 없습니다.');
      navigate(-1);
    },
  });

  useQuery(
    'judging_event',
    () => getJudgingEventById(params.event_id),
    {
      retry: false,
      onSuccess: (res) => {
        return;
      },
    }
  );

  useQuery(
    'judging_participant',
    () => getJudgingParticipantById(params.participant_id),
    {
      retry: false,
      onSuccess: (res) => {
        setJudgingParticipant(res.data);
      },
    }
  );

  useQuery(
    'judging_result',
    () =>
      getJudgingResult(
        params.event_id,
        params.participant_id,
        params.nth
      ),
    {
      retry: false,
      onSuccess: (res) => {
        for (const key in res.data) {
          setValue(key, `${res.data[key]}`);
        }
      },
    }
  );

  if (!judgingParticipant) return <>Loading</>;

  return (
    <>
      <h1>심사 대상자 정보</h1>
      <Message>
        <p>이름 : {judgingParticipant?.name}</p>
        <p>조직명 : {judgingParticipant?.organization_name}</p>
        <p>직위 : {judgingParticipant?.job_position}</p>
        <br />
        <a
          href={`${VITE_CDN_URL}/upload/${judgingParticipant?.zip_filename}`}
        >
          제출 서류 다운로드
        </a>
      </Message>
      <Form onSubmit={handleSubmit(onValid)}>
        <h1>기술성 평가항목 (30%)</h1>
        {JUDGING_CONFIG.TECHNICAL.map((config) => (
          <JudgingForm
            {...config}
            register={register}
            errorMessage={errors[config.id]?.message}
          />
        ))}

        <h1>시장성 평가항목 (20%)</h1>
        {JUDGING_CONFIG.MARKETABILITY.map((config) => (
          <JudgingForm
            {...config}
            register={register}
            errorMessage={errors[config.id]?.message}
          />
        ))}

        <h1>사업성 평가항목 (40%)</h1>
        {JUDGING_CONFIG.BISINESS.map((config) => (
          <JudgingForm
            {...config}
            register={register}
            errorMessage={errors[config.id]?.message}
          />
        ))}

        <h1>기타 고려 사항 (10%)</h1>
        <>
          <InputLabel
            value="기타 고려 사항"
            errorMessage={errors[REGISTER_TYPE.OTHER_SCORE1]?.message}
          />
          <StyledDiv
            iserror={!!errors[REGISTER_TYPE.OTHER_SCORE1]?.message}
          >
            <div
              style={{
                gridColumn: '1 / 3',
                backgroundColor: '#204397',
                color: '#ffffff',
              }}
            >
              평가항목
            </div>
            <div
              style={{
                gridColumn: '3 / 4',
                backgroundColor: '#204397',
                color: '#ffffff',
              }}
            >
              점수
            </div>
            <input
              style={{
                gridColumn: '3 / 4',
                gridRow: '2 / 8',
              }}
              type="number"
              {...register(REGISTER_TYPE.OTHER_SCORE1, {
                required: ERROR_MESSAGE.OTHER_SCORE1.REQUIRED,
                max: {
                  value: CONFIG.OTHER_SCORE1.MAX_VALUE,
                  message: ERROR_MESSAGE.OTHER_SCORE1.MAX_VALUE,
                },
                min: {
                  value: CONFIG.OTHER_SCORE1.MIN_VALUE,
                  message: ERROR_MESSAGE.OTHER_SCORE1.MIN_VALUE,
                },
              })}
            />
            <div
              style={{
                gridColumn: '1 / 3',
                gridRow: '2 / 3',
              }}
            >
              아래과 같은 항목을 근거로 정성적으로 1~10점을 기재해
              주십시오.
            </div>
            <div>특허/지식재산권 보유</div>
            <div>장관 및 대통령 표창 수상</div>
            <div>기술가치평가 이력 보유</div>
            <div>산업융합선도기업</div>
            <div>고용창출 우수기업</div>
            <div>사회적 기업</div>
            <div>우수디자인 선정 기업</div>
            <div>규제샌드박스 인증기업</div>
            <div>대한민국디자인대상 수상기업</div>
            <div>그린관련 인증 기업</div>
          </StyledDiv>
        </>

        <h1>종합 의견</h1>
        <ReactHookInput
          id={REGISTER_TYPE.OTHER_COMMENT}
          title="종합 의견"
          type={INPUT_TYPE.TEXTAREA}
          register={register}
          errorMessage={errors[REGISTER_TYPE.OTHER_COMMENT]?.message}
          placeholder="위 평가항목에 대한 지적사항이나 보완할 사항, 기타 심의의견 등을 기재해 주십시오."
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          제출하기
        </Submit>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px 0;
`;

const Submit = styled.button<{ isvalid: boolean }>`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: ${(props) =>
    props.isvalid
      ? props.theme.pointColor
      : props.theme.loginDisabledColor};
  color: #ffffff;
  font-weight: 600;
  border: none;
  font-size: 20px;
  height: 50px;
  width: 100%;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.isvalid ? props.theme.pointColorLight : ''};
    color: ${({ theme }) => theme.background};
  }
  letter-spacing: 1px;
`;

const StyledDiv = styled.div<{ iserror: boolean }>`
  display: grid;
  grid-template-columns: 4fr 4fr 1fr;
  grid-gap: 0px;
  padding: 0;

  border: solid 2px
    ${(props) =>
      props.iserror
        ? props.theme.errorColor
        : props.theme.validColor};

  & > div + div {
    border-top: 1px solid silver;
  }

  & > div {
    display: flex;
    width: 100%;
    height: 100%;
    border-bottom: 1pt solid #799fcb;
    text-align: center;
    justify-content: center;
    padding: 2px;
    height: 30px;
    margin: 0px;
  }

  & input {
    width: 100%;
    height: 100%;
    text-align: center;
  }
`;
