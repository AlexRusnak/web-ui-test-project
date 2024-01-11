function emailRandom() {
    // Generate a random email by appending a random number to "test."
    return "test" + Math.floor(Math.random() * 9999) + "@mail.com";
};

const user1 = {
    firstname: "Alex",
    lastname: "Rusnak",
    dateofbirth: "11/11/1990",
    address: "Test Address",
    postcode: '88016',
    city: 'City',
    state: 'State',
    country: 'Ukraine',
    phone: '5555555',
    email: `${emailRandom()}`,
    password: 'password'
}

module.exports = user1;