import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
  title: defaultTitle,
};

const normalize = (state) => ({
  ...state,
  currentText: '',
  currentStyles: defaultStyles,
});

export const initialState = storage('excel_data')
  ? normalize(storage('excel_data'))
  : defaultState;
