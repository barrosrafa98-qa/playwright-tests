// tests/fixtures/fixtures.js
const base = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

exports.test = base.test.extend({
  // disponibiliza um "page" já logado
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.assertOnPage();

    await use(page); // entrega o page autenticado para o teste
  },
});
exports.expect = base.expect;
