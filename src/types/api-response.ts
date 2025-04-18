import { Article } from "./article";

export interface NYTimesResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: Article[];
}
