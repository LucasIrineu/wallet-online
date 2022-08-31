import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import emailAction from '../redux/actions/emailAction';

class Login extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
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

  handleClick = () => {
    const { email } = this.state;
    // const { dispatch } = this.props;
    // dispatch(emailAction(email));
    const { logUser } = this.props;
    logUser(email);
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
              data-testid="email-input"
              id="input-name"
              type="email"
              name="email"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="password-input">
            Senha:
            <input
              data-testid="password-input"
              id="input-password"
              type="password"
              name="password"
              onChange={ this.handlePassword }
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
