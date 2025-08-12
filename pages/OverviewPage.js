// pages/OverviewPage.js
class OverviewPage {
  constructor(page) {
    this.page = page;
    this.finishBtn = page.locator('[data-test="finish"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
  }

  async assertItem(name) {
    await this.itemName.filter({ hasText: name }).first().waitFor({ state: 'visible' });
  }

  async finish() {
    await this.finishBtn.click();
    await this.page.waitForURL(/checkout-complete\.html/);
  }
}

module.exports = { OverviewPage };
