export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }

  return new Array(end - start + 1).fill('').map((_, idx) => start + idx);
}

export function storage(key, data = null) {
  if (data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  return JSON.parse(localStorage.getItem(key));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((style) => `${camelToDashCase(style)} : ${styles[style]}; `)
    .join('');
}
