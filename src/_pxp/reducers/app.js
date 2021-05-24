/**
 * Reducer to manage application states
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import _ from 'lodash';

const pagesPxpTableFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('routesPxpTable')) || [];
  let res = {};
  data.forEach((i) => {
    const json = JSON.parse(localStorage.getItem(i));
    res = _.merge(res, json);
  });
  return res;
};

const defaultState = {
  detailPage: {
    isDetail: false,
    masterDetailId: undefined,
  },
  pages: {},
  pagesPxpTable: pagesPxpTableFromLocalStorage(),
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
    case 'SET_PXP_TABLE_STATE':
      return _.merge(state, {
        pagesPxpTable: {
          [action.route]: { [action.tableName]: action.state },
        },
      });
    default:
      return state;
  }
};
