import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import MOCKED_STATE from './helpers/mockGlobalState';

test('testa os inputs do fomurlario de despesa', () => {
  const validValue = '25';
  const validValue2 = '99';
  const validDescription = 'teste de descrição';

  renderWithRouterAndRedux(<Wallet />, { initialState: { wallet: MOCKED_STATE } });

  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const addExpenseButton = screen.getByText('Adicionar despesa');

  userEvent.type(valueInput, validValue);
  userEvent.type(descriptionInput, validDescription);
  userEvent.selectOptions(methodInput, 'Dinheiro');

  expect(descriptionInput.value).toBe(validDescription);
  expect(currencyInput).toBeInTheDocument();
  expect(methodInput.value).toBe('Dinheiro');

  userEvent.click(addExpenseButton);

  userEvent.type(valueInput, validValue2);
  userEvent.type(descriptionInput, validDescription);
  userEvent.selectOptions(methodInput, 'Cartão de crédito');

  userEvent.click(addExpenseButton);
});

test('checa se é possivel excluir as despesas já adicionadas', () => {
  renderWithRouterAndRedux(<Wallet />, { initialState: { wallet: MOCKED_STATE } });

  const tableElement = screen.getByRole('table');
  expect(tableElement).toBeInTheDocument();

  const deleteButtons = screen.getAllByTestId('delete-btn');
  expect(deleteButtons.length).toBe(3);

  userEvent.click(deleteButtons[2]);
  userEvent.click(deleteButtons[1]);
  userEvent.click(deleteButtons[0]);
});
