// pages/InventoryPage.js
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItem = page.locator('.inventory_item');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink  = page.locator('[data-test="shopping-cart-link"]');
  }

  async assertOnPage() {
    await this.page.waitForURL(/inventory\.html/);
    await this.inventoryItem.first().waitFor({ state: 'visible' });
  }

  // adiciona item pelo "nome visível" do produto
  async addToCartByName(name) {
    const card = this.page
      .locator('.inventory_item')
      .filter({
        has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }),
      });

    await card.getByRole('button', { name: /add to cart/i }).click();
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/cart\.html/);
  }
}

module.exports = { InventoryPage };
