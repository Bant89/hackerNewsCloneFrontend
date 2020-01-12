import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
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
  const Container = styled.div`
    margin: 20px auto;
    width: 80vw;
    outline: 1px solid red;
  `;
  const Nav = styled.nav`
    display: flex;
    background-color: #ff6600;
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
  `;
  const PDetails = styled.p`
    margin: 0;
    display: inline;
    width: auto;
    font-size: 0.8em;
    color: grey;
  `;
  const LI = styled.li`
    text-align: left;
    width: auto;
  `;
  if (data.hn[category] !== undefined) {
    return (
      <Container>
        <Nav>
          <Button
            onClick={() => {
              handleClick(Categories.NEW);
            }}
          >
            New
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.ASK);
            }}
          >
            Ask
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.TOP);
            }}
          >
            Top
          </Button>
          <Button
            onClick={() => {
              handleClick(Categories.SHOW);
            }}
          >
            Show
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
            }}
          >
            Give me more
          </Button>
        </Nav>
        <Ol>
          {data.hn[category].map(
            ({ title, url, score, descendants, timeISO, by }: QueryProps) => (
              <LI key={title}>
                <PHeader>
                  {title} ({url})
                </PHeader>
                <br />
                <PDetails>
                  {score} points by {by.id} {timeISO} ago | hide | {descendants}{" "}
                  comments
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
