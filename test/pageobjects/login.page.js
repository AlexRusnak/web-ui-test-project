const { $ } = require('@wdio/globals');
const Page = require('./page');
const { browser } = require('@wdio/globals');

/**
 * LoginPage class representing the login page with specific selectors and methods.
 */
class LoginPage extends Page {
    pageUrl = "https://practicesoftwaretesting.com/#/auth/login";

    get inputUsername() {
        return $('#email');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('.btnSubmit');
    }

    /**
     * Method to log in by providing a username and password.
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * Overwrites the open method to adapt it to the login page URL.
     */
    open() {
        return super.open('/#/auth/login');
    }

    /**
     * Checks if the current URL matches the expected login page URL.
     * @returns {boolean} - True if the URLs match, false otherwise.
     */
    async urlIsCorrect() {
        return (await super.getBrowserUrl()) === this.pageUrl;
    }

    /**
     * Checks if all required elements on the login page exist.
     * @returns {boolean} - True if all elements exist, false otherwise.
     */
    async pageExists() {
        const expectedUrl = this.pageUrl;
        return (
            (await this.inputUsername.waitForExist()) &&
            (await this.inputPassword.waitForExist()) &&
            (await this.btnSubmit.waitForExist()) &&
            (await browser.waitUntil(async function () {
                const currentUrl = await browser.getUrl();
                return currentUrl === expectedUrl;
            }))
        );
    }
}

module.exports = new LoginPage();