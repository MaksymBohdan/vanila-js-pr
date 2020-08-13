import { storage } from '@core/utils';

export const defaultState = {
  rowState: {},
  colState: {},
  currentText: '',
  dataState: {},
};

export const initialState = storage('excel_data')
  ? storage('excel_data')
  : defaultState;
