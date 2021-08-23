import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { readdirSync } from 'fs'

// morgan doesnt support esm
const morgan = require('morgan')
require('dotenv').config()

const app = express()

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected')
  })
  .catch((err) => {
    console.log('DB CONNECTION ERROR =>', err)
  })

// middlewares
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
)

// auto load routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`server running on the port ${port}`))
