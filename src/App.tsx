import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { Categories } from "./types";
import styled from "styled-components";
import Nav from "./components/Nav";
import List from "./components/List";
import Detail from "./components/Detail";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
});

const App: React.FC = () => {
  const [category, setCategory] = useState(Categories.TOP);
  const [offset, setOffset] = useState(0);
  const [start, setStart] = useState(1);
  const Div = styled.div`
    margin: 10px auto;
    width: 85vw;
  `;
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Div>
            <Route path="/">
              <Nav
                start={start}
                offset={offset}
                setOffset={setOffset}
                setStart={setStart}
                setCategory={setCategory}
              />
            </Route>
            <Route exact path="/">
              <List start={start} offset={offset} category={category} />
            </Route>
            <Route path="/comment/:id">
              <Detail></Detail>
            </Route>
          </Div>
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
