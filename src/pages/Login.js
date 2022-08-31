import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import emailAction from '../redux/actions/emailAction';

class Login extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  state = {
    email: '',
    validEmail: false,
    passwordLength: 0,
    submitted: false,
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
      validEmail: value.includes('@') && value.includes('.com'),
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    // const { dispatch } = this.props;
    const { email } = this.state;
    // dispatch(emailAction(email));
    const { logUser } = this.props;
    await logUser(email);
    this.setState({ submitted: true });
  };

  handlePassword = ({ target: { value } }) => {
    this.setState({ passwordLength: value.length });
  };

  validatePassword = () => {
    const { passwordLength } = this.state;
    const MIN_LENGTH = 6;
    return passwordLength >= MIN_LENGTH;
  };

  handleButton = () => {
    const { validEmail } = this.state;
    const isEmailAndPasswordValid = this.validatePassword() && validEmail;
    return isEmailAndPasswordValid;
  };

  render() {
    const { submitted } = this.state;

    if (submitted) return <Redirect to="/carteira" />;
    return (
      <div>
        <form>
          <label htmlFor="input-name">
            Email:
            <input
              type="email"
              data-testid="email-input"
              id="input-name"
              name="email"
              onChange={ this.handleInput }
              required
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              id="input-password"
              name="password"
              onChange={ this.handlePassword }
              required
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            disabled={ !this.handleButton() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logUser: (email) => dispatch(emailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
