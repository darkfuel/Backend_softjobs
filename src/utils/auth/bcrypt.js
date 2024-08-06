import bcrypt from 'bcryptjs'

export const encript = (password) => bcrypt.hashSync(password)

export const compare = (password, dbpassword) => bcrypt.compare(password, dbpassword)
