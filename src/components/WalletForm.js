import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesAction from '../redux/actions/currenciesAction';
import totalValueAction from '../redux/actions/totalValueAction';
import addExpenseAction from '../redux/actions/addExpenseAction';
import fetchCurrencies from '../services/api';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Comida',
    expenses: [],
  };

  componentDidMount() {
    const { fetchCurrenciesRedux } = this.props;
    fetchCurrenciesRedux();
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  calcTotalValue = async (array) => {
    const MAXIMUM_DECIMAL_LENGTH = 20;
    const OPTIMAL_DECIMAL_LENGTH = -18;

    const newTotalArray = array.map((element) => {
      const { currency } = element;
      return Number(element.exchangeRates[currency].ask) * element.value;
    });

    const newTotalValue = newTotalArray
      .reduce((acc, curr) => Number(acc) + Number(curr))
      .toFixed(MAXIMUM_DECIMAL_LENGTH).slice(0, OPTIMAL_DECIMAL_LENGTH);

    const { setTotalValue } = this.props;
    await setTotalValue(newTotalValue);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { value, description, currency,
      method, tag, expenses } = this.state;
    const currenciesInfo = await fetchCurrencies();

    const expenseToAdd = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesInfo,
    };

    const newExpensesArray = [...expenses, expenseToAdd];
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Comida',
      expenses: newExpensesArray,
    });

    this.calcTotalValue(newExpensesArray);
    const { addExpense } = this.props;
    await addExpense(newExpensesArray);
  };

  render() {
    const { currency, method, tag, value, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              id="value-input"
              value={ value }
              name="value"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              value={ description }
              name="description"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleInput }
            >
              {currencies.map((currencyy) => (
                <option value={ currencyy } key={ currencyy }>
                  { currencyy }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method-input"
              value={ method }
              name="method"
              onChange={ this.handleInput }
            >

              <option value="Dinheiro">
                Dinheiro
              </option>

              <option value="Cartão de crédito">
                Cartão de crédito
              </option>

              <option value="Cartão de débito">
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
              name="tag"
              onChange={ this.handleInput }
            >
              <option value="Comida">
                Alimentação
              </option>

              <option value="Lazer">
                Lazer
              </option>

              <option value="Trabalho">
                Trabalho
              </option>

              <option value="Transporte">
                Transporte
              </option>

              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>

          <button type="button" onClick={ this.handleSubmit }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrenciesRedux: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  setTotalValue: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

WalletForm.defaultProps = {
  currencies: [],
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesRedux: () => dispatch(fetchCurrenciesAction()),
  addExpense: (array) => dispatch(addExpenseAction(array)),
  setTotalValue: (value) => dispatch(totalValueAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
