const { expect } = require('@wdio/globals');
const { browser } = require('@wdio/globals');
const LoginPage = require('../pageobjects/login.page');
const MyAccountPage = require('../pageobjects/myaccount.page');
const RegistrationPage = require('../pageobjects/registration.page');
const user1 = require('../testdata/users');
const ProductListingPage = require('../pageobjects/productlisting.page');
const { filters, keywords, nameAscending, nameDescending } = require('../testdata/filters');

// Test suite for user registration
describe('My Registration Application', () => {
    it('should register with valid data', async () => {
        // Open the registration page
        await RegistrationPage.open();

        // Register user with valid data
        await RegistrationPage.register(user1);

        // Check if the login page exists after registration
        await expect(await LoginPage.pageExists()).toBe(true);
    });
});

// Test suite for user login
describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        // Open the login page
        await LoginPage.open();

        // Login with valid credentials
        await LoginPage.login(user1.email, user1.password);

        // Check if the my account title exists and has the correct text
        await expect(MyAccountPage.myAccountTitle).toBeExisting();
        await expect(MyAccountPage.myAccountTitle).toHaveText("My account");

        // Check if the browser URL matches the expected my account URL
        await expect(await MyAccountPage.getBrowserUrl()).toBe(MyAccountPage.myAccountUrl);
    });
});

// Test suite for product listing filters
describe('My Product Listing Application - Filters', () => {
    it('click on filter, list products and display their names', async () => {
        // Open the product listing page
        await ProductListingPage.open();

        // Click on the specified filters
        await ProductListingPage.searchAndClickFilter(filters);

        // Check if all filtered products include the specified keywords
        const productNamesAfterFilter = await ProductListingPage.allFilteredProductsInclude(keywords);
        expect(productNamesAfterFilter).toBeTruthy();
    });
});

// Test suite for product listing sorting in ascending order
describe.only('My Product Listing Application - Sorting', () => {
    it('click on sorting, select NAME A-Z, list products and display their names', async () => {
        // Open the product listing page
        await ProductListingPage.open();

        // Click on the sorting option for ascending order by name
        await ProductListingPage.searchAndClickSorting(nameAscending);

        // Pause for a moment to allow sorting to take effect (adjust if needed)
        browser.pause(300);

        // Check if products are sorted in ascending order by name
        const productNamesSortedAscending = await ProductListingPage.sortedProductsAreAscending();
        expect(productNamesSortedAscending).toBeTruthy();
    });
});

// Test suite for product listing sorting in descending order
describe('My Product Listing Application - Sorting2', () => {
    it('click on sorting, select NAME Z-A, list products and display their names', async () => {
        // Open the product listing page
        await ProductListingPage.open();

        // Click on the sorting option for descending order by name
        await ProductListingPage.searchAndClickSorting(nameDescending);

        // Check if products are sorted in descending order by name
        const productNamesSortedDescending = await ProductListingPage.sortedProductsAreDescending();
        expect(productNamesSortedDescending).toBeTruthy();
    });
});