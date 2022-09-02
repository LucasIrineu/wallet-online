import React, { Component } from 'react';

class Table extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <div>
        <table>
          <thead>
            <tr>
              { tableHeaders.map((element) => (
                <th key={ element }>
                  {element}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default Table;
