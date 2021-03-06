import React from "react";
import { useQuery } from "@apollo/client";
import { Query } from "react-apollo";
import { useParams } from "react-router-dom";
import { GET_COMMENT, GET_KIDS } from "../../queries"
import { QueryProps, DetailsItemParams, DetailsKidsProps } from "../../types"
import { PHeader, PDetails, A, Author, CommentDetail } from './styles'

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
      <div style={{ backgroundColor: "#f6f6ef", padding: "10px 0 0 20px" }}>
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
 
  let content = { __html: text};
  return (
    <div style={{ marginLeft: '20px'}}>
      <Author>
        {by.id} {formatDate(timeISO)}
      </Author>
      <CommentDetail dangerouslySetInnerHTML={content}></CommentDetail>
    </div>
  );
};

export default Detail;
