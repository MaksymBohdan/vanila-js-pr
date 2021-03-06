import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';
import { Loader } from '../../components/loader/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('#selector is not provided to Routers');
    }

    this.placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.page = null;
    this.loader = new Loader();

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.placeholder.clear();
    this.placeholder.append(this.loader);

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();

    this.placeholder.clear();
    this.placeholder.append(root);

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
