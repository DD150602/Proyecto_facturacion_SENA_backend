import z from 'zod'

const UserSchemaById = z.object({
  id: z.string({ message: 'El dato enviado no es valido.' }).min(1, { message: 'El valor no puede estar vacio.' }).uuid({ message: 'No se ha proporcionado un ID valido.' })
})

const userCreateSchema = z.object({
  primerNombreUsuario: z.string()
    .min(1, { message: 'El primer nombre del usuario no puede estar vacío.' })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'El primer nombre del usuario no puede contener caracteres especiales.' }),
  segundoNombreUsuario: z.string({
    message: 'El segundo nombre del usuario tiene que ser texto.'
  })
    .optional()
    .refine(value => value === undefined || value === '' || /^[a-zA-Z]+$/.test(value), {
      message: 'El segundo nombre del usuario no puede contener caracteres especiales.'
    }),
  primerApellidoUsuario: z.string()
    .min(1, { message: 'El primer apellido del usuario no puede estar vacío.' })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'El primer apellido del usuario no puede contener caracteres especiales.' }),
  segundoApellidoUsuario: z.string()
    .min(1, { message: 'El segundo apellido del usuario no puede estar vacío.' })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'El segundo apellido del usuario no puede contener caracteres especiales.' }),
  numeroDocumentoUsuario: z.string()
    .min(7, { message: 'El número de documento del usuario debe tener entre 7 y 10 caracteres.' })
    .max(10, { message: 'El número de documento del usuario debe tener entre 7 y 10 caracteres.' })
    .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: 'El número de documento del usuario no puede contener caracteres especiales.' }),
  passwordUsuario: z.string().min(6, { message: 'La contraseña del usuario no puede estar vacía.' }),
  correoUsuario: z.string().email({ message: 'El correo no esta correctamente escrito' }).min(1, { message: 'El correo del usuario no puede estar vacío.' }),
  idGenero: z.string().min(1, { message: 'El ID del género no puede estar vacío.' }),
  telefonoUsuario: z.string()
    .min(10, { message: 'El número de telefono del usuario debe tener 10 caracteres.' })
    .max(10, { message: 'El número de telefono del usuario debe tener 10 caracteres.' })
    .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: 'El número de telefono del usuario no puede contener caracteres especiales.' }),
  direccionUsuario: z.string().refine((value) => {
    const colombianAddressRegex = /^.*\b(calle|carrera|avenida|diagonal|transversal|manzana|mz|avenida carrera|vía)\b.*/gi
    return colombianAddressRegex.test(value)
  }, 'La direccion tiene un formato invalido'),
  fechaNacimientoUsuario: z.string('La fecha de nacimiento debe ser una cadena de texto').date('La fecha de nacimiento no tiene un formato valido')
})

const userUpdateSchema = z.object({
  primerNombreUsuario: z.string()
    .min(1, { message: 'El primer nombre del usuario no puede estar vacío.' })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'El primer nombre del usuario no puede contener caracteres especiales.' }),
  segundoNombreUsuario: z.string({
    message: 'El segundo nombre del usuario tiene que ser texto.'
  })
    .optional()
    .refine(value => value === undefined || value === '' || /^[a-zA-Z]+$/.test(value), {
      message: 'El segundo nombre del usuario no puede contener caracteres especiales.'
    }),
  primerApellidoUsuario: z.string()
    .min(1, { message: 'El primer apellido del usuario no puede estar vacío.' })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'El primer apellido del usuario no puede contener caracteres especiales.' }),
  segundoApellidoUsuario: z.string()
    .min(1, { message: 'El segundo apellido del usuario no puede estar vacío.' })
    .refine(value => /^[a-zA-Z]+$/.test(value), { message: 'El segundo apellido del usuario no puede contener caracteres especiales.' }),
  numeroDocumentoUsuario: z.string()
    .min(7, { message: 'El número de documento del usuario debe tener entre 7 y 10 caracteres.' })
    .max(10, { message: 'El número de documento del usuario debe tener entre 7 y 10 caracteres.' })
    .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: 'El número de documento del usuario no puede contener caracteres especiales.' }),
  correoUsuario: z.string().email({ message: 'El correo no esta correctamente escrito' }).min(1, { message: 'El correo del usuario no puede estar vacío.' }),
  idGenero: z.string().min(1, { message: 'El ID del género no puede estar vacío.' }),
  telefonoUsuario: z.string()
    .min(10, { message: 'El número de telefono del usuario debe tener 10 caracteres.' })
    .max(10, { message: 'El número de telefono del usuario debe tener 10 caracteres.' })
    .refine(value => /^[a-zA-Z0-9]+$/.test(value), { message: 'El número de telefono del usuario no puede contener caracteres especiales.' }),
  direccionUsuario: z.string().refine((value) => {
    const colombianAddressRegex = /^.*\b(calle|carrera|avenida|diagonal|transversal|manzana|mz|avenida carrera|vía)\b.*/gi
    return colombianAddressRegex.test(value)
  }, 'La direccion tiene un formato invalido'),
  fechaNacimientoUsuario: z.string('La fecha de nacimiento debe ser una cadena de texto').date('La fecha de nacimiento no tiene un formato valido'),
  linkFoto: z.string().optional()
})

const UserDeleteSchema = z.object({
  anotacion: z.string({ message: 'El dato enviado no es valido.' }).min(1, 'El campo de anotación no puede estar vacío'),
  idUserRemplazo: z.string({ message: 'El dato enviado no es valido.' }).uuid({ message: 'No se ha proporcionado un ID valido.' })
})

export function validateUserById(input) {
  return UserSchemaById.safeParse(input)
}

export function validateUserDataCreate(input) {
  return userCreateSchema.safeParse(input)
}

export function validateUserDataUpdate(input) {
  return userUpdateSchema.safeParse(input)
}

export function validateUserDelete(input) {
  return UserDeleteSchema.safeParse(input)
}
