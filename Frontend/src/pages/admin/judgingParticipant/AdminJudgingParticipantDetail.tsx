import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getJudgingParticipantById } from '@/api';
import { FilesInput, ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';
import { RegisterField } from '@/types';

export const AdminJudgingParticipantEdit = () => {
  const { id } = useParams();

  const {
    register,
    formState: { errors },
    setValue,
    control,
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
      engagement_type: '현장 참가',
      participant_motivation: '',
      participant_type: '',
      interest_disease: '',
      interest_field: '연구분야',
      interest_field_detail: '',
      profile_filename: '',
      zip_filename: '',
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getJudgingParticipantById(id);

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
      setValue(REGISTER_TYPE.INTEREST_FIELD, res.data.interest_field);
      setValue(
        REGISTER_TYPE.INTEREST_FIELD_DETAIL,
        res.data.interest_field_detail
      );
      setValue(REGISTER_TYPE.PROFILE_FILE, [
        res.data.profile_filename,
      ]);
      setValue(REGISTER_TYPE.ZIP_FILE, [res.data.zip_filename]);
    }

    initLoad();
  }, []);

  return (
    <>
      <h1>심사 행사 참여자 상세정보</h1>
      <Form>
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
        <FilesInput
          id={REGISTER_TYPE.PROFILE_FILE}
          control={control}
          title="증명사진"
          maxFileCount={1}
          acceptFileType="image/*"
          disableRemove={true}
        />
        <FilesInput
          id={REGISTER_TYPE.ZIP_FILE}
          control={control}
          title="제출용 압축파일"
          maxFileCount={1}
          acceptFileType=".zip"
          disableRemove={true}
        />
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
