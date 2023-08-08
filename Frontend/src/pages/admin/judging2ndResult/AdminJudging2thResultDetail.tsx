import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getJudging2ndResultById, getJudgingResultById } from '@/api';
import {
  ReactHookInput,
  InputLabel,
  JudgingNumberForm,
  JudgingNumberFormWrapper,
} from '@/components';
import {
  CONFIG,
  ERROR_MESSAGE,
  INPUT_TYPE,
  REGISTER_TYPE,
} from '@/constants';
import {
  BioForm,
  TechForm,
} from '@/pages/admin/judging2ndResult/components';
import { RegisterField } from '@/types';

export const AdminJudging2thResultDetail = () => {
  const params = useParams();

  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<RegisterField>({
    mode: 'onChange',
  });

  useEffect(() => {
    async function initLoad() {
      const res = await getJudging2ndResultById(params.id);

      Object.keys(res.data).forEach((key) => {
        setValue(key, `${res.data[key]}`);
        console.log(key, `${res.data[key]}`);
      });
    }

    initLoad();
  }, []);

  return (
    <>
      <h1>심사 결과 상세보기</h1>
      <TechForm register={register} errors={errors} />
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

const SubTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 20px;
  margin-top: 20px;
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
