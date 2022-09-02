import { TOTAL_VALUE } from '.';

const totalValueAction = (value) => ({
  type: TOTAL_VALUE,
  payload: value,
});

export default totalValueAction;
