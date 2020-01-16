import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COMMENT } from "../queries";
import { QueryProps, DetailsItemParams } from "../types";

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

const Detail: React.FC<{}> = () => {
  let { id = "1" } = useParams();
  const { loading, error, data } = useQuery(GET_COMMENT(id));

  const PHeader = styled.p`
    margin: 0;
    display: inline;
    width: auto;
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

  if (loading) {
    return <p>Loading...</p>;
  } else {
    let {
      id,
      title,
      url,
      score,
      descendants,
      timeISO,
      by
    }: QueryProps = data.hn.item;
    return (
      <div>
        <PHeader>
          <A href={url} target="_blank">
            {title}
          </A>
        </PHeader>
        <br />
        <PDetails>
          {score} points by {by.id} on {formatDate(timeISO)} ago |{" "}
        </PDetails>
        <PDetails>{descendants} comments</PDetails>
        {data.hn.item.kids.map(({ by, timeISO, text }: DetailsItemParams) => (
          <Comment
            by={by}
            timeISO={timeISO}
            text={text}
            key={id + Math.random() * (1000 - 1) + 1}
          />
        ))}
      </div>
    );
  }
};

const Comment: React.FC<DetailsItemParams> = ({ by, timeISO, text }) => {
  return (
    <div style={{ backgroundColor: "#edd1a4" }}>
      <p>
        {by.id} {formatDate(timeISO)}
      </p>
      <p>{text}</p>
    </div>
  );
};

export default Detail;
