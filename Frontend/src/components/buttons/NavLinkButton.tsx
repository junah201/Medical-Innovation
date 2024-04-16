import { Button } from '@mui/material';

interface NavLinkButtonProps {
  to: string;
  children: React.ReactNode;
  sx?: object;
  config?: object;
}

export const NavLinkButton = ({
  to,
  children,
  sx = {},
  config = {},
}: NavLinkButtonProps) => {
  return (
    <Button
      variant="outlined"
      href={`${to}`}
      sx={sx}
      {...config}
    >
      {children}
    </Button>
  );
};
