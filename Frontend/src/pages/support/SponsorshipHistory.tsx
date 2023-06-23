import { Posts, SupportSubNav } from '@/components';

export const SponsorshipHistory = () => {
  return (
    <Posts boardId={1}>
      <SupportSubNav select="후원금 사용 내역" />
      <h1>재정 보고</h1>
    </Posts>
  );
};
