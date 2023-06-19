import { NewsSubNav, Posts } from '@/components';

export const Column = () => {
  return (
    <Posts boardId={5}>
      <NewsSubNav select="기고문" />
      <h1>기고문</h1>
    </Posts>
  );
};
