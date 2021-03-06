import { toInlineStyles, parse } from '../../core/utils';
import { defaultStyles } from '../../constants';

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function toCell(row, state) {
  return function (_, col) {
    const width = (state.colState[col] || DEFAULT_WIDTH) + 'px';
    const id = `${row}:${col}`;
    const content = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return `
      <div class="cell" 
        contenteditable 
        data-col="${col}" 
        data-id="${id}"
        data-value="${content}"
        data-type="cell"
        style="${styles} width:${width}">
        ${parse(content)}
    </div>`;
  };
}

function toColl({ col, index, width }) {
  return `
  <div class="column" 
    data-type="resizable" 
    data-col="${index}" 
    style="width:${width}">
      ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createRow(index, content, rowState) {
  const height = (rowState[index] || DEFAULT_HEIGHT) + 'px';

  return `
    <div class="row" data-type="resizable" data-row="${index}"  
     style="height:${height}">
      <div class="row-info" >${index ? index : ''}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidthFromState(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: (state[index] || DEFAULT_WIDTH) + 'px',
    };
  };
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1;
  const { colState, rowState } = state;

  const rows = [];

  // main row
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(getWidthFromState(colState))
    .map(toColl)
    .join('');

  rows.push(createRow(null, cols, {}));

  // content rows
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(row, state))
      .join('');

    rows.push(createRow(row + 1, cells, rowState));
  }

  return rows.join('');
}
