import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

test.describe('Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Login with Valid Credentials', async () => {
        await loginPage.login(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
        await loginPage.loginWithValidCredentials();
    });

    test('Login with Invalid Email', async () => {
        await loginPage.login('invalid-email@example.com', process.env.TEST_USER_PASSWORD);
        await loginPage.loginWithInvalidCredentials();
    });

    test('Login with Invalid Password', async () => {
        await loginPage.login(process.env.TEST_USER_EMAIL, 'invalid-password');
        await loginPage.loginWithInvalidCredentials();
    });

    test('Login with Empty Fields', async () => {
        await loginPage.login('', '');
        await loginPage.loginWithInvalidCredentials();
    });

});
