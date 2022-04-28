const express = require('express')
const app = express()

let charts = [
    {Age:"0",Weight:3.950, Name:"Ninni"},
    {Age:"1", Weight:4.76, Name:"Ninni"},
    {Age:"2", Weight:5.285, Name:"Ninni"}
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/charts',(req, res) => {
    res.json(charts)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })