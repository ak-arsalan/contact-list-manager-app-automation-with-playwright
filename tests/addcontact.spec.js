import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/'); // Navigate to the URL of the contact list app
    await page.getByRole('heading', { name: 'Contact List App' }).click(); // Click on the heading to ensure the page has loaded
    
    //Login flow
    await page.getByPlaceholder('Email').click(); // Click on the email input field
    await page.getByPlaceholder('Email').fill('test3454353@gmail.com'); // Fill in the email input field
    await page.getByPlaceholder('Email').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('Password').fill('myNewPassword'); // Fill in the password input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to log in
    await page.getByRole('button', { name: 'Add a New Contact' }).click(); // Click on the button to add a new contact
    await page.getByRole('heading', { name: 'Add Contact' }).isVisible(); // Click on the heading to ensure the add contact form is visible
    
    //Negative test cases
    //Empty field form submission
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button without filling the form to trigger validation
    await page.getByText('Contact validation failed:').click(); // Click on the validation error message to ensure it appears
    await page.getByPlaceholder('yyyy-MM-dd').click(); // Click on the birthdate input field
    
    //Wrong date format
    await page.getByPlaceholder('yyyy-MM-dd').fill('54656456'); // Fill in an invalid date in the birthdate input field
    await page.getByText('Submit Cancel').click(); // Click on the submit button to trigger validation
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
    await page.getByText('Contact validation failed:').click(); // Click on the validation error message to ensure it appears
    
    //Invalid email
    await page.getByPlaceholder('example@email.com').click(); // Click on the email input field
    await page.getByPlaceholder('example@email.com').fill('sfdss invaod'); // Fill in an invalid email in the email input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
    await page.getByText('Contact validation failed:').click(); // Click on the validation error message to ensure it appears
    
    //Invalid phone number
    await page.getByPlaceholder('8005551234').click(); // Click on the phone number input field
    await page.getByPlaceholder('8005551234').fill('sdfsaf'); // Fill in an invalid phone number in the phone number input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
    await page.getByText('Contact validation failed:').click(); // Click on the validation error message to ensure it appears
    
    //Address characters limit reached
    await page.getByPlaceholder('Address 1').click(); // Click on the street address 1 input field
    await page.getByPlaceholder('Address 1').fill('retwretrewtretre rtre rtrewtrewt retrewtre'); // Fill in the street address 1 input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
    await page.getByText('Contact validation failed:').click(); // Click on the validation error message to ensure it appears
    
    //Wrong city
    await page.getByPlaceholder('City').click(); // Click on the city input field
    await page.getByPlaceholder('City').fill('435453'); // Fill in an invalid city name in the city input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
    
    //Invalid phone number
    await page.getByPlaceholder('Postal Code').click(); // Click on the postal code input field
    await page.getByPlaceholder('Postal Code').fill('sdfdsfds'); // Fill in an invalid postal code in the postal code input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to trigger validation
    await page.getByText('Contact validation failed:').click(); // Click on the validation error message to ensure it appears
    
    //Positive flow
    await page.getByPlaceholder('First Name').click(); // Click on the first name input field
    await page.getByPlaceholder('First Name').fill('User1'); // Fill in the first name input field
    await page.getByPlaceholder('First Name').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('Last Name').fill('lname'); // Fill in the last name input field
    await page.getByPlaceholder('Last Name').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('yyyy-MM-dd').fill('1990-11-02'); // Fill in the birthdate input field
    await page.getByPlaceholder('yyyy-MM-dd').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('example@email.com').fill('test@gmail.com'); // Fill in the email input field
    await page.getByPlaceholder('example@email.com').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('8005551234').fill('1234567'); // Fill in the phone number input field
    await page.getByPlaceholder('8005551234').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('Address 1').fill('address 1'); // Fill in the street address 1 input field
    await page.getByPlaceholder('Address 1').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('Address 2').fill('address 2'); // Fill in the street address 2 input field
    await page.getByPlaceholder('Address 2').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('City').fill('berlin'); // Fill in the city input field
    await page.getByPlaceholder('City').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('State or Province').fill('berlin'); // Fill in the state or province input field
    await page.getByPlaceholder('State or Province').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('Postal Code').fill('12356'); // Fill in the postal code input field
    await page.getByPlaceholder('Postal Code').press('Tab'); // Press the 'Tab' key to move to the next input field
    await page.getByPlaceholder('Country').fill('germany'); // Fill in the country input field
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to add the contact
    await page.locator('xpath=(//*[text()="berlin berlin 12356"])[1]').isVisible(); // Check if the new contact is visible in the contact list

    //View contact details
    await page.locator('xpath=(//*[text()="User1 lname"])[1]').click(); // Click on the newly added contact to view details

    //Check functionality return to list button
    await page.locator('xpath=//*[@id= "return"]').click();
    await page.locator('xpath=(//*[text()="User1 lname"])[1]').click(); // Click on the newly added contact to view details

    //Edit contact and update the first name
    await page.getByRole('button', { name: 'Edit Contact' }).click(); // Click on the button to edit the contact
    await page.waitForTimeout(2000); // Wait for 2 seconds 
    await page.locator('xpath=//*[@id="firstName"]').click(); // Click on the first name input field in the edit form
    await page.locator('xpath=//*[@id="firstName"]').fill('updated fname'); // Update the first name input field
    await page.waitForTimeout(2000); // Wait for 2 seconds 
    await page.getByRole('button', { name: 'Submit' }).click(); // Click on the submit button to save the updated contact
    await page.waitForTimeout(2000); // Wait for 2 seconds 
    await page.getByText('First Name: updated fname Last Name: lname Date of Birth: 1990-11-02 Email:').isVisible(); // Check if the updated contact details are visible
    
    //Deletion flow
    await page.locator('xpath=//*[@id= "delete"]').click(); // Click on the delete button to delete the contact
    // Deletion Pop up for confirmation
    await page.waitForTimeout(2000); 
    page.once('dialog', dialog => {
        dialog.dismiss().catch(() => { });
    });
    await page.waitForTimeout(1000); 
    await page.getByRole('button', { name: 'Delete Contact' }).click(); // Confirm the deletion by clicking on the delete button in the dialog
    await page.waitForTimeout(1000); 
    await page.getByText('Edit Contact Delete Contact').click(); // Click on the text to ensure the delete contact button appears again
    await page.waitForTimeout(1000); 
    page.once('dialog', dialog => {
        dialog.accept();
    });
    await page.waitForTimeout(1000); 
    // Confirm the deletion by clicking on the delete button in the dialog
    await page.getByRole('button', { name: 'Delete Contact' }).click();
    await page.waitForTimeout(2000); 
    page.once('dialog', dialog => { 
        console.log(`Dialog message: ${dialog.message()}`); 
        dialog.dismiss().catch(() => { }); 
    });
    await page.waitForTimeout(1000);
    await page.getByRole('heading', { name: 'Contact List' }).isVisible(); 
    
});
