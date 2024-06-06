import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

      await page.goto('https://thinking-tester-contact-list.herokuapp.com/'); // Navigate to the URL of the contact list app
      await page.getByRole('heading', { name: 'Contact List App' }).isVisible(); // Ensure the heading 'Contact List App' is visible
      await page.getByText('Log In:').isVisible(); // Ensure the text 'Log In:' is visible
      await page.getByText('Not yet a user? Click here to').isVisible(); // Ensure the text 'Not yet a user? Click here to' is visible
      
      //negative cases
      //submit with empty fields
      await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button without filling in the form to trigger validation
      await page.getByText('Incorrect username or password').isVisible(); // Ensure the validation message 'Incorrect username or password' is visible
      
      //submit with spacing in email and password
      await page.getByPlaceholder('Email').click(); // Click on the email input field
      await page.getByPlaceholder('Email').fill('  '); // Fill in the email input field with spaces
      await page.getByPlaceholder('Password').click(); // Click on the password input field
      await page.getByPlaceholder('Password').fill('  '); // Fill in the password input field with spaces
      await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
      
      //submit with invalid email
      await page.getByPlaceholder('Email').click(); // Click on the email input field
      await page.getByPlaceholder('Email').fill('  dsafdsfsa dfdsa fdsa dsfdsafdsdfsd'); // Fill in the email input field with an invalid email
      await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
      await page.getByText('Incorrect username or password').isVisible(); // Ensure the validation message 'Incorrect username or password' is visible
      
      //valid email and wrong password
      await page.getByPlaceholder('Email').click(); // Click on the email input field
      await page.getByPlaceholder('Email').fill('test3454353@gmail.com'); // Fill in the email input field with a valid email
      await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to log in
      await page.getByText('Incorrect username or password').isVisible(); // Ensure the validation message 'Incorrect username or password' is visible
      await page.getByPlaceholder('Password').click(); // Click on the password input field
      await page.getByPlaceholder('Password').fill('dsfadfd'); // Fill in the password input field with an incorrect password
      await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to log in
      await page.getByText('Incorrect username or password').isVisible(); // Ensure the validation message 'Incorrect username or password' is visible
      
      //positive cases
      await page.getByPlaceholder('Password').click(); // Click on the password input field
      await page.getByPlaceholder('Password').fill('myNewPassword'); // Fill in the password input field with the correct password
      await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to log in
      await page.getByRole('heading', { name: 'Contact List' }).isVisible(); // Ensure the heading 'Contact List' is visible, indicating successful login
      await page.getByText('Click on any contact to view').isVisible(); // Ensure the text 'Click on any contact to view' is visible
      
      //logout
      await page.getByRole('button', { name: 'Logout' }).click(); // Click on the logout button to log out
      await page.getByRole('heading', { name: 'Contact List App' }).isVisible(); // Ensure the heading 'Contact List App' is visible, indicating successful logout
  
});