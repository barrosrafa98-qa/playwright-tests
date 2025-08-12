// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.user = page.locator('#user-name');             // ou [data-test="username"]
    this.pass = page.locator('#password');              // ou [data-test="password"]
    this.loginBtn = page.locator('#login-button');      // ou [data-test="login-button"]
    this.error = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.user.fill(username);
    await this.pass.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };
