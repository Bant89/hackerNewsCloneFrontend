import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useQuery
} from "@apollo/client";
import { GET_TOP_HISTORIES as TOP_STORIES } from "./queries";
import "./App.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
});

type QueryProps = {
  title: string;
  url: string;
};

const Data: React.FC = () => {
  const { loading, error, data } = useQuery(TOP_STORIES(5));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  return (
    <div>
      <ul>
        {data.hn.topStories.map(({ title, url }: QueryProps) => (
          <li key={title}>
            <p>title {title}</p>
            <p>url: {url}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>Normal App</p>
        <Data />
      </div>
    </ApolloProvider>
  );
};

export default App;
