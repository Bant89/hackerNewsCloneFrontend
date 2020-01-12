import { gql, DocumentNode } from "@apollo/client";
import { Categories } from "./types";

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
