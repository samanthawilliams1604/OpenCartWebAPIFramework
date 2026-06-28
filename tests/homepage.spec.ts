

import {test, expect} from '@playwright/test';

import { LoginPage } from '../src/pages/LoginPage';

import { HomePage } from '../src/pages/HomePage'; 


//Declaring at the global level - GLOBAL VARIABLES
let loginPage: LoginPage; 
let homePage: HomePage; 

test.beforeEach(async ({page})=> {
    loginPage = new LoginPage(page); //ARRANGE
    await loginPage.goToLoginPage(); //ACTION
    await loginPage.doLogin('sammydn@gmail.com', 'pwd@123'); //NEED TO DO OWN
    homePage = new HomePage(page);   
    
})

test('home page title test', async () => {
    
    const pageTitle = await homePage.getHomePageTitle();
    console.log('home page title', pageTitle);
    expect(pageTitle).toBe('My Account'); //actual should not be hardcoded


});

test('logout exist test', async () => {
      expect (await homePage.isLogoutLinkExist()).toBeTruthy();

});

test ('home page headers exist', async () => {
  let allHeaders = homePage.getHomePageHeaders();
  console.log('home page headers: allHeaders');
  expect.soft(allHeaders).toHaveLength(4)
  expect.soft(allHeaders).toEqual([
    'My Account',
    'My Orders',
    'My Affiliate Account',
    'Newsletter'
  ])
})