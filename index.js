const express = require("express");
const app = express();

//create route handler and assocaite it with a route
//root handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;

app.listen(5000);