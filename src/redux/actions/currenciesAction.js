import fetchCurrencies from '../../services/api';
import { REQUEST_CURRENCIES, GET_CURRENCIES_LIST, FAILED_REQUEST } from '.';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES_LIST,
  payload: currencies,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const fetchCurrenciesAction = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const currencies = await fetchCurrencies();
    if (!currencies) throw new Error('Não foi possivel recuperar os dados da API');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default fetchCurrenciesAction;
