import styled from 'styled-components';

import { ErrorMessage } from '@/components/containers';

export function InputLabel({
  value,
  errorMessage,
}: {
  value: string;
  errorMessage: string | undefined;
}) {
  return (
    <Wrapper>
      <Title>{value}</Title>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px 5px 0px;
`;

const Title = styled.div`
  font-weight: 600;
`;
