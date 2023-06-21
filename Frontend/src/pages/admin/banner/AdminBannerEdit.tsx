import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getBannerById, updateBannerById } from '@/api';
import { ReactHookInput } from '@/components/form';
import { INPUT_TYPE, REGISTER_TYPE, ROUTE } from '@/constants';
import { Toast } from '@/libs/Toast';
import { RegisterField } from '@/types';

import '@/static/css/content-styles.css';

export const AdminBannerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  useQuery('getBanner', () => getBannerById(id), {
    retry: false,
    cacheTime: 0,
    onSuccess: (res) => {
      const { name, link, banner_end_at } = res.data;
      setValue(REGISTER_TYPE.NAME, name);
      setValue(REGISTER_TYPE.LINK, link);
      setValue(
        REGISTER_TYPE.BANNER_END_AT,
        banner_end_at.slice(0, 10)
      );
    },
  });

  const { mutate } = useMutation(
    (userInput) =>
      updateBannerById(
        id,
        userInput?.name,
        userInput?.link,
        `${userInput?.banner_end_at}T00:00:00.000Z`
      ),
    {
      onSuccess: () => {
        Toast('수정 완료', 'success');
        navigate(ROUTE.ADMIN.BANNER.ALL);
      },
      onError: (err: AxiosError) => {
        Toast(`수정에 실패했습니다. ${err?.response?.data}`, 'error');
      },
    }
  );

  const onValid = (userInput: RegisterField) => mutate(userInput);

  return (
    <Wrapper>
      <h1>배너 수정</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <ReactHookInput
          id={REGISTER_TYPE.NAME}
          title="회사명"
          placeholder='회사명을 입력해주세요. ex) "플레이데이터"'
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.NAME]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.LINK}
          title="사이트 링크"
          placeholder="만약 없다면 공백 하나만 입력해주세요."
          type={INPUT_TYPE.TEXT}
          register={register}
          errorMessage={errors[REGISTER_TYPE.LINK]?.message}
        />
        <ReactHookInput
          id={REGISTER_TYPE.BANNER_END_AT}
          title="배너 종료 시점"
          type={INPUT_TYPE.DATE}
          register={register}
          errorMessage={errors[REGISTER_TYPE.BANNER_END_AT]?.message}
        />
        <Submit
          isvalid={!Object.keys(errors)[0]}
          disabled={isSubmitting}
        >
          수정하기
        </Submit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & .ck-editor {
    width: 800px;
  }

  & .ck-editor__editable_inline {
    min-height: 600px;
  }
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
