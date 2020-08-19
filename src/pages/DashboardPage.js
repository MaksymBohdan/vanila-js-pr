import { Page } from '../core/Page';
import { $ } from '../core/dom';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
    <div class="db__header">
    <h1>Excel dashboard</h1>
  </div>

  <!-- NEW -->
  <div class="db__new">
    <div class="db__view">
      <a href="#" class="db__create">
        New <br />
        table
      </a>
    </div>
  </div>

  <!-- TABLE -->
  <div class="db__table db__view">
    <div class="db__list-header">
      <span>Name</span>
      <span>Open date</span>
    </div>

    <ul class="db__list">
      <li class="db__record">
        <a href="#">Table number 1 </a>
        <strong>12.12.12</strong>
      </li>

      <li class="db__record">
        <a href="#">Table number 2</a>
        <strong>12.12.12</strong>
      </li>
    </ul>
  </div>
    `);
  }
}
