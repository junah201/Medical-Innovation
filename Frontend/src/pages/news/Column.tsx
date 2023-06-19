import { NewsSubNav, Posts } from '@/components';

export const Column = () => {
  return (
    <Posts boardId={5}>
      <NewsSubNav select="기고문" />
    </Posts>
  );
};
