import { Button } from '@mui/material';

const { VITE_API_URL } = import.meta.env;

interface APILinkButtonProps {
  to: string;
  children: React.ReactNode;
}

export const APILinkButton = ({
  to,
  children,
}: APILinkButtonProps) => {
  return (
    <Button
      variant="outlined"
      href={`${VITE_API_URL}${to}`}
    >
      {children}
    </Button>
  );
};
