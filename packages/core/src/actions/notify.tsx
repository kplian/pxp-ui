export const NEW_NOTIFY = '[NOTIFY] new notify';
export const RECEIVED_NOTIFY = '[NOTIFY] received notify';

export const newNotifyAction = (data) => ({
  type: NEW_NOTIFY,
  payload: data,
});

export const receivedNotifyAction = () => ({
  type: RECEIVED_NOTIFY,
});
