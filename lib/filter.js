export default class Filter {
  constructor() {
    this.filters = {};
  }

  clear() {
    this.filters = {};
    if (this.onChange) this.onChange(this.filters);
  }

  define(key, value) {
    this.filters[key] = value;
    if (this.onChange) this.onChange(this.filters);
  }
}
