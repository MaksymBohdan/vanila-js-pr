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

    case actions.SET_VALUE: {
      return {
        ...state,
        currentText: data.value,
        dataState: { ...state.dataState, [data.id]: data.value },
      };
    }

    case actions.CHANGE_STYLES: {
      return {
        ...state,
        currentStyles: { ...data },
      };
    }

    case actions.APPLY_STYLE: {
      const newStyles = data.ids.reduce(
        (acc, id) => ({
          ...acc,
          [id]: { ...state.stylesState[id], ...data.value },
        }),
        {}
      );

      return {
        ...state,
        stylesState: { ...newStyles },
        currentStyles: { ...state.currentStyles, ...data.value },
      };
    }

    case actions.CHANGE_TITLE: {
      console.log('title', data);
      return {
        ...state,
        title: data,
      };
    }

    default:
      return state;
  }
}
