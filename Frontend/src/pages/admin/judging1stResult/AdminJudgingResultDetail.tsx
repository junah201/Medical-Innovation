import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getJudgingResultById } from '@/api';
import { JudgingForm, ReactHookInput, InputLabel } from '@/components';
import {
  CONFIG,
  ERROR_MESSAGE,
  INPUT_TYPE,
  JUDGING_CONFIG,
  REGISTER_TYPE,
} from '@/constants';
import { RegisterField } from '@/types';

export const AdminJudgingResultDetail = () => {
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
      const res = await getJudgingResultById(params.id);

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
      <Form>
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
          <StyledDiv iserror={!!errors[REGISTER_TYPE.OTHER_SCORE1]?.message}>
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
              아래과 같은 항목을 근거로 정성적으로 1~10점을 기재해 주십시오.
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
        <br />
        <h1>종합 의견</h1>
        <ReactHookInput
          id={REGISTER_TYPE.OTHER_COMMENT}
          title="종합 의견"
          type={INPUT_TYPE.TEXTAREA}
          register={register}
          errorMessage={errors[REGISTER_TYPE.OTHER_COMMENT]?.message}
          placeholder="위 평가항목에 대한 지적사항이나 보완할 사항, 기타 심의의견 등을 기재해 주십시오."
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
  margin: 30px 0;
`;

const Submit = styled.button<{ isvalid: boolean }>`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: ${(props) =>
    props.isvalid ? props.theme.pointColor : props.theme.loginDisabledColor};
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
      props.iserror ? props.theme.errorColor : props.theme.validColor};

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
