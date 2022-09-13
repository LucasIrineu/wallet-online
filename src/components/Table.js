import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import updateExpensesAction from '../redux/actions/updateExpensesAction';
import totalValueAction from '../redux/actions/totalValueAction';

class Table extends Component {
  fixDecimals = (value) => {
    const result = parseFloat(value)
      .toFixed(2);

    return result;
  };

  deleteExpenses = async (id) => {
    const { expenses, updateExpenses } = this.props;
    const filteredExpensesArray = expenses.filter((element) => element.id !== id);
    await updateExpenses(filteredExpensesArray);
    await this.calcTotalValue(filteredExpensesArray);
  };

  calcTotalValue = async (array) => {
    const { setTotalValue } = this.props;
    if (array) {
      const MAXIMUM_DECIMAL_LENGTH = 20;
      const OPTIMAL_DECIMAL_LENGTH = -18;

      const newTotalArray = array.map((element) => {
        const { currency } = element;
        return Number(element.exchangeRates[currency].ask) * element.value;
      });
      if (newTotalArray.length > 0) {
        const newTotalValue = newTotalArray
          .reduce((acc, curr) => Number(acc) + Number(curr))
          .toFixed(MAXIMUM_DECIMAL_LENGTH).slice(0, OPTIMAL_DECIMAL_LENGTH);

        await setTotalValue(newTotalValue);
      } else {
        await setTotalValue('0.00');
      }
    }
  };

  render() {
    const tableHeaders = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              {tableHeaders.map((element) => (
                <th key={ element }>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const { description, tag, method,
                value, currency, id, exchangeRates } = expense;
              const { name, ask } = exchangeRates[currency];
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{this.fixDecimals(value)}</td>
                  <td>{name}</td>
                  <td>{this.fixDecimals(ask)}</td>
                  <td>{this.fixDecimals(ask * value)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpenses(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateExpenses: PropTypes.func.isRequired,
  setTotalValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (array) => dispatch(updateExpensesAction(array)),
  setTotalValue: (value) => dispatch(totalValueAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
