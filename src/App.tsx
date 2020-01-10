import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql
} from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
});

const GET_TOP_HISTORIES = gql`
  {
    hn {
      topStories(limit: 2) {
        title
        url
      }
    }
  }
`;

type QueryProps = {
  title: string;
  url: string;
};

const Data: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TOP_HISTORIES);
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
