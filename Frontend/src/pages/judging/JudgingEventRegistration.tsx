import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  getJudgingEventById,
  uploadFiles,
  submitJudgingEvent,
} from '@/api';
import { Message, PostContent } from '@/components';
import { ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { Toast } from '@/libs/Toast';
import {
  JudgingEventSubmitInfo,
  PublicEvent,
  RegisterField,
} from '@/types';

export const JudgingEventRegistration = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [eventDetail, setEventDetail] = useState<PublicEvent>();

  useQuery({
    queryKey: 'judging_evnet',
    queryFn: () => getJudgingEventById(params.event_id),
    onSuccess: (res: AxiosResponse) => {
      setEventDetail(res.data);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      english_name: '',
      gender: '남자',
      birth: '2000-01-01',
      phone: '',
      email: '',
      organization_type: '공공기관',
      organization_name: '',
      organization_english_name: '',
      job_position: '',
      address: '',
      final_degree: '학사 과정 중',
      participant_motivation: '',
      participant_type: '',
      interest_disease: '',
      interest_field: '연구분야',
      interest_field_detail: '',
      profile_filename: '',
      zip_filename: '',
    },
  });

  const { mutate } = useMutation(
    async (userInput) => {
      const res = await uploadFiles([
        userInput.profile_filename[0],
        userInput.zip_filename[0],
      ]);
      const data: JudgingEventSubmitInfo = {
        ...userInput,
        profile_filename: res.data.filenames[0],
        zip_filename: res.data.filenames[1],
        event_id: params.event_id,
      };
      return submitJudgingEvent(data);
    },
    {
      onSuccess: () => {
        Toast('제출에 성공했습니다.', 'success');
        navigate(-1);
      },
      onError: (err: AxiosError) => {
        Toast(
          `제출에 실패했습니다. ${
            err?.response?.data?.message ||
            err?.meesage ||
            JSON.stringify(err)
          }`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <>
      <h1>참가 신청</h1>
      <Message>
        {eventDetail && (
          <PostContent content={eventDetail?.description} />
        )}
      </Message>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="이름"
          type={INPUT_TYPE.NAME}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
          placeholder="홍길동"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ENGLISH_NAME}
          title="영문 이름"
          type={INPUT_TYPE.NAME}
          register={register}
          errorMessage={errors[REGISTER_TYPE.ENGLISH_NAME]?.message}
          placeholder="Hong Gil Dong"
        />
        <ReactHookInput
          id={REGISTER_TYPE.GENDER}
          title="성별"
          type={INPUT_TYPE.GENDER}
          register={register}
          errorMessage={errors[REGISTER_TYPE.GENDER]?.message}
          placeholder=""
        />
        <ReactHookInput
          id={REGISTER_TYPE.BIRTH}
          title="생년월일"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.BIRTH]?.message}
          placeholder="2000-01-01"
        />
        <ReactHookInput
          id={REGISTER_TYPE.PHONE}
          title="전화번호"
          type={INPUT_TYPE.PHONE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.PHONE]?.message}
          placeholder="01012345678"
        />
        <ReactHookInput
          id={REGISTER_TYPE.EMAIL}
          title="이메일"
          type={INPUT_TYPE.EMAIL}
          register={register}
          errorMessage={errors[REGISTER_TYPE.EMAIL]?.message}
          placeholder="medical@innovation.or.kr"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ORGANIZATION_TYPE}
          title="소속"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ORGANIZATION_TYPE]?.message
          }
          options={[
            '공공기관',
            '대학 및 연구소',
            '산업체',
            '의료기관',
            '정부',
            '기타',
          ].map((option) => {
            return {
              value: option,
              label: option,
            };
          })}
        />
        <ReactHookInput
          id={REGISTER_TYPE.ORGANIZATION_NAME}
          title="소속기관명"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ORGANIZATION_NAME]?.message
          }
          placeholder="소속기관명"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ORGANIZATION_ENGLISH_NAME}
          title="소속기관명 (영문)"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.ORGANIZATION_ENGLISH_NAME]?.message
          }
          placeholder="소속기관명 (영문)"
        />
        <ReactHookInput
          id={REGISTER_TYPE.JOB_POSITION}
          title="소속기관 직위"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.JOB_POSITION]?.message}
          placeholder="ex) 전공의, 과장"
        />
        <ReactHookInput
          id={REGISTER_TYPE.ADDRESS}
          title="소재지"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.ADDRESS]?.message}
          placeholder="서울특별시 강남구"
        />
        <ReactHookInput
          id={REGISTER_TYPE.FINAL_DEGREE}
          title="(최종)학위"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={errors[REGISTER_TYPE.FINAL_DEGREE]?.message}
          options={[
            '전문학사',
            '학사 과정 중',
            '학사',
            '석사 과정 중',
            '석사',
            '박사 과정 중',
            '박사',
            '기타',
          ].map((option) => {
            return {
              value: option,
              label: option,
            };
          })}
        />
        <ReactHookInput
          id={REGISTER_TYPE.PARTICIPANT_MOTIVATION}
          title="신청 동기"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.PARTICIPANT_MOTIVATION]?.message
          }
          placeholder="지인 추천"
        />
        <ReactHookInput
          id={REGISTER_TYPE.PROFILE_FILE}
          title="증명사진"
          type={INPUT_TYPE.FILE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.PROFILE_FILE]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.ZIP_FILE}
          title="제출용 압축파일"
          type={INPUT_TYPE.FILE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.ZIP_FILE]?.message}
        />
        <Button
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          제출하기
        </Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const Button = styled.button<{ isvalid: boolean }>`
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
