export class Page {
  constructor(params) {
    this.params = params || Date.now().toString();
  }

  afterRender() {}

  destroy() {}
}
