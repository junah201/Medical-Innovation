import { UseFormRegister } from 'react-hook-form';
import { INPUT_TYPE, REGISTER_TYPE } from '@/constants';

type InputSchema = typeof INPUT_TYPE;
type InputKeys = keyof typeof INPUT_TYPE;
export type InputTypes = InputSchema[InputKeys];

type RegisterSchema = typeof REGISTER_TYPE;
type RegisterKeys = keyof typeof REGISTER_TYPE;
export type RegisterTypes = RegisterSchema[RegisterKeys];

export type RegisterForm = UseFormRegister<RegisterField>;

/* auth */
export type RegisterField = Record<RegisterTypes, string>;
