import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { getJudging2ndResultById } from '@/api';
import { RegisterField } from '@/types';

import { TechForm } from './AdminJudging2ndResultAll/forms';

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
