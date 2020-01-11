import { gql, DocumentNode } from "@apollo/client";

enum Categories {
  NEW = "newStories",
  TOP = "topStories",
  SHOW = "showStories",
  ASK = "askStories",
  JOB = "jobStories"
}

export const GET_DATA = (
  offset: number,
  category: Categories
): DocumentNode => gql`
  {
    hn {
      ${category} (limit: 5, offset: ${offset}) {
        title
        url
        type
        timeISO
        score
        descendants
      }
    }
  }
`;
