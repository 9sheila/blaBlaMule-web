import * as Yup from 'yup';

const baseUserSchema = {
  email: Yup
    .string('Invalid email')
    .email('Invalid email')
    .required('Required'),
  password: Yup
    .string('Invalid password')
    .min(8, 'Should be 8 characters or more')
    .required('Required')
};

export const registerSchema = Yup.object({
  name: Yup
    .string('Invalid name')
    .min(2, 'Should be 2 characters or more')
    .required('Required'),
  ...baseUserSchema
});

export const loginSchema = Yup.object({
  ...baseUserSchema
});