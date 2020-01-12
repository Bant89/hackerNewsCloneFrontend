import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_DATA } from "../queries";
import { Categories, QueryProps } from "../types";

const List: React.FC<{}> = () => {
  const [category, setCategory] = useState(Categories.TOP);
  const [offset, setOffset] = useState(0);
  const [start, setStart] = useState(1);
  const handleClick = (cat: Categories) => {
    setCategory(cat);
  };
  const { loading, error, data } = useQuery(GET_DATA(offset, category));
  if (loading) return <p>Loading...</p>;
  const Container = styled.div`
    margin: 10px auto;
    width: 85vw;
    outline: 1px solid red;
  `;
  const Nav = styled.nav`
    display: flex;
    background-color: #ff6600;
    padding: 0.5em;
  `;
  const Ol = styled.ol`
    background-color: rgb(246, 246, 239);
    margin: 0;
  `;
  const PHeader = styled.p`
    margin: 0;
    display: inline;
    width: auto;
  `;
  const Button = styled.button`
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding: 0 5px;
  `;
  const PDetails = styled.p`
    margin: 0;
    display: inline;
    width: auto;
    font-size: 0.8em;
    color: grey;
  `;
  const A = styled.a`
    text-decoration: none;
    color: #333;
  `;
  const LI = styled.li`
    text-align: left;
    width: auto;
  `;
  const formatDate = (str: string): string => {
    let dt = str.split(/[: T-]/).map(parseFloat);
    return new Date(
      dt[0],
      dt[1] - 1,
      dt[2],
      dt[3] || 0,
      dt[4] || 0,
      dt[5] || 0,
      0
    ).toDateString();
  };
  if (data.hn[category] !== undefined) {
    return (
      <Container>
        <Nav>
          <Button
            onClick={() => {
              setOffset(0);
              setStart(1);
            }}
          >
            <b>Hacker News</b>
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.NEW);
            }}
          >
            New |
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.ASK);
            }}
          >
            Ask |
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.TOP);
            }}
          >
            Top |
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.SHOW);
            }}
          >
            Show |
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.JOB);
            }}
          >
            Job
          </Button>
          <Button
            onClick={() => {
              setOffset(offset + 5);
              setStart(start + 30);
            }}
          >
            Give me more
          </Button>
        </Nav>
        <Ol start={start}>
          {data.hn[category].map(
            ({ title, url, score, descendants, timeISO, by }: QueryProps) => (
              <LI key={title}>
                <PHeader>
                  <A href={url} target="_blank">
                    {title}
                  </A>
                </PHeader>
                <br />
                <PDetails>
                  {score} points by {by.id} on {formatDate(timeISO)} ago |{" "}
                  {descendants} comments
                </PDetails>
              </LI>
            )
          )}
        </Ol>
      </Container>
    );
  }

  return <p>Error {error}</p>;
};

export default List;
