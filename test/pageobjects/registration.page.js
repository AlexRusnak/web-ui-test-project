const { $ } = require('@wdio/globals');
const Page = require('./page');

/**
 * RegistrationPage class representing the registration page with specific selectors and methods.
 */
class RegistrationPage extends Page {
    /**
     * Define selectors using getter methods
     */
    get inputFirstname() {
        return $('#first_name');
    }

    get inputLastname() {
        return $('#last_name');
    }

    get inputDateofbirth() {
        return $('#dob');
    }

    get inputAddress() {
        return $('#address');
    }

    get inputPostcode() {
        return $('#postcode');
    }

    get inputCity() {
        return $('#city');
    }

    get inputState() {
        return $('#state');
    }

    get selectCountry() {
        return $('#country');
    }

    get inputPhone() {
        return $('#phone');
    }

    get inputEmail() {
        return $('#email');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnRegister() {
        return $('[data-test="register-submit"]');
    }

    /**
     * A method to encapsulate automation code to interact with the page.
     */
    async register({ firstname, lastname, dateofbirth, address, postcode, city, state, country, phone, email, password }) {
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);
        await this.inputDateofbirth.setValue(dateofbirth);
        await this.inputAddress.setValue(address);
        await this.inputPostcode.setValue(postcode);
        await this.inputCity.setValue(city);
        await this.inputState.setValue(state);
        await this.selectCountry.selectByVisibleText(country);
        await this.inputPhone.setValue(phone);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnRegister.click();
    }

    /**
     * Overwrites the open method to adapt it to the registration page URL.
     */
    open() {
        return super.open('/#/auth/register');
    }
}

module.exports = new RegistrationPage();