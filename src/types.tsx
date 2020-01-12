export enum Categories {
  NEW = "newStories",
  TOP = "topStories",
  SHOW = "showStories",
  ASK = "askStories",
  JOB = "jobStories"
}

export type NavDataProps = {
  start: number;
  offset: number;
  setOffset: (x: number) => void;
  setStart: (x: number) => void;
  setCategory: (x: Categories) => void;
};

export type ListDataProps = {
  start: number;
  offset: number;
  category: Categories;
};

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
