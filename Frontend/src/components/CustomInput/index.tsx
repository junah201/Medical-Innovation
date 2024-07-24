import { Box } from '@mui/material';
import { useController, Control } from 'react-hook-form';

import {
  FormRules,
  Option,
  InputTypes,
  INPUT_TYPE,
  RegisterTypes,
} from '@/constants/forms';

import {
  DateInput,
  MultilineInput,
  PasswordInput,
  RadioInput,
  TextInput,
  NumberInput,
  SelectInput,
  BoardInput,
  FilesInput,
  HtmlInput,
  CropImageInput,
  FileInput,
  PublicEventInput,
  JudgingEventInput,
  JudgingInput,
  UserInput,
} from './form';

interface InitInputProps {
  name: RegisterTypes;
  label: string;
  type: InputTypes;
  placeholder?: string;
  helperText?: string;
  options?: Option[];
  disabled?: boolean;
  ratio?: number;
}

interface BasicInputProps extends InitInputProps {
  value: any;
  onChange: (...event: any[]) => void;
  errorMessage?: string | undefined;
}

interface ControlInputProps extends InitInputProps {
  rules?: FormRules;
  control: Control<any, any>;
}

export const BasicInput = ({
  name,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  helperText = ' ',
  errorMessage = '',
  disabled = false,
  options = [],
  ratio = 1,
}: BasicInputProps) => {
  const content = (inputType: InputTypes) => {
    switch (inputType) {
      case INPUT_TYPE.TEXT:
        return (
          <TextInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholader={placeholder}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.PASSWORD:
        return (
          <PasswordInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.NUMBER:
        return (
          <NumberInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            placeholader={placeholder}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.DATE:
        return (
          <DateInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.RADIO:
        return (
          <RadioInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            options={options}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.MULTILINE:
        return (
          <MultilineInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholader={placeholder}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.SELECT:
        return (
          <SelectInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            options={options}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.BOARD:
        return (
          <BoardInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            placeholader={placeholder}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.FILES:
        return (
          <FilesInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.FILE:
        return (
          <FileInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.HTML:
        return (
          <HtmlInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            placeholader={placeholder}
            helperText={helperText}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.CROP_IMAGE:
        return (
          <CropImageInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
            ratio={ratio}
          />
        );
      case INPUT_TYPE.PUBLIC_EVENT:
        return (
          <PublicEventInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            placeholader={placeholder}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.JUDGING_EVENT:
        return (
          <JudgingEventInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            placeholader={placeholder}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.JUDGING:
        return (
          <JudgingInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            options={options}
            disabled={disabled}
          />
        );
      case INPUT_TYPE.USER:
        return (
          <UserInput
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            errorMessage={errorMessage}
            helperText={helperText}
            disabled={disabled}
            placeholader={placeholder}
          />
        );
      case INPUT_TYPE.CHECKBOX:
        return <></>;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {content(type)}
    </Box>
  );
};

export const ControlInput = ({
  name,
  label,
  rules = {},
  type,
  control,
  placeholder = '',
  helperText = ' ',
  options = [],
  disabled = false,
  ratio = 1,
}: ControlInputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
  });

  return (
    <BasicInput
      name={name}
      label={`${label} ${rules?.required ? '*' : ''}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      helperText={helperText}
      errorMessage={error?.message}
      disabled={disabled}
      options={options}
      ratio={ratio}
    />
  );
};
