export enum Categories {
  NEW = "newStories",
  TOP = "topStories",
  SHOW = "showStories",
  ASK = "askStories",
  JOB = "jobStories"
}

export type QueryProps = {
  title: string;
  url: string;
};

export type DataProps = {
  amount: number;
  category: Categories;
};
