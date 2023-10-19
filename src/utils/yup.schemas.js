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

export const travelSchema = Yup.object({
  weight: Yup
  .string('Invalid weight')
  .max(56, 'Should be up to 56kg')
  .required('Required'),
  date: Yup
  .string('Invalid date')
  .required('Required'),
  pickUpPoint: Yup
  .string('Invalid pick up point')
  .required('Required'),
  startingPoint: Yup
  .string('Invalid starting point')
  .required('Required'),
  destination: Yup
  .string('Invalid destination')
  .required('Required'),

});

export const editTravelSchema = Yup.object({
  startingPoint: Yup
    .string('Punto de partida inválido')
    .required('El punto de partida es requerido'),
  destination: Yup
    .string('Destino inválid')
    .required('El destino es requerido'),
  date: Yup
    .string('Fecha inválida')
    .required('La fecha es requerida'),
  weight: Yup
    .string('Peso inválido')
    .required('El peso es requerido'),
    price: Yup
    .string('Precio inválido')
    .required('El precio es requerido'),
});