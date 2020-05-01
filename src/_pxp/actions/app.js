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
export const setPage = ({ page, pageStatus }) => ({
  type: 'SET_PAGE',
  [page]: pageStatus,
});
