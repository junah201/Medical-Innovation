import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  getPrivateParticipantById,
  updatePrivateParticipantById,
} from '@/api';
import { FilesInput, ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

export const PrivateParticipantEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  useEffect(() => {
    async function initLoad() {
      if (!params.id) {
        Toast('잘못된 접근입니다.', 'error');
        navigate(-1);
      }

      try {
        const res = await getPrivateParticipantById(params.id);

        setValue(REGISTER_TYPE.NAME, res.data.name);
        setValue(REGISTER_TYPE.ENGLISH_NAME, res.data.english_name);
        setValue(REGISTER_TYPE.GENDER, res.data.gender);
        setValue(REGISTER_TYPE.BIRTH, res.data.birth);
        setValue(REGISTER_TYPE.PHONE, res.data.phone);
        setValue(REGISTER_TYPE.EMAIL, res.data.email);
        setValue(
          REGISTER_TYPE.ORGANIZATION_TYPE,
          res.data.organization_type
        );
        setValue(
          REGISTER_TYPE.ORGANIZATION_NAME,
          res.data.organization_name
        );
        setValue(
          REGISTER_TYPE.ORGANIZATION_ENGLISH_NAME,
          res.data.organization_english_name
        );
        setValue(REGISTER_TYPE.JOB_POSITION, res.data.job_position);
        setValue(REGISTER_TYPE.ADDRESS, res.data.address);
        setValue(REGISTER_TYPE.FINAL_DEGREE, res.data.final_degree);
        setValue(
          REGISTER_TYPE.ENGAGEMENT_TYPE,
          res.data.engagement_type
        );
        setValue(
          REGISTER_TYPE.PARTICIPANT_MOTIVATION,
          res.data.participant_motivation
        );
        setValue(
          REGISTER_TYPE.INTEREST_DISEASE,
          res.data.interest_disease
        );
        setValue(
          REGISTER_TYPE.INTEREST_FIELD,
          res.data.interest_field
        );
        setValue(
          REGISTER_TYPE.INTEREST_FIELD_DETAIL,
          res.data.interest_field_detail
        );
        setValue(REGISTER_TYPE.PROFILE_FILE, [
          res.data.profile_filename,
        ]);
        setValue(REGISTER_TYPE.ZIP_FILE, [res.data.zip_filename]);
      } catch (err) {
        Toast('잘못된 접근입니다.', 'error');
        navigate(-1);
      }
    }

    initLoad();
  }, []);

  const { mutate } = useMutation(
    async (userInput) => {
      const data: JudgingEventSubmitInfo = {
        ...userInput,
        profile_filename: userInput.profile_filename[0],
        zip_filename: userInput.zip_filename[0],
      };
      return updatePrivateParticipantById(params.id, data);
    },
    {
      onSuccess: () => {
        Toast('수정되었습니다.', 'success');
        navigate(ROUTE.ME);
      },
      onError: (err: AxiosError) => {
        Toast(
          `제출에 실패했습니다. ${
            err?.response?.data?.message || err?.message
          }`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <>
      <h1>참가 신청 수정</h1>
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
          title="(최종)학위과정"
          type={INPUT_TYPE.RADIO}
          register={register}
          errorMessage={errors[REGISTER_TYPE.FINAL_DEGREE]?.message}
          options={[
            '학사 과정 중',
            '학사 수료',
            '석사 과정 중',
            '석사 수료',
            '박사 과정 중',
            '박사 수료',
            '석,박사 통합 과정 중',
            '석,박사 통합 과정 수료',
            '전문학사 수료',
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
          title="참여 동기"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={
            errors[REGISTER_TYPE.PARTICIPANT_MOTIVATION]?.message
          }
          placeholder="지인 추천"
        />
        <FilesInput
          id={REGISTER_TYPE.PROFILE_FILE}
          control={control}
          title="증명사진"
          maxFileCount={1}
          acceptFileType="image/*"
        />
        <FilesInput
          id={REGISTER_TYPE.ZIP_FILE}
          control={control}
          title="제출용 압축파일"
          maxFileCount={1}
          acceptFileType=".zip"
        />
        <Button
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          수정하기
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
