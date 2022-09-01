import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesAction from '../redux/actions/currenciesAction';

class WalletForm extends Component {
  state = {
    selectedCurrency: 'USD',
    paymentMethod: 'money',
    tag: 'food',
  };

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { selectedCurrency, paymentMethod, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value-input">
            Valor:
            <input type="number" data-testid="value-input" id="value-input" />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input type="text" data-testid="description-input" id="description-input" />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              name="selectedCurrency"
              value={ selectedCurrency }
              onChange={ this.handleInput }
            >
              {currencies.map((currency) => (
                <option value={ currency } key={ currency }>
                  { currency }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method-input"
              value={ paymentMethod }
              name={ paymentMethod }
              onChange={ this.handleInput }
            >

              <option value="money">
                Dinheiro
              </option>

              <option value="creditCard">
                Cartão de crédito
              </option>

              <option value="debitCard">
                Cartão de débito
              </option>

            </select>
          </label>

          <label htmlFor="tag-input">
            Tag:
            <select
              data-testid="tag-input"
              id="tag-input"
              value={ tag }
              name={ tag }
              onChange={ this.handleInput }
            >
              <option value="food">
                Alimentação
              </option>

              <option value="leisure">
                Lazer
              </option>

              <option value="work">
                Trabalho
              </option>

              <option value="transportation">
                Transporte
              </option>

              <option value="health">
                Saúde
              </option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

WalletForm.defaultProps = {
  currencies: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
