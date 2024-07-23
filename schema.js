const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;
const _ = require("lodash");

let books = [
  { name: "sample book 1", gener: "sample gener 1", id: "1", authorId: "1" },
  { name: "sample book 2", gener: "sample gener 2", id: "2", authorId: "2" },
  { name: "sample book 3", gener: "sample gener 3", id: "3", authorId: "3" },
  { name: "sample book 4", gener: "sample gener 7", id: "4", authorId: "1" },
  { name: "sample book 5", gener: "sample gener 8", id: "5", authorId: "1" },
  { name: "sample book 6", gener: "sample gener 9", id: "6", authorId: "3" },
];

let authors = [
  { name: "Author 1", age: "20", id: "1" },
  { name: "Author 2", age: "20", id: "2" },
  { name: "Author 3", age: "20", id: "3" },
];
const bookSchmeType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    gener: { type: GraphQLString },
    author: {
      type: authorSchemaType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const authorSchemaType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(bookSchmeType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});
const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: bookSchmeType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: authorSchemaType,
      args: { id: { type: graphql.GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(bookSchmeType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(authorSchemaType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: rootQuery,
});
