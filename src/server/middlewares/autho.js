import { jwtVerify } from '../../utils/auth/jwt.js'
export const valid = (req, res, next) => {
  const authorizate = req.header('Authorization')

  if (authorizate === undefined) {
    return res.status(401).json({ message: 'Token no enviado' })
  }
  const [bearer, token] = authorizate.split(' ')
  if (bearer !== 'Bearer') {
    return res.status(401).json({ message: 'Bearer inválido' })
  }
  try {
    jwtVerify(token)
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' })
  }
}
