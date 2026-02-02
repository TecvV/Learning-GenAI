import express, { json } from 'express'
import { generate } from './chat.js'
import cors from 'cors'
const app = express()
const port = 3001

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('chat')
})

app.post('/', async (req, res) => {
          const {message, id} = req.body

          if(!message || !id) {
                    return res.status(400).json({message : "All fields are required !!"})
          }

          console.log(message)

          const result = await generate(message, id)

          res.json({message : result, id : id})
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
