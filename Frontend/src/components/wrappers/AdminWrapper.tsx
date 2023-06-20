import styled from 'styled-components';

export const AdminWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #fff;
  color: #000;
  min-height: 100vh;
  height: 100%;
  display: flex;
`;

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
  margin-left: 250px;

  & h1 {
    font-size: 30px;
    border-left: 5px solid #204397;
    padding-left: 10px;
    margin-bottom: 20px;
  }
`;
