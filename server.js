require("dotenv").config();

const path = require("path")
const express = require("express"); // npm installed

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(path.join(__dirname, "/client/dist")));
// other configuration...
app.use((req, res, next) => {
  req.headers.Authorization = process.env.AUTH
  next()
})

//routes
app.get('/test', (req, res) => {
  console.log(req.headers)
  res.send('hi')
})

app.post('/test', (req, res) => {
  console.log(req.headers)
  res.send('hi')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Server listening at http://localhost:${PORT}`);