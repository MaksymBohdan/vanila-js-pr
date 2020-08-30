import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '../../redux/actions';
import { debounce } from '../../core/utils';
import { ActiveRoute } from '../../core/router/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const { title } = this.store.getState();
    return `
    <input class="input" type="text" value="${title}" />

    <div>
      <div class="button" data-button="remove">
        <i class="material-icons" data-button="remove">delete</i>
      </div>

      <div class="button" data-button="exit">
        <i class="material-icons" data-button="exit">exit_to_app</i>
      </div>
    </div>
   `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.dataset.button === 'remove') {
      const decision = confirm('are you sure ?');
      if (decision) {
        console.log('excel:${ActiveRoute.param}', `excel:${ActiveRoute.param}`);
        localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.dataset.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
