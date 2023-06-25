import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getPopupById, updatePopupById } from '@/api';
import { ReactHookInput, FilesInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminPopupEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm<RegisterField>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      link: '',
      file: [],
      banner_end_at: '',
    },
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getPopupById(id);

      setValue(REGISTER_TYPE.TITLE, res.data.title);
      setValue(REGISTER_TYPE.LINK, res.data.link);
      setValue(REGISTER_TYPE.START_DATA, res.data.popup_start_date);
      setValue(REGISTER_TYPE.END_DATE, res.data.popup_end_date);
      setValue(REGISTER_TYPE.FILE, [res.data.image_filename]);
    }

    initLoad();
  });

  const { mutate } = useMutation(
    (userInput) => {
      if (!userInput?.file[0]) {
        throw Error('이미지를 업로드해주세요.');
      }
      return updatePopupById(
        id,
        userInput?.title,
        userInput?.link,
        userInput?.start_date,
        userInput?.end_date,
        userInput?.file[0]
      );
    },
    {
      onSuccess: () => {
        Toast('수정 완료', 'success');
        navigate(ROUTE.ADMIN.POPUP.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(
          `수정 실패했습니다. ${
            err?.response?.data?.message || err.message
          }`,
          'error'
        );
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <Wrapper>
      <h1>페이지 팝업 수정</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.TITLE}
          title="팝업 상단 제목"
          placeholder="팝업 상단 제목"
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.TITLE]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.LINK}
          title="이미지 클릭 시 바로가기 링크"
          placeholder="만약 없다면 # 하나만 입력해주세요."
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.LINK]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.START_DATA}
          title="팝업 표시 시작 날짜"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.START_DATA]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.END_DATE}
          title="팝업 표시 종료 날짜"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.END_DATE]?.message}
        />
        <FilesInput
          title="팝업 이미지"
          id={REGISTER_TYPE.FILE}
          control={control}
          maxFileCount={1}
          acceptFileType="image/*"
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          업로드
        </Submit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
