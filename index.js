const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schematype = require("./schema");
const mongoose = require("mongoose");
let app = express();

mongoose.connect("mongodb://localhost:27017/test-database-1", {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to databse --->");
});
app.use("/graphql", graphqlHTTP({ schema: schematype, graphiql: true }));
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
