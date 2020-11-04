import dotenv from 'dotenv'
import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { handleError, ErrorHandler } from './config/ErrorHandler.js'
import festivalsRoutes from './routes/festivalsRoutes.js'

dotenv.config()
const app = express()
app.server = http.createServer(app)
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// logger
app.use(morgan('dev'))

// body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Todo Serve Images
app.use('/festivals', express.static(__dirname + '/uploads'))

const dbURI = process.env.DATABASE_URI

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected succefully...')
})

app.get('/sample', (req, res, next) => {
  res.send('this is a sample!')
})

app.use('/api', festivalsRoutes)

app.use((req, res, next) => {
  throw new ErrorHandler(404, 'Not found!')
})

app.use((err, req, res, next) => {
  handleError(err, res)
})

const PORT = process.env.PORT || 5000
app.server.listen(PORT, () => {
  console.log(`you are running server on port: ${app.server.address().port}`)
})
