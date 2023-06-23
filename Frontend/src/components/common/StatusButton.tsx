import styled from 'styled-components';

const colors = {
  red: '#B1180B',
  yellow: '#FFD500',
  green: '#00B118',
  blue: '#0066FF',
  gray: '#CCCCCC',
};

interface StatusButtonProps {
  color: 'red' | 'yellow' | 'green' | 'blue' | 'gray';
  children: React.ReactNode;
}

export const StatusButton = ({
  color,
  children,
}: StatusButtonProps) => {
  return (
    <StyledStatusButton textColor={colors[color]}>
      {children}
    </StyledStatusButton>
  );
};

const StyledStatusButton = styled.button<{ textColor: string }>`
  display: inline-block;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  text-align: center;
  font-weight: bold;
`;
