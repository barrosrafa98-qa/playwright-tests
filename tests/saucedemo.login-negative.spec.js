// tests/saucedemo.login-negative.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('login inválido exibe mensagem de erro', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('wrong_user', 'wrong_pass');

  await expect(login.error).toBeVisible();
  await expect(login.error).toContainText(/epic sadface/i);
});
