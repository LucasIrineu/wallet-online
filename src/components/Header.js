import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalValue } = this.props;
    return (
      <header>
        <h5 data-testid="email-field">
          { userEmail }
        </h5>
        <h5>
          Total das Despesas:
        </h5>
        <h4 data-testid="total-field">
          { totalValue }
        </h4>
        <h4 data-testid="header-currency-field">
          BRL
        </h4>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalValue: PropTypes.string,
};

Header.defaultProps = {
  totalValue: '0',
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);
