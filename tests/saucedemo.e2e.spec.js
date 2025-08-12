// tests/saucedemo.e2e.spec.js
const { test, expect } = require('./fixtures/fixtures');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OverviewPage } = require('../pages/OverviewPage');
const { CompletePage } = require('../pages/CompletePage');

test('E2E – comprar 1 item com fixture de login', async ({ loggedInPage }) => {
  const page = loggedInPage;

  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const step1 = new CheckoutPage(page);
  const step2 = new OverviewPage(page);
  const done = new CompletePage(page);

  // inventário
  await inventory.addToCartByName('Sauce Labs Backpack');
  await expect(inventory.cartBadge).toHaveText('1');
  await inventory.goToCart();

  // carrinho
  await cart.assertItemPresent('Sauce Labs Backpack');
  await cart.checkout();

  // checkout (step one)
  await step1.fillCustomer('Rafael', 'Barros', '12345');
  await step1.continue();

  // overview (step two)
  await step2.assertItem('Sauce Labs Backpack');
  await step2.finish();

  // complete
  await done.assertSuccess();
});
