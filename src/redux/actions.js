import * as actions from './types';

export const resizeTable = (data) => {
  return {
    type: actions.TABLE_RESIZE,
    data,
  };
};

export const setValue = (data) => {
  return {
    type: actions.SET_VALUE,
    data,
  };
};

export const changeStyles = (data) => {
  return {
    type: actions.CHANGE_STYLES,
    data,
  };
};
