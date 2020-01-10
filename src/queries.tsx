import { gql, DocumentNode } from "@apollo/client";

export const GET_TOP_HISTORIES = (amount: number): DocumentNode => gql`
  {
    hn {
      topStories(limit: ${amount}) {
        title
        url
      }
    }
  }
`;

// export const GET_NEW_HISTORIES = gql``;

// export const GET_JOB_HISTORIES = gql``;
