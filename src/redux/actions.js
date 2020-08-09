import * as actions from './types';

export const resizeTable = (data) => {
  return {
    type: actions.TABLE_RESIZE,
    data,
  };
};
