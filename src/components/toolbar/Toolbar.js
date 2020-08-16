import { $ } from '@core/dom';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { renderToolbar } from './toolbar.template';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return renderToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const target = $(event.target);

    if (target.dataset.type === 'button') {
      const value = JSON.parse(target.dataset.value);

      this.$emit('toolbar:applyStyle', value);
    }
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles);
  }
}
