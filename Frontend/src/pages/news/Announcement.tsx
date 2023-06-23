import { NewsSubNav, Posts } from '@/components';

export const Announcement = () => {
  return (
    <Posts boardId={2} boardType="">
      <NewsSubNav select="공지사항" />
      <h1>공지사항</h1>
    </Posts>
  );
};
