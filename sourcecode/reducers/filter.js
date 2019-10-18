import actions from 'actions/filterActions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  education: {
    temp: {
      establishment: {
        slug: '',
        title: 'Välj utbildningstyp',
      },
      location: {
        slug: '',
        title: 'Välj studieort',
      },
      subject: {
        slug: '',
        title: 'Välj ämne',
      },
      studietakt: {
        slug: '',
        title: 'Välj Studietakt',
      },
    },
    active: {
      establishment: {
        slug: '',
        title: 'Välj utbildningstyp',
      },
      location: {
        slug: '',
        title: 'Välj studieort',
      },
      subject: {
        slug: '',
        title: 'Välj ämne',
      },
      studietakt: {
        slug: '',
        title: 'Välj Studietakt',
      },
    },
  },
  press: {
    active: 'Alla',
    Alla: {
      type: '',
      size: 4,
      offset: 0,
    },
  },
});

const setPressFilter = (state, action) => {
  return state.set('press', action.filter);
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH_SET_TEMP_FILTER:
      return state.setIn(['education', 'temp'], action.filter);
    case actions.SEARCH_SET_FILTER:
      return state.setIn(
        ['education', 'active'], state.getIn(['education', 'temp'])
      );
    case actions.PRESS_SET_FILTER:
      return setPressFilter(state, action);
    default:
      return state;
  }
};

export default filter;
