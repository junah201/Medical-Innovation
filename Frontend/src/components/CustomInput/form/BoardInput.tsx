import {
  TextField,
  Autocomplete,
  Typography,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { getPostBoards } from '@/api';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/libs/Query';
import { Board } from '@/types';

interface BoardInputProps {
  name: string;
  label: string;
  value: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholader: string;
  errorMessage: string | undefined;
  helperText: string | undefined;
  disabled: boolean;
}

export const BoardInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  disabled,
}: BoardInputProps) => {
  const [rawValue, setRawValue] =
    useState<Board | null>(null);

  const { data } = useCustomQuery(
    [
      QUERY.KEY.ALL_BAORD,
      {
        page: 0,
        size: Number.MAX_SAFE_INTEGER,
      },
    ],
    () =>
      getPostBoards(0, Number.MAX_SAFE_INTEGER),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => {
        if (value) {
          const board = data.data.find(
            (b) => b.id === value
          );
          setRawValue(board || null);
        }
      },
    }
  );

  useEffect(() => {
    if (
      value === null ||
      value == undefined ||
      value.toString() === ''
    ) {
      setRawValue(null);
      return;
    }
    if (data?.data) {
      const board = data.data.find(
        (b) => b.id === value
      );
      setRawValue(board || null);
      return;
    }
  }, [value]);

  return (
    <Autocomplete
      id={name}
      options={data?.data || []}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.id}
        >
          <Typography color="secondary" mr={1}>
            {option.id}
          </Typography>
          {option.name}
        </Box>
      )}
      value={rawValue}
      onChange={(_, value) => {
        onChange(value ? value.id : null);
        setRawValue(value);
      }}
      isOptionEqualToValue={(
        option: Board,
        value: Board
      ) => {
        return option.id === value.id;
      }}
      fullWidth
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          size="medium"
          fullWidth
          error={Boolean(errorMessage)}
          helperText={errorMessage || helperText}
        />
      )}
    />
  );
};
