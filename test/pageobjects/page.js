const { browser } = require('@wdio/globals')

/**
 * Page class representing the main page object containing shared methods and selectors.
 */
module.exports = class Page {
    open(path) {
        return browser.url(`${path}`);
    }

 
    getBrowserUrl() {
        return browser.getUrl();
    }
}