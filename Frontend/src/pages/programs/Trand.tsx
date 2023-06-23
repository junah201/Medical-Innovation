import { Message, ProgramSubNav, Posts } from '@/components';

export const Trand = () => {
  return (
    <Posts boardId={4} boardType="link">
      <ProgramSubNav select="최신동향보고서" />
      <Message>
        재단은 공익적 목적의 일환으로 수행한 사업으로 수집 된
        사업결과물을 체계적으로 정리하여 인쇄본과 전자책으로
        최신동향보고서를 발행하여 공공기관, 산업계, 학계, 관련
        연구단체, 연구자들에게 이메일, 우편 발송을 통해 무료로
        배포합니다. 재단에서 발행하는 최신동향보고서와 발간물은
        국립중앙도서관으로부터 학술적 가치가 있다고 판단 받아
        포괄적으로 수집∙보존하여 후대에 전승하고 국민들에게 서비스하기
        위해 도서관법 제 20조에 근거하여 국립중앙도서관의 요청에 따라
        납본하고 있습니다.
      </Message>
    </Posts>
  );
};
