import connection from '../../database/connection.js'
import { encript, compare } from '../../utils/auth/bcrypt.js'

export const register = async ({ email, password, rol, lenguage }) => {
  const query = 'INSERT INTO usuarios (id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;'
  const passEncryp = encript(password)
  // registrar nuevo usuario con password encriptada
  const values = [email, passEncryp, rol, lenguage]
  const { rows } = await connection(query, values)
  if (!rows) {
    const newError = { code: 500, message: 'No se puede registrar.. Error' }
    throw newError
  }
}

export const verify = async (email, password) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1;'
  const values = [email]
  // Obtener el password de la bd
  const { rows: [user] } = await connection(query, values)
  const dbpassword = user.password
  // comparar ambas password
  const verify = await compare(password, dbpassword)
  if (!verify) {
    const newError = { code: 401, message: 'email o contraseña errónea' }
    throw newError
  }
}

export const getUser = async (email) => {
  try {
    const query = 'SELECT email, rol, lenguage FROM usuarios WHERE email = $1'
    const values = [email]
    // recuperar datos del usuario en la bd
    const { rows } = await connection(query, values)
    return rows
  } catch (error) {
    const newError = { code: 500, message: error }
    throw newError
  }
}
