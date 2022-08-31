import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <div>
          <h5 data-testid="email-field">
            {userEmail}
          </h5>
          <h5 data-testid="total-field">
            0
          </h5>
          <h4 data-testid="header-currency-field">
            BRL
          </h4>
        </div>
      </header>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
