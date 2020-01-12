export enum Categories {
  NEW = "newStories",
  TOP = "topStories",
  SHOW = "showStories",
  ASK = "askStories",
  JOB = "jobStories"
}

export type AuthorType = {
  id: number;
  about: string;
};

export type QueryProps = {
  id: number;
  title: string;
  url: string;
  score: number;
  timeISO: string;
  descendants: number;
  by: AuthorType;
};

export type DataProps = {
  amount: number;
  category: Categories;
};
