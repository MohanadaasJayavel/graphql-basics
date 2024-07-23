const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schematype = require("./schema");
let app = express();

app.use("/graphql", graphqlHTTP({ schema: schematype, graphiql: true }));
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
