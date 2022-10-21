require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Chart = require("./models/chart");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/charts", (request, response) => {
  Chart.find({}).then((charts) => {
    response.json(charts);
  });
});
//some problem with the fletch, fix
app.get("/api/charts/:name&:age", (request, response) => {
  const name = String(request.params.name);
  const age = Number(request.params.age);
  console.log(name);

  Chart.find((chart) => chart.name === name && chart.age === age).then(
    (chart) => {
      console.log(chart);
      if (chart) {
        response.json(chart);
        console.log(chart);
      } else {
        response.status(404).end();
      }
    }
  );
});

//finds all matches by name
app.get("/api/charts/:name", (request, response) => {
  const name = String(request.params.name);

  Chart.find({ name }).then((charts) => {
    if (charts) {
      response.json(charts);
    } else {
      response.status(404).end();
    }
  });
});

app.post("/api/charts", (request, response, next) => {
  const maxId = Math.floor(Math.random() * 100);
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const chart = new Chart({
    age: body.age,
    name: body.name,
    weight: body.weight,
  });

  chart
    .save()
    .then((savedChart) => savedChart.toJSON())
    .then((savedAndFormattedChart) => {
      response.json(savedAndFormattedChart);
    })
    .catch((error) => next(error));
});

app.delete("/api/charts/:id", (request, response) => {
  const id = Number(request.params.id);
  charts = charts.filter((chart) => chart.id !== id);

  response.status(204).end();
});

/*
  app.get('/api/charts/:age',(request, response) => {
    const age = String(request.params.age)
    const ages = charts.filter(chart => chart.age === age);
    response.json(ages)
  })*/

//finds match for certain weight & certain name

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//unknown errorhandling
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
