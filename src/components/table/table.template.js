const CODES = {
  A: 65,
  Z: 90,
};

function toCell(cell, index) {
  return `
  <div class="cell" contenteditable data-col="${index}">
    ${cell}
  </div>`;
}

function toColl(col, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>`;
}

function createRow(index, content) {
  return `
    <div class="row" data-type="resizable" >
      <div class="row-info" >${index ? index : ''}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const rows = [];

  // main row
  const cols = new Array(colsCount).fill('').map(toChar).map(toColl).join('');

  rows.push(createRow(null, cols));

  // content rows
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}
