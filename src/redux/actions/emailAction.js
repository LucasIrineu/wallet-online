import { EMAIL } from '.';

const emailAction = (inputEmail) => ({
  type: EMAIL,
  payload: inputEmail,
});

export default emailAction;
