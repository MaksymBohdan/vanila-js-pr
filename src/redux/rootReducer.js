import * as actions from './types';

export function rootReducer(state, { type, data }) {
  switch (type) {
    case actions.TABLE_RESIZE: {
      return {
        ...state,
        colState: { ...state.colState, [data.id]: data.value },
      };
    }
    default:
      return state;
  }
}
