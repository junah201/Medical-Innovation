import styled from 'styled-components';
import '@/static/css/content-styles.css';

interface HtmlContentProps {
  content: string;
}

export const HtmlContent = ({ content }: HtmlContentProps) => {
  return (
    <Wrapper
      className="ck-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const Wrapper = styled.p`
  padding: 20px 0;
  white-space: pre-wrap;
  word-break: keep-all;

  & div {
    width: 100%;
  }

  a {
    text-decoration: underline;
  }

  & img {
    width: 100%;
  }

  & .img-container {
    width: 100%;
    display: flex;
  }

  & .right {
    align-items: flex-end;
    justify-content: right;
  }

  & .left {
    align-items: flex-start;
    justify-content: left;
  }

  & .center {
    align-items: center;
    justify-content: center;
  }
`;
