import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { register, getUser, verify } from './models/users.js'
import { valid } from './middlewares/autho.js'
import { jwtSing, jwDecode } from '../utils/auth/jwt.js'

const PORT = process.env.PORT ?? 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    await verify(email, password)
    const token = jwtSing({ email })
    res.status(200).json({ token })
  } catch (error) {
    res.status(401).send(error)
  }
})

app.post('/usuarios', async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body
    await register({ email, password, rol, lenguage })
    res.status(201).json({ status: true, message: 'Usuario registrado con éxito!' })
  } catch (error) {
    res.status(500).json({ message: 'No pudo crearse el usuario.. ', error })
  }
})

app.get('/usuarios', valid, async (req, res) => {
  try {
    // validar datos de usuarios, decodificar y devolver datos de db
    const authorizate = req.header('Authorization')
    const [, token] = authorizate.split(' ')
    const { email } = jwDecode(token)
    const user = await getUser(email)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

app.all('*', (_, res) => { res.status(500).json({ message: 'Error en la ruta ingresada' }) })

app.listen(PORT, () => console.log('Server running on port', PORT))

export default app
