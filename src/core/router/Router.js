import { $ } from '@core/dom';
import { ActiveRoute } from './ActiveRoute';
// import { Page } from '../Page';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('#selector is not provided to Routers');
    }

    this.placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.page = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    this.placeholder.clear();
    this.placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
