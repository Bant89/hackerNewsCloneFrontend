import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "../queries";
import { Categories, QueryProps } from "../types";

const List: React.FC<{}> = () => {
  const [category, setCategory] = useState(Categories.TOP);
  const [offset, setOffset] = useState(5);
  const handleClick = (cat: Categories) => {
    setCategory(cat);
  };
  const { loading, error, data } = useQuery(GET_DATA(offset, category));
  if (loading) return <p>Loading...</p>;
  if (data.hn[category] !== undefined) {
    return (
      <div>
        <nav>
          <button
            onClick={() => {
              handleClick(Categories.NEW);
            }}
          >
            New
          </button>
          <button
            onClick={() => {
              handleClick(Categories.ASK);
            }}
          >
            Ask
          </button>
          <button
            onClick={() => {
              handleClick(Categories.TOP);
            }}
          >
            Top
          </button>
          <button
            onClick={() => {
              handleClick(Categories.SHOW);
            }}
          >
            Show
          </button>
          <button
            onClick={() => {
              handleClick(Categories.JOB);
            }}
          >
            Job
          </button>
          <button
            onClick={() => {
              setOffset(offset + 5);
            }}
          >
            Give me more
          </button>
        </nav>
        <ol>
          {data.hn[category].map(({ title, url }: QueryProps) => (
            <li key={title}>
              <p>title {title}</p>
              <p>url: {url}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return <p>Error {error}</p>;
};

export default List;
