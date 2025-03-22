import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 3001

app.use(cors())

app.get('/images', (req, res) => {
  const imagesDir = path.join(__dirname, '../public/images')
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      res.status(500).send('Error reading images')
      return
    }

    const imageFiles = files.filter((f) => /\.(png|jpe?g|gif)$/i.test(f))
    res.json(imageFiles.map((f) => `/images/${f}`))
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
