import { defaultStyles, defaultTitle } from '@/constants';

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles,
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
