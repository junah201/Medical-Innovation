import { Grid, Typography } from '@mui/material';
import { Control } from 'react-hook-form';

import { ControlInput } from '@/components/CustomInput';
import { INPUT, RegisterField } from '@/constants/forms';

interface Judging1stStandardFormProps {
  control: Control<RegisterField, any>;
}

const Judging1stStandardForm = ({
  control,
}: Judging1stStandardFormProps) => {
  const TECHNICAL = [
    INPUT.TECHNICAL_SCORE_1,
    INPUT.TECHNICAL_SCORE_2,
    INPUT.TECHNICAL_SCORE_3,
    INPUT.TECHNICAL_SCORE_4,
    INPUT.TECHNICAL_SCORE_5,
    INPUT.TECHNICAL_SCORE_6,
  ];

  const MARKETABILITY = [
    INPUT.MARKETABILITY_SCORE_1,
    INPUT.MARKETABILITY_SCORE_2,
    INPUT.MARKETABILITY_SCORE_3,
    INPUT.MARKETABILITY_SCORE_4,
  ];

  const BISINESS = [
    INPUT.BUSINESS_SCORE_1,
    INPUT.BUSINESS_SCORE_2,
    INPUT.BUSINESS_SCORE_3,
    INPUT.BUSINESS_SCORE_4,
    INPUT.BUSINESS_SCORE_5,
    INPUT.BUSINESS_SCORE_6,
    INPUT.BUSINESS_SCORE_7,
    INPUT.BUSINESS_SCORE_8,
  ];

  const OTHER = [INPUT.OTHER_SCORE_1, INPUT.OTHER_COMMENT];

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h3">
          기술성 평가항목 (30%)
        </Typography>
      </Grid>
      {TECHNICAL.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h3">
          시장성 평가항목 (20%)
        </Typography>
      </Grid>
      {MARKETABILITY.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h3">
          사업성 평가항목 (40%)
        </Typography>
      </Grid>
      {BISINESS.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h3">
          기타 고려 사항 (10%)
        </Typography>
      </Grid>
      {[
        '특허/지식재산권 보유',
        '장관 및 대통령 표창 수상',
        '기술가치평가 이력 보유',
        '산업융합선도기업',
        '고용창출 우수기업',
        '사회적 기업',
        '우수디자인 선정 기업',
        '규제샌드박스 인증기업',
        '대한민국디자인대상 수상기업',
        '그린관련 인증 기업',
      ].map((item) => (
        <Grid item xs={3}>
          <Typography>{item}</Typography>
        </Grid>
      ))}
      {OTHER.map((field) => (
        <Grid item xs={12} key={field.name}>
          <ControlInput control={control} {...field} />
        </Grid>
      ))}
    </>
  );
};

export default Judging1stStandardForm;
