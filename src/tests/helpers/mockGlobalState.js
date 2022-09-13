import mockData from './mockData';

const MOCKED_STATE = {
  currencies: [
    'USD',
    'CAD',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'EUR',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
    'DOGE',
  ],
  totalValue: '15.28',
  error: '',
  expenses: [
    {
      id: 0,
      value: '1',
      description: 'teste',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Transporte',
      exchangeRates: mockData,
    },
    {
      id: 1,
      value: '1',
      description: 'teste 2',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    },
    {
      id: 2,
      value: '1',
      description: 'teste 3',
      currency: 'USD',
      method: 'Cartão de débito',
      tag: 'Lazer',
      exchangeRates: mockData,
    },
  ],
};

export default MOCKED_STATE;
