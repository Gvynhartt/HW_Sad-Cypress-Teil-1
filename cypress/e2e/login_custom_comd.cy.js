const defUser1Auth = {
    "name": "def user #1",
    "email": "bropet@mail.ru",
    "password": "123"
}

const defUser2Auth = {
    "name": "def user #2",
    "email": "test@test.com",
    "password": "test"
};

describe('testing login with login form', () => {

    it("Should login when input correct user data with custom command", () => {

        cy.visit('/');
        cy.login(`${defUser2Auth.email}`, `${defUser2Auth.password}`);
        cy.contains(`Добро пожаловать ${defUser2Auth.email}`).should('be.visible');
    });

    it("Should NOT login when input INCORRECT user data (wrong password) with custom command", () => {

        cy.visit('/');
        cy.login(`${defUser2Auth.email}`, `${defUser1Auth.password}`); // второму пользователю вводим логин от первого
        cy.contains("Неправильая почта или пароль").should('be.visible');
    });

    it("Should display error message when LOGIN box empty", () => {

        cy.visit('/');
        cy.contains('Log in').click();
        cy.get("#pass").type(`${defUser1Auth.password}`);
        cy.contains("Submit").click();
        cy.get("#mail").then($el => $el[0].checkValidity()).should('be.false');
    });

    it("Should display error message when PASSWORD box empty", () => {

        cy.visit('/');
        cy.contains('Log in').click();
        cy.get("#mail").type(`${defUser2Auth.email}`);
        cy.contains("Submit").click();
        cy.get("#pass").then($el => $el[0].checkValidity()).should('be.false');
    });
})