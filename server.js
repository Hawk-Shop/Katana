require("dotenv").config();

const path = require("path")
const express = require("express"); // npm installed

const app = express();

app.use(express.static(path.join(__dirname, "/client/dist")));
// other configuration...

const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`Server listening at http://localhost:${PORT}`);