// tests/saucedemo.multi-items.spec.js
const { test, expect } = require('./fixtures/fixtures');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OverviewPage } = require('../pages/OverviewPage');
const { CompletePage } = require('../pages/CompletePage');

// util: converte "$29.99" -> 29.99
function parseMoney(text) {
  return Number(text.replace(/[^0-9.]/g, ''));
}

test('E2E – adicionar múltiplos itens e validar totais', async ({ loggedInPage }) => {
  const page = loggedInPage;

  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const step1 = new CheckoutPage(page);
  const step2 = new OverviewPage(page);
  const done = new CompletePage(page);

  // 1) adiciona 3 itens pelo nome
  const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
  for (const name of items) {
    await inventory.addToCartByName(name);
  }

  // badge do carrinho = 3
  await expect(inventory.cartBadge).toHaveText('3');

  // 2) vai para o carrinho e valida presença dos itens
  await inventory.goToCart();
  for (const name of items) {
    await cart.assertItemPresent(name);
  }

  // 3) checkout step one (dados fictícios)
  await cart.checkout();
  await step1.fillCustomer('Rafael', 'Barros', '12345');
  await step1.continue();

  // 4) overview: valida itens e confere totais
  // valida que os nomes aparecem
  for (const name of items) {
    await step2.assertItem(name);
  }

  // soma preços de cada item exibido na overview
  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const linePrices = priceTexts.map(parseMoney);
  const sumOfItems = linePrices.reduce((a, b) => a + b, 0);

  // pega Item total, Tax e Total da seção de resumo
  const itemTotalText = await page.locator('.summary_subtotal_label').textContent(); // ex: "Item total: $49.99"
  const taxText       = await page.locator('.summary_tax_label').textContent();      // ex: "Tax: $4.00"
  const totalText     = await page.locator('.summary_total_label').textContent();    // ex: "Total: $53.99"

  const itemTotal = parseMoney(itemTotalText);
  const tax       = parseMoney(taxText);
  const total     = parseMoney(totalText);

  // valida que a soma dos preços de linha bate com o "Item total"
  expect(itemTotal).toBeCloseTo(sumOfItems, 2);

  // valida que Total = Item total + Tax
  expect(total).toBeCloseTo(itemTotal + tax, 2);

  // 5) finaliza e valida sucesso
  await step2.finish();
  await done.assertSuccess();
});
