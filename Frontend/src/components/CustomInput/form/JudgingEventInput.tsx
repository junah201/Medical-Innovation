import {
  TextField,
  Autocomplete,
  Typography,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { getLimitedJudgingEvents } from '@/api';
import { QUERY } from '@/constants';
import { useCustomQuery } from '@/libs/Query';
import { JudgingEvent } from '@/types';

interface JudgingEventInputProps {
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

export const JudgingEventInput = ({
  name,
  label,
  value,
  onChange,
  errorMessage,
  helperText,
  disabled,
}: JudgingEventInputProps) => {
  const [rawValue, setRawValue] =
    useState<JudgingEvent | null>(null);

  const { data } = useCustomQuery(
    [
      QUERY.KEY.ALL_LIMITED_JUDGING_EVENT,
      {
        page: 0,
        size: Number.MAX_SAFE_INTEGER,
      },
    ],
    () =>
      getLimitedJudgingEvents(0, Number.MAX_SAFE_INTEGER),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => {
        if (value) {
          const j = data.data.items.find(
            (b) => b.id === value
          );
          setRawValue(j || null);
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
      const judgingEvent = data.data.items.find(
        (b) => b.id === value
      );
      setRawValue(judgingEvent || null);
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
        option: JudgingEvent,
        value: JudgingEvent
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
