import { Button } from '@mui/material';

interface NavLinkButtonProps {
  to: string;
  children: React.ReactNode;
}

export const NavLinkButton = ({
  to,
  children,
}: NavLinkButtonProps) => {
  return (
    <Button variant="outlined" href={`${to}`}>
      {children}
    </Button>
  );
};
