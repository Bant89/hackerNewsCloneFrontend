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
    uri: "https://rickandmortyapi.com/graphql/"
  })
});

const GET_CHARACTERS = gql`
  {
    characters {
      results {
        name
        species
      }
    }
  }
`;

type QueryProps = {
  name: string;
  species: string;
};

const Data: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  return (
    <div>
      <ul>
        {data.characters.results.map(({ name, species }: QueryProps) => (
          <li key={name}>
            <p>name {name}</p>
            <p>species: {species}</p>
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
