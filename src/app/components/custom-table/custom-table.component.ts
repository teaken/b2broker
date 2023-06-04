import {Component, Input, OnInit} from '@angular/core';
import {RowItemClass} from "../../model/transformer/RowItemClass";
import {RowItemChildClass} from "../../model/transformer/RowItemChildClass";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() data: any[] | RowItemClass[] | RowItemChildClass[]  | /**/undefined;
  @Input() columns: string[] | undefined;
  @Input() nestedColumns: string[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
