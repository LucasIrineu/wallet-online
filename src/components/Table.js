import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  fixDecimals = (value) => {
    const result = parseFloat(value)
      .toFixed(2);

    return result;
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
