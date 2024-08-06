import jwt from 'jsonwebtoken'

const JWTKEY = process.env.JWT_KEY

export const jwtSing = (payload) =>
  jwt.sign(payload, JWTKEY, { expiresIn: '5m' })

export const jwtVerify = (token) =>
  jwt.verify(token, JWTKEY)

export const jwDecode = (token) =>
  jwt.decode(token, JWTKEY)
