/**
 * App actions for redux store
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
export const setDetail = (status, masterDetailId = undefined) => ({
  type: 'SET_DETAIL',
  isDetail: status,
  masterDetailId,
});
export const setScrollState = (route, scrollY, scrollX = 0) => ({
  type: 'SET_SCROLL_STATE',
  route,
  scrollX,
  scrollY,
});

export const setTableState = (route, state) => ({
  type: 'SET_TABLE_STATE',
  route,
  state,
});
