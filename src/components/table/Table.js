import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableSelection } from './TableSelection';
import { isCell, shouldResize, matrix, nextSelector } from './table.functions';
import { resizeTable, setValue, changeStyles } from '../../redux/actions';
import { defaultStyles } from '../../constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    const state = this.store.getState();

    return createTable(20, state);
  }

  init() {
    super.init();

    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');

    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
      this.updateTextInStore(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style);
    });
  }

  async tableResize(event) {
    try {
      const data = await resizeHandler(event, this.$root);

      this.$dispatch(resizeTable(data));
    } catch (e) {
      console.warn(e);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event);
    }

    if (isCell(event)) {
      const $target = $(event.target);

      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    const { key } = event;
    if (keys.includes(key)) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));

      this.selectCell($next);
    }
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(changeStyles(styles));
  }

  updateTextInStore(value) {
    this.$dispatch(setValue({ id: this.selection.current.id(), value }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
