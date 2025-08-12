// pages/CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async assertItemPresent(name) {
    const item = this.cartItem.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }),
    });
    await item.first().waitFor({ state: 'visible' });
  }

  async checkout() {
    await this.checkoutBtn.click();
    await this.page.waitForURL(/checkout-step-one\.html/);
  }
}

module.exports = { CartPage };
