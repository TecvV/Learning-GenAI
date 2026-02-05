import express from 'express'
import { generate } from './chat.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3001
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', async (req, res) => {
  const { message, id } = req.body

  if (!message || !id) {
    return res.status(400).json({ message: 'All fields are required !!' })
  }

  console.log(message)

  const result = await generate(message, id)

  res.json({ message: result, id })
})

app.listen(port, () => {
  console.log('App running on port ' + port)
})
