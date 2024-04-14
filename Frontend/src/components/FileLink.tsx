import { Link } from '@mui/material';

const { VITE_CDN_URL } = import.meta.env;

interface FileLinkProps {
  filename: string;
}

export const FileLink = ({
  filename,
}: FileLinkProps) => {
  return (
    <Link
      href={`${VITE_CDN_URL}/upload/${filename}`}
      target="_blank"
    >
      {filename}
    </Link>
  );
};
