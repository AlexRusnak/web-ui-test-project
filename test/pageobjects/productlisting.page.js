const { $ } = require('@wdio/globals');
const Page = require('./page');
const { browser } = require('@wdio/globals');

/**
 * ProductListingPage class representing the product listing page with specific selectors and methods.
 */
class ProductListingPage extends Page {
    pageUrl = "https://practicesoftwaretesting.com/#/";

    get productItems() {
        return $$('.card');
    }

    get productFilters() {
        return $('#filters').$$('.checkbox');
    }

    get productSortingDropDown() {
        return $('.form-select');
    }

    get productSortingOptions() {
        return $('.form-select').$$('<option />');
    }

    /**
     * Gets the names of all products on the page.
     * @returns {Promise<string[]>} - Array of product names.
     */
    async getProductNames() {
        return this.productItems.map(async (item) => await item.$('h5[data-test="product-name"]').getText());
    }

    /**
     * Gets the prices of all products on the page.
     * @returns {Promise<string[]>} - Array of product prices.
     */
    async getProductPrices() {
        return this.productItems.map(async (item) => await item.$('span[data-test="product-price"]').getText());
    }

    /**
     * Searches for and clicks on filters based on provided keywords.
     * @param {string[]} keywords - Keywords to search for in filters.
     */
    async searchAndClickFilter(keywords) {
        const checkboxes = await this.productFilters;

        for (const checkbox of checkboxes) {
            const text = await checkbox.getText();
            if (keywords.includes(text)) {
                await checkbox.$('label').click();
            }
        }
    }

    /**
     * Searches for and clicks on a sorting option based on the provided keyword.
     * @param {string} keyword - Keyword to search for in sorting options.
     */
    async searchAndClickSorting(keyword) {
        const sortingDropdown = await this.productSortingDropDown;
        const sortingOptions = await this.productSortingOptions;

        for (const sortingOption of sortingOptions) {
            const text = await sortingOption.getText();
            if (keyword.includes(text)) {
                await sortingDropdown.click();
                await sortingOption.click();
            }
        }
    }

    /**
     * Checks if all filtered products include at least one of the provided keywords.
     * @param {string[]} keywords - Keywords to check against filtered products.
     * @returns {Promise<boolean>} - True if all filtered products include at least one keyword, false otherwise.
     */
    async allFilteredProductsInclude(keywords) {
        const productNames = await this.getProductNames();

        return productNames.every((name) => {
            return keywords.some((keyword) => {
                return name.toLowerCase().includes(keyword.toLowerCase());
            });
        });
    }

    /**
     * Checks if products on the page are sorted in ascending order.
     * @returns {Promise<boolean>} - True if products are sorted in ascending order, false otherwise.
     */
    async sortedProductsAreAscending() {
        return browser.waitUntil(async () => {
            const productNames = await this.getProductNames();
            return productNames.every((element, index, array) =>
                index === 0 || element >= array[index - 1]);
        }, { timeout: 5000, timeoutMsg: 'Products are not sorted in ascending order' });
    }

    /**
     * Checks if products on the page are sorted in descending order.
     * @returns {Promise<boolean>} - True if products are sorted in descending order, false otherwise.
     */
    async sortedProductsAreDescending() {
        return browser.waitUntil(async () => {
            const productNames = await this.getProductNames();
            return productNames.every((element, index, array) =>
                index === 0 || element <= array[index - 1]);
        }, { timeout: 5000, timeoutMsg: 'Products are not sorted in descending order' });
    }

    /**
     * Overwrites the open method to adapt it to the product listing page URL.
     */
    open() {
        return super.open('/#/');
    }
}

module.exports = new ProductListingPage();