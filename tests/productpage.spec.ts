import { test, expect } from '../src/fixtures/pagefixtures';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';



test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

//common tests
test('company logo exist on product page', async({basePage}) => {
       expect (await basePage.isLogoVisible()).toBeTruthy();    
    })

    test('footers exist on the product page', async({basePage}) => {
       expect (await basePage.getPageFootersCount()).toBe(16); 
    })


    test('verify product images count', async ({ homePage, searchResultsPage, productInfoPage }) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        let imgCount = await productInfoPage.getProductImagesCount();
        console.log('total images: ', imgCount);
        expect(imgCount).toBe(4);
    });



  test('verify product information/Data', async ({ homePage, searchResultsPage, productInfoPage }) => {
        await homePage.doSearch('macbook');
        await searchResultsPage.selectProduct('MacBook Pro');
        let actualProductInfoMap = await productInfoPage.getProductInfo();
        console.log('Actual Product Details ', actualProductInfoMap);
        expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
        expect.soft(actualProductInfoMap.get('Brand')).toBe('MacBook Apple');
        expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
        expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
        expect.soft(actualProductInfoMap.get('Product Price')).toBe('$2,000.00');
         expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

    });

    //1. Assignment - use CSV  - supply data from csv (above line 22 - 32)
    //2. Assignment - Add the quantity & Add to cart
    //Same on Product Info page>>create a page class and test for this
