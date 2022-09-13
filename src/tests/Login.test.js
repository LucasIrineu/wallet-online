import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

test('Inputs da página de login funcionam corretamente', () => {
  renderWithRouterAndRedux(<App />);

  const validEmail = 'email@teste.com';
  const validPassword = '456456';

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginButton = screen.getByText('Entrar');

  expect(loginButton).toBeDisabled();

  userEvent.type(emailInput, validEmail);
  userEvent.type(passwordInput, validPassword);

  expect(loginButton).toBeEnabled();
  userEvent.click(loginButton);
});

test('', () => {

});
