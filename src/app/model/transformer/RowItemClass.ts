import {RowItemChild} from "../RowItemChild";
import {RowItemChildClass} from "./RowItemChildClass";
import {Expose, Type} from "class-transformer";

export class RowItemClass {
  id: string;
  int: number;
  @Expose({name: 'float'})
  private readonly _float: number;
  color: string;
  @Type(() => RowItemChildClass)
  child: RowItemChild;


  constructor(id: string, int: number, float: number, color: string, child: RowItemChild) {
    this.id = id;
    this.int = int;
    this._float = float;
    this.color = color;
    this.child = child;
  }


  get float(): number {
    return Number(this._float.toFixed(18));
  }
}
