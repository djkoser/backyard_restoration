require("dotenv").config();
const { getGrowingParams } = require("./server/growingCalculations");
const massive = require("massive");
const { PORT, POSTGRES_PASSWORD } = process.env;
const express = require("express");
const app = express();

massive({
  host: "localhost",
  port: 5432,
  database: "backyard_restoration",
  user: "postgres",
  password: POSTGRES_PASSWORD,
  ssl: false,
  poolSize: 10
}).then(async (dbInstance) => {
  app.set("db", dbInstance);
  app.listen(PORT, () => console.log(`DB Mounted and Server Connected on Port ${PORT}`));
  console.log(await getGrowingParams("55912", "1500 9th st nw", "austin", "mn", app.get("db")));
});
