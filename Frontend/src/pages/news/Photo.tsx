import { NewsSubNav, Posts } from '@/components';

export const Photo = () => {
  return (
    <Posts boardId={6}>
      <NewsSubNav select="사진" />
      <h1>사진</h1>
    </Posts>
  );
};
