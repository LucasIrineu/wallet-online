import { ADD_EXPENSE } from '.';

const addExpenseAction = (action) => ({
  type: ADD_EXPENSE,
  payload: action,
});

export default addExpenseAction;
