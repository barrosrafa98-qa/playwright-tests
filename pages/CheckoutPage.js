// pages/CheckoutPage.js
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.first = page.locator('[data-test="firstName"]');
    this.last  = page.locator('[data-test="lastName"]');
    this.post  = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
  }

  async fillCustomer(first, last, postal) {
    await this.first.fill(first);
    await this.last.fill(last);
    await this.post.fill(postal);
  }

  async continue() {
    await this.continueBtn.click();
    await this.page.waitForURL(/checkout-step-two\.html/);
  }
}

module.exports = { CheckoutPage };
