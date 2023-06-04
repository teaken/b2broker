import {Component} from '@angular/core';
import {Subject, takeLast, takeUntil} from "rxjs";
import {RowItem} from "../../model/RowItem";
import {plainToInstance} from "class-transformer";
import {RowItemClass} from "../../model/transformer/RowItemClass";
import { PseudoSocketService } from 'src/app/services/pseudo-socket.service';

@Component({
  selector: 'app-data-wrapper',
  templateUrl: './data-wrapper.component.html',
  styleUrls: ['./data-wrapper.component.css']
})
export class DataWrapperComponent {
  public timerInterval: number = 1000;
  public dataSize: number = 10;
  arrayIds: any;

  public lastData: RowItemClass[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private pseudoSocketService: PseudoSocketService) {
  }

  public startPseudoSocket(): void {
    this.pseudoSocketService.startPseudoSocket(this.timerInterval, this.dataSize);
    this.pseudoSocketService
      .getWorkerDataStream()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: RowItem[]) => {
        this.lastData = plainToInstance(RowItemClass, data);
      });
  }

  public stopPseudoSocket(): void {
    this.pseudoSocketService.stopPseudoSocket();
    this.lastData = [];
  }

  public updateTimerInterval(): void {
    this.pseudoSocketService.updateTimerInterval(this.timerInterval);
  }

  public updateDataSize(): void {
    this.pseudoSocketService.updateDataSize(this.dataSize);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopPseudoSocket();
  }

  updateArrayIds() {
    let parsedIntegerList = this.arrayIds.split(',').map(Number);
    this.pseudoSocketService.updateTableIds(parsedIntegerList);
  }
}
