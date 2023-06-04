import {RowItem} from "../model/RowItem";

let timer: any;
let pseudoSocketData: RowItem[] = [];
self.addEventListener('message', (event: any) => {
  const {message, timerInterval, dataSize, ids} = event.data;
  if (timer){
    clearInterval(timer);
  }
  if (message !== 'stop') {
    if (message !== 'update') {
      timer = setInterval(() => {
        pseudoSocketData = generateDataList(undefined, dataSize);
        self.postMessage(pseudoSocketData);
      }, timerInterval);
    } else {
      clearInterval(timer);
      timer = setInterval(() => {
        pseudoSocketData = generateDataList(ids, dataSize);
        self.postMessage(pseudoSocketData);
      }, timerInterval);
    }
  }

  function generateDataList(ids: number[] = [], size: number) {
    const list: RowItem[] = new Array(size + ids.length);
    for (let i = 0; i < size - ids.length; i++) {
      list[i] = generatePseudoSocketData();
    }
    for (let i = size; i < size + ids.length; i++) {
      list[i] = generatePseudoSocketData(ids[i]);
    }

    return list;
  }

  function generatePseudoSocketData(id: number = 0) {
    const item: RowItem = {
      id: id > 0 ? String(id) : String(Math.floor((Math.random() * 1000000) + 1)),
      int: Math.floor((Math.random() * Number.MAX_SAFE_INTEGER - 1) + 1),
      float: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      child: {
        id: String(Math.floor((Math.random() * 1000000) + 1)),
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    };
    return item;
  }
});

const colors = ['red', 'grey', 'blue', 'yellow', 'green', 'purple', 'pink', 'orange']
