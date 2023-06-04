import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PseudoSocketService {

  private timerInterval: number;
  private dataSize: number;

  private worker: Worker;

  constructor() {
    this.timerInterval = 1000;
    this.dataSize = 10;
    this.worker = new Worker(new URL('../worker/worker', import.meta.url));
  }

  public startPseudoSocket(timerInterval: number, dataSize: number): void {
    this.timerInterval = timerInterval;
    this.dataSize = dataSize;
    this.worker.postMessage({message: 'start', timerInterval, dataSize});
  }

  public stopPseudoSocket(): void {
    this.worker.postMessage({message: 'stop'});
  }

  public updateTimerInterval(timerInterval: number): void {
    this.timerInterval = timerInterval;
    this.worker.postMessage({message: 'update', timerInterval: timerInterval, dataSize: this.dataSize});
  }

  updateTableIds(arrayIds: number[]) {
    this.worker.postMessage({message: 'update', timerInterval: this.timerInterval, dataSize: 10, ids: arrayIds});
  }

  updateDataSize(dataSize: number) {
    this.worker.postMessage({message: 'update', timerInterval: this.timerInterval, dataSize: dataSize});
  }

  public getWorkerDataStream(): Observable<any> {
    return new Observable<any>((observer) => {
      this.worker.addEventListener('message', (event: MessageEvent) => {
        console.time("test_timer");
        const data: any[] = event.data;
        const lastTen = data.slice(-10);
        console.timeEnd("test_timer");
        observer.next(lastTen);
      });
      return () => {
        this.worker.terminate();
      };
    });
  }
}
