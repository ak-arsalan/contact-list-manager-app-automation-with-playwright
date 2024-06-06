import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser'); //visit url
    await page.getByRole('heading', { name: 'Add User' }).click(); //assertion on heading title
    await page.getByText('Sign up to begin adding your').click(); //assertion on text
    await page.getByRole('button', { name: 'Cancel' }).click(); //clicking on cancel button
    await page.getByRole('heading', { name: 'Contact List App' }).click(); //checking if we are at login page or not
    await page.getByRole('button', { name: 'Sign up' }).click(); //click on sign up button

    //negative cases
    await page.getByRole('button', { name: 'Submit' }).click(); //click on submit button with empty fields
    await page.getByText('User validation failed:').click(); //assertion on validation errors
    await page.getByPlaceholder('First Name').click(); //click on first name field
    await page.getByPlaceholder('First Name').fill('test'); //enter test 
    await page.getByRole('button', { name: 'Submit' }).click(); //click on submit button to check negative scenario
    await page.getByPlaceholder('Last Name').click(); //click on last name field
    await page.getByPlaceholder('Last Name').fill('qwertyuiopasdfghjklzxc'); //enter 20 plus characters to check validation
    await page.getByRole('button', { name: 'Submit' }).click(); //click on submit button
    await page.getByText('User validation failed:').click(); //assertion on validation error
    await page.getByPlaceholder('Email').click(); //click on email field
    await page.getByPlaceholder('Email').fill('invalid email'); //enter invalid email 
    await page.getByRole('button', { name: 'Submit' }).click(); //click on submit button
    await page.getByText('User validation failed:').click(); //assertin on validation error
    await page.getByPlaceholder('Password').click(); //click on password filed
    await page.getByPlaceholder('Password').fill('Password@12'); //enter password
    await page.getByRole('button', { name: 'Submit' }).click(); //click on submit button

    //Email already exists  
    await page.getByPlaceholder('First Name').click(); //click on first name
    await page.getByPlaceholder('First Name').fill('Test'); //enter first name
    await page.getByPlaceholder('First Name').press('Tab'); //press tab
    await page.getByPlaceholder('Last Name').fill('User'); //enter last name
    await page.getByPlaceholder('Last Name').press('Tab'); //press tab
    await page.getByPlaceholder('Email').fill('rcsmetx@gmail.com'); //enter email already exists
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('1234567');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Email address is already in').click();

    //positive cases
    var currentdate = new Date();
    var datetime = currentdate.getDate()
        + (currentdate.getMonth() + 1)
        + currentdate.getFullYear()
        + currentdate.getHours()
        + currentdate.getMinutes()
        + currentdate.getSeconds();
    await page.getByPlaceholder('Email').click(); //click on email
    await page.getByPlaceholder('Email').fill("test" + datetime + "@gmail.com"); //valid email
    await page.getByRole('button', { name: 'Submit' }).click(); //click on submit
    await page.getByRole('heading', { name: 'Contact List' }).isVisible(); //validating loggedIn page
    await page.getByText('Click on any contact to view').isVisible(); //assertion on text
});