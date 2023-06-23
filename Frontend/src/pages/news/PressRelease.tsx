import { NewsSubNav, Posts } from '@/components';

export const PressRelease = () => {
  return (
    <Posts boardId={3} boardType="">
      <NewsSubNav select="보도자료" />
      <h1>보도자료</h1>
    </Posts>
  );
};
