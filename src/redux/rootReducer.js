import * as actions from './types';

export function rootReducer(state, { type, data }) {
  switch (type) {
    case actions.TABLE_RESIZE: {
      const resizePart = data.type === 'col' ? 'colState' : 'rowState';

      return {
        ...state,
        [resizePart]: { ...state[resizePart], [data.id]: data.value },
      };
    }

    default:
      return state;
  }
}
