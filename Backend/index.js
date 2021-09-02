const mongoose = require('mongoose');
const {} = require('dotenv/config');
const express = require('express')
const {ApolloServer} = require('apollo-server-express');

const typeDefs = require ('./typeDefs')
const resolvers = require ('./resolvers')

mongoose.connect("mongodb+srv://Renavat:LQX12ylD0ctNa8bq@cluster0.8t8ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,})
  .then(()=>{
      console.log('MongoDB Connected');
  })

  const app = express();

  const server = new ApolloServer({typeDefs, resolvers});
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 8081;
  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });