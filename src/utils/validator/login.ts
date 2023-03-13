import * as z from 'zod';

const LoginSchema = z.object({
  Email: z
    .string()
    .min(6, { message: 'El correo debe tener al menos 6 caracteres' })
    .max(50, { message: 'El correo no debe exceder los 50 caracteres' })
    .email({ message: 'El correo es invalido' })
    .nonempty({ message: 'El correo es requerido' }),
  Password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(40, { message: 'La contraseña debe exceder los 20 caracteres' })
    .nonempty({ message: 'La contraseña es requerida' }),
  Remember: z.boolean().optional().nullable(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export default LoginSchema;
