require("dotenv").config();

const path = require("path");
const express = require("express"); // npm installed
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/client/dist")));
// other configuration...
app.use((req, res, next) => {
  req.headers.Authorization = process.env.AUTH;
  next();
});
axios.defaults.headers.common['Authorization'] = process.env.AUTH
//routes
app.get("/*", (req, res) => {

    console.log("headers: ", req.headers);
    console.log("method: ", req.method);
    console.log("req.url: ", req.url);
    console.log("req.body: ", req.body);
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, {
        headers: {
          Authorization: process.env.AUTH,
        },
      })

      .then((result) => res.status(200).send(result.data))
      .catch((err) => res.sendStatus(404));
  });

app.post('/*', (req, res) => {
  console.log(req.body)
  axios
  .post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, req.body, {
    headers: {
      Authorization: process.env.AUTH,
    },
  })

  .then((result) => res.sendStatus(200))
  .catch((err) => res.sendStatus(404));
})

// app.put("/*", (req, res) => {
//   axios
//     .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`, {
//       headers: {
//         Authorization: process.env.AUTH,
//       },
//     })
//     .then((result) => res.status(200).send(result.data))
//     .catch((err) => res.sendStatus(404));
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Server listening at http://localhost:${PORT}`);

// {
//   "product_id": 40344,
//   "rating": 4,
//   "summary": "Thought this product did it's job",
//   "body": "Overall, love it. Would recommend to most people. Think that it could use more style options",
//   "recommend": true,
//   "name": "Isaac",
//   "email": "blahblah@gmail.com",
//   "photos": [],
//   "characteristics": {}
// }