import { expect } from "playwright/test";

class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByPlaceholder('Email');
      this.passwordInput = page.getByPlaceholder('Password');
      this.submitButton = page.getByRole('button', { name: 'Submit' });
      this.successMessage = page.getByRole('heading', { name: 'Contact List' });
      this.errorMessage = page.getByText('Incorrect username or password');
    }
  
    async navigate() {
      await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    }
  
    async login(email, password) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    }

    async loginWithValidCredentials(){
      await expect(this.successMessage).toBeVisible();
    }
  
    async loginWithInvalidCredentials() {
      await expect(this.errorMessage).toBeVisible();
    }
  }
  
  export { LoginPage };
  