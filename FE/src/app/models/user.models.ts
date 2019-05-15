export interface UserDetailModel {
  _id: string;
  text: string;
  result: Array<ResultModel>;
}
export interface ResultModel {
  [t: string]: number;
}
