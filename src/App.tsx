import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import "./App.css";
import List from "./components/List";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <List />
      </div>
    </ApolloProvider>
  );
};

export default App;
