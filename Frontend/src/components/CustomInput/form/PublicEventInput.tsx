import {
  TextField,
  Autocomplete,
  Typography,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';

import {
  getLimitedPublicEvents,
  getPostBoards,
  getPublicEvents,
} from '@/api';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/libs/Query';
import { PublicEvent } from '@/types';

interface PublicEventInputProps {
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

export const PublicEventInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  disabled,
}: PublicEventInputProps) => {
  const [rawValue, setRawValue] =
    useState<PublicEvent | null>(null);

  const { data } = useCustomQuery(
    [
      QUERY.KEY.ALL_BAORD,
      {
        page: 0,
        size: Number.MAX_SAFE_INTEGER,
      },
    ],
    () =>
      getLimitedPublicEvents(0, Number.MAX_SAFE_INTEGER),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => {
        if (value) {
          const board = data.data.items.find(
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
      const board = data.data.items.find(
        (b) => b.id === value
      );
      setRawValue(board || null);
      return;
    }
  }, [value]);

  return (
    <Autocomplete
      id={name}
      options={data?.data.items || []}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id}>
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
        option: PublicEvent,
        value: PublicEvent
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
