import { alpha } from '@mui/material/styles';

import { ThemeOptions } from '../types';

export default function OutlinedInput(theme: ThemeOptions) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.palette.grey[600],
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.light,
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 2px ${alpha(
              theme.palette.primary.main,
              0.2
            )}`,
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.primary.main}`,
            },
          },
          '&.Mui-error': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.light,
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${alpha(
                theme.palette.error.main,
                0.2
              )}`,
              '& .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${theme.palette.error.light}`,
              },
            },
          },
        },
        inputSizeSmall: {
          padding: '7.5px 8px 7.5px 12px',
        },
        inputMultiline: {
          padding: 0,
        },
      },
    },
  };
}
