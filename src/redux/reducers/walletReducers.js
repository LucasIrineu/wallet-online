// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES, GET_CURRENCIES_LIST, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  let dataToArrayList = [];

  if (action.type === GET_CURRENCIES_LIST) {
    const data = action.payload;
    delete data.USDT;
    dataToArrayList = Object.keys(data);
  }

  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
    };
  case GET_CURRENCIES_LIST:
    return {
      ...state,
      currencies: dataToArrayList,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
