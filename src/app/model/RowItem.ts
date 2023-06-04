import {RowItemChild} from "./RowItemChild";

export interface RowItem {
  id: string;
  int: number;
  float: number;
  color: string;
  child: RowItemChild;
}
