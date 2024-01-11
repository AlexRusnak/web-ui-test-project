const Page = require('./page');

/**
 * MyAccountPage class representing the My Account page with specific selectors and methods.
 */
class MyAccountPage extends Page {
    myAccountUrl = "https://practicesoftwaretesting.com/#/account";

    get myAccountTitle() {
        return $('[data-test="page-title"]');
    }
}

module.exports = new MyAccountPage();