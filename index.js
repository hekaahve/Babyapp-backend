const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
//TODO integrate to angular application. Continue from part 
//Consuming our Express-API in an Angular Application
let charts = [
    {id:1, age:"0",weight:3.950, name:"ninni"},
    {id:2, age:"1", weight:4.76, name:"ninni"},
    {id:3, age:"2", weight:5.285, name:"ninni"},
    {id:4, age:"2", weight:5.285, name:"testi"}
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/charts',(request, response) => {
    response.json(charts)
  })

  app.get('/api/charts/:name&:age', (request, response) => {
    const name = String(request.params.name)
    const age = String(request.params.age)
    console.log(name)
    const chart = charts.find(chart => chart.name === name && chart.age === age)
    console.log(chart)
    if (chart){
      response.json(chart)
      console.log(chart)
    } else {
      response.status(404).end()
    }
  })

//finds all matches by name
 app.get('/api/charts/:name',(request, response) => {
    const name = String(request.params.name)
    const names = charts.filter(chart => chart.name === name);

    if (names.length>0){
      response.json(names)
    } else {
      response.status(404).end()
    }
  })

  app.post('/api/charts',(request, response) => {
    const maxId = Math.floor(Math.random() * 100)
    const chart = request.body

    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    /*const chart = new Chart({
    age: body.age
    name: body.name,
    weight: body.weight,
    id: maxId
  })*/

    console.log(chart)
    response.json(chart)
  })

  app.delete('/api/charts/:id', (request, response) => {
    const id = Number(request.params.id)
    charts = charts.filter(chart => chart.id !== id)
  
    response.status(204).end()
  })

  /*
  app.get('/api/charts/:age',(request, response) => {
    const age = String(request.params.age)
    const ages = charts.filter(chart => chart.age === age);
    response.json(ages)
  })*/

//finds match for certain weight & certain name

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//unknown errorhandling
app.use(unknownEndpoint)
  
const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })