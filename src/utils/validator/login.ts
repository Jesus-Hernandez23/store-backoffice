import * as Yup from 'yup';

export interface ILoginValues {
  email: string;
  password: string;
  remember?: boolean | null;
}

const loginSchema: Yup.SchemaOf<ILoginValues> = Yup.object().shape({
  email: Yup.string()
    .required('El correo es requerido')
    .min(6, 'El correo debe tener al menos 6 caracteres')
    .max(50, 'El correo no debe exceder los 50 caracteres')
    .email('El correo es invalido'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(40, 'La contraseña debe exceder los 20 caracteres'),
  remember: Yup.bool().nullable(),
});

export default loginSchema;
