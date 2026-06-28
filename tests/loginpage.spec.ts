
import {test, expect} from '@playwright/test';

import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage; //GLOBAL VARIABLE
let homePage: HomePage;

test.beforeEach(async ({page})=> {
    loginPage = new LoginPage(page); //ARRANGE
    await loginPage.goToLoginPage(); //ACTION
    homePage = new HomePage(page);
})

test('login page title test', async () => {
    
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login'); //actual should not be hardcoded


});

test('forgot password link exist  test', async () => {

    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy(); //ASSERT 

});

test('user is able to login to app test', async () => {
await loginPage.doLogin('sammydn@gmail.com', 'pwd123') //NEED TO DO OWN
//expect pending
expect(await homePage.isLogoutLinkExist()).toBeTruthy();
expect(await homePage.getHomePageTitle()).toBe('My Account');

});