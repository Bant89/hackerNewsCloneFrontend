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
          about
        }
      }
    }
  }
`;

export const GET_COMMENT = (id: string): DocumentNode => gql`{
  hn {
    item(id: ${id}) {
      id
      by {
        id
      }
      title
      score
      descendants
      timeISO
      kids {
        id
        by {
          id
        }
        timeISO
        text
      }
    }
  }
}`;

export const GET_KIDS = (id: string) : DocumentNode => gql`{
  hn {
    item(id: ${id}) {
      
    }
  }

}`;