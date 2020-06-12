/**
 * Reducer to manage application states
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import _ from 'lodash';

const defaultState = {
  detailPage: {
    isDetail: false,
    masterDetailId: undefined,
  },
  pages: {},
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DETAIL':
      return {
        ...state,
        detailPage: {
          isDetail: action.isDetail,
          masterDetailId: action.masterDetailId,
        },
      };
    case 'SET_SCROLL_STATE':
      return _.merge(state, {
        pages: {
          [action.route]: { scrollX: action.scrollX, scrollY: action.scrollY },
        },
      });
    case 'SET_TABLE_STATE':
      return _.merge(state, {
        pages: {
          [action.route]: { table: action.state },
        },
      });
    default:
      return state;
  }
};
