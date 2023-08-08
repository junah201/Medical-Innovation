import styled from 'styled-components';

import {
  JudgingNumberForm,
  JudgingNumberFormWrapper,
  InputLabel,
  ReactHookInput,
} from '@/components';
import {
  REGISTER_TYPE,
  CONFIG,
  ERROR_MESSAGE,
  INPUT_TYPE,
} from '@/constants';

export const TechForm = ({ register, errors }) => {
  return (
    <>
      <h1>유효성 및 안정성 평가 (30%) </h1>
      <JudgingNumberFormWrapper title="유효성 / 안전성">
        <JudgingNumberForm
          id={REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE1}
          register={register}
          title="대상기술은 인류의 복지 증진을 목적으로 하는가?"
          maxValue={5}
          errorMessage={
            errors[REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE1]
              ?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE2}
          register={register}
          title="소프트웨어가 의도한 대로 작동하지 않아 환자에게 위해를 끼칠 가능성이 존재하는가?"
          maxValue={15}
          errorMessage={
            errors[REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE2]
              ?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE3}
          register={register}
          title="소프트웨어가 의료인의 임상적 판단을 보장하는가?"
          maxValue={10}
          errorMessage={
            errors[REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE3]
              ?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE4}
          register={register}
          title="획득한 환자의 데이터 암호화, 익명화 정책 등 적용하는 보안규격이 구체화 되어 있는가?"
          maxValue={10}
          errorMessage={
            errors[REGISTER_TYPE.EFFICACY_AND_STABILITY_SCORE4]
              ?.message
          }
        />
      </JudgingNumberFormWrapper>
      <br />
      <h1>기술성 평가 (25%) </h1>
      <JudgingNumberFormWrapper title="기술성">
        <JudgingNumberForm
          id={REGISTER_TYPE.TECHNICAL_SCORE1}
          register={register}
          title="확보된 데이터의 관리 원칙, 관리 조직, 품질 관리 프로세스에 대한 체계 및 계획이 수립되어 있는가?"
          maxValue={10}
          errorMessage={
            errors[REGISTER_TYPE.TECHNICAL_SCORE1]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.TECHNICAL_SCORE2}
          register={register}
          title="자율 의사결정 능력을 지속적으로 개선하기 위해 소프트웨어 기기를 끊임없이 최적화하는 것이 가능한가?"
          maxValue={10}
          errorMessage={
            errors[REGISTER_TYPE.TECHNICAL_SCORE2]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.TECHNICAL_SCORE3}
          register={register}
          title="클라우드 컴퓨팅 기술이 적용될 경우, 클라우드 서비스 형태, 서버의 운영 환경 등이 자체적으로 관리 가능한가? 또는 학습, 의사결정 및 예측과 같은 행동을 구현하거나 작업을 수행하기 위한 알고리즘 또는 모델의 관리체계가 구축되어 있는가?"
          maxValue={5}
          errorMessage={
            errors[REGISTER_TYPE.TECHNICAL_SCORE3]?.message
          }
        />
      </JudgingNumberFormWrapper>
      <br />
      <h1>시장·사업성 평가 (40%) </h1>
      <JudgingNumberFormWrapper title="시장 · 사업성">
        <JudgingNumberForm
          id={REGISTER_TYPE.BUSINESS_SCORE1}
          register={register}
          title="대상기술이 적용될 제품시장이 적합하게 설정되었는가?"
          maxValue={5}
          errorMessage={
            errors[REGISTER_TYPE.BUSINESS_SCORE1]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.BUSINESS_SCORE2}
          register={register}
          title="목표시장의 규모 예측에 객관성이 확보된 자료와 정보에 근거한 중장기 예측방법이 적용되었는가?"
          maxValue={5}
          errorMessage={
            errors[REGISTER_TYPE.BUSINESS_SCORE2]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.BUSINESS_SCORE3}
          register={register}
          title="경쟁업체와 경쟁제품, 경쟁업체의 지위(대기업 또는 중소기업), 경쟁업체의 지배력 등 분석을 통하여 기술사업화의 기회와 제한점이 구체적으로 제시되었는가?"
          maxValue={5}
          errorMessage={
            errors[REGISTER_TYPE.BUSINESS_SCORE3]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.BUSINESS_SCORE4}
          register={register}
          title="대상기술 적용제품이 시장진입 후 일정기간 목표시장 규모 성장 패턴과 시장점유 가능성에 대한 의견의 제시되었는가?"
          maxValue={5}
          errorMessage={
            errors[REGISTER_TYPE.BUSINESS_SCORE4]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.BUSINESS_SCORE5}
          register={register}
          title="대상기술 적용제품이 경쟁제품과의 가격, 품질 등 경쟁력 관점에서 우위 및 제한 요인이 객관적인 자료 및 정보에 의해 파악되었는가?"
          maxValue={10}
          errorMessage={
            errors[REGISTER_TYPE.BUSINESS_SCORE5]?.message
          }
        />
        <JudgingNumberForm
          id={REGISTER_TYPE.BUSINESS_SCORE6}
          register={register}
          title="대상기술 적용제품의 목표 시장에서의 매출확보 가능성에 근거하여 중장기 시장점유율이 합리적으로 예측되었고, 사업화를 위한 생산설비 투자규모 및 비용에 관한 정보도 제시되었는가?"
          maxValue={10}
          errorMessage={
            errors[REGISTER_TYPE.BUSINESS_SCORE6]?.message
          }
        />
      </JudgingNumberFormWrapper>
      <br />
      <h1>기타 고려 사항 (5%)</h1>
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
                value: 5,
                message: '5점 이하로 입력해주세요.',
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
            아래과 같은 항목을 근거로 정성적으로 1~5점을 기재해
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
    </>
  );
};

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
