import { UPDATE_EXPENSES } from '.';

const updateExpensesAction = (action) => ({
  type: UPDATE_EXPENSES,
  payload: action,
});

export default updateExpensesAction;
