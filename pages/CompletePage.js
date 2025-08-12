// pages/CompletePage.js
const { expect } = require('@playwright/test');

class CompletePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('[data-test="complete-header"]');
    this.backBtn = page.locator('[data-test="back-to-products"]');
  }

  async assertSuccess() {
    await expect(this.header).toHaveText('Thank you for your order!');
    await expect(this.backBtn).toBeVisible();
  }
}

module.exports = { CompletePage };
