import { NEW_NOTIFY, RECEIVED_NOTIFY } from '../actions/notify';

const initialState = {
  data: null,
  newNotify: false,
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_NOTIFY: {
      return {
        ...state,
        data: { ...action.payload },
        newNotify: true,
      };
    }
    case RECEIVED_NOTIFY: {
      return {
        ...state,
        data: null,
        newNotify: false,
      };
    }
    default:
      return { ...state };
  }
};

export default notifyReducer;
