import React from "react";
import styled from "styled-components";
import { Categories, NavDataProps } from "../types";

const Nav: React.FC<NavDataProps> = ({
  offset,
  start,
  setOffset,
  setStart,
  setCategory
}) => {
  const Container = styled.nav`
    display: flex;
    background-color: #ff6600;
    padding: 0.5em;
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

  const handleClick = (cat: Categories) => {
    setCategory(cat);
  };
  return (
    <Container>
      <Button
        onClick={() => {
          setOffset(0);
          setStart(1);
          handleClick(Categories.TOP);
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
    </Container>
  );
};

export default Nav;
