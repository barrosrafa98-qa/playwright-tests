// tests/saucedemo.spec.js
const { test, expect } = require('@playwright/test');

test('saucedemo login and purchase', async ({ page }) => {
  // Acessa a página inicial
  await page.goto('https://www.saucedemo.com/');

  // Localiza os campos de login e preenche
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  // Clica no botão de login
  await page.locator('#login-button').click();

  // Verifica se foi redirecionado para a página de inventário
  await expect(page).toHaveURL(/inventory.html/);

  // Confirma que há pelo menos um produto visível
  const firstProduct = page.locator('.inventory_item').first();
  await expect(firstProduct).toBeVisible();

  //Adicionando produto ao carrinho
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

// Localiza o badge do carrinho
const cartBadge = page.locator('[data-test="shopping-cart-badge"]');


// Verifica se está visível e contém "1"
await expect(cartBadge).toBeVisible();
await expect(cartBadge).toHaveText('1');

// Navega para o carrinho
await page.locator('[data-test="shopping-cart-link"]').click();

// Validações da pagina do carrinho
await expect(
  page.locator('[data-test="inventory-item-name"]')
).toHaveText('Sauce Labs Backpack');

await expect(
  page.locator('[data-test="remove-sauce-labs-backpack"]')
).toBeVisible();

await expect(
  page.locator('[data-test="continue-shopping"]')
).toBeVisible();

await expect(
  page.locator('[data-test="checkout"]')
).toBeVisible();


//Checkout
await page.locator('[data-test="checkout"]').click();

//Validações da tela de checkout 1
await expect(page.locator('[data-test="firstName"]')).toBeVisible();
await expect(page.locator('[data-test="lastName"]')).toBeVisible();
await expect(page.locator('[data-test="postalCode"]')).toBeVisible();

//Fazendo checkout
await page.locator('#first-name').fill('Nome');
await page.locator('#last-name').fill('Sobrenome');
await page.locator('#postal-code').fill('12345');
await page.locator('[data-test="continue"]').click();

//Validações checkout final
await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
await expect(page.locator('[data-test="cancel"]')).toBeVisible();
await expect(page.locator('[data-test="finish"]')).toBeVisible();

//Finalizando o teste
await page.locator('[data-test="finish"]').click();
await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();








  
});
