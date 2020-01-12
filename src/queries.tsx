import { gql, DocumentNode } from "@apollo/client";
import { Categories } from "./types";

export const GET_DATA = (
  offset: number,
  category: Categories
): DocumentNode => gql`
  {
    hn {
      ${category} (limit: 30, offset: ${offset}) {
        id
        title
        url
        score
        timeISO
        descendants
        by {
          id
        }
      }
    }
  }
`;
