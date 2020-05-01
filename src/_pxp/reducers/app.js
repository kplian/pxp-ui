/**
 * Reducer to manage application states
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
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
    case 'SET_PAGE':
      return { count: state.count - 1 };
    default:
      return state;
  }
};
