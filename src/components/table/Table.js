import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import { isCell, shouldResize } from './table.functions';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  init() {
    super.init();

    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    console.log('event', event.ctrlKey);
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    }

    //  event.shiftKey

    if (isCell(event)) {
      const $target = $(event.target);

      this.selection.select($target);
    }
  }
}
