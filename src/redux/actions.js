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

export const applyStyle = (data) => {
  return {
    type: actions.APPLY_STYLE,
    data,
  };
};

export const changeTitle = (data) => {
  return {
    type: actions.CHANGE_TITLE,
    data,
  };
};

export const updateDate = () => {
  return {
    type: actions.UPDATE_DATE,
  };
};
