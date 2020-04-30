export const setDetail = (status, masterDetailId = undefined) => ({
  type: 'SET_DETAIL',
  isDetail: status,
  masterDetailId,
});
export const setPage = ({ page, pageStatus }) => ({
  type: 'SET_PAGE',
  [page]: pageStatus,
});
