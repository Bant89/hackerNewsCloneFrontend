import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_DATA } from "../queries";
import { Categories, QueryProps, ListDataProps } from "../types";

const List: React.FC<ListDataProps> = ({
  start,
  offset = 1,
  category = Categories.NEW
}) => {
  const { loading, error, data } = useQuery(GET_DATA(offset, category));
  if (loading) return <p>Loading...</p>;

  const Ol = styled.ol`
    background-color: rgb(246, 246, 239);
    margin: 0;
  `;
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
  const LI = styled.li`
    margin-bottom: 5px;
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
    );
  }

  return <p>Error {error}</p>;
};

export default List;
