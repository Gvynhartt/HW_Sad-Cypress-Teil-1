
Cypress.Commands.add('login', (email, password) => {

    cy.contains('Log in').click();
    cy.get("#mail").type(email);
    cy.get("#pass").type(password);
    cy.contains("Submit").click();
});

Cypress.Commands.add('addNewBook', (BookEntry, isAddedToFavs) => {

    cy.contains('Add new').click();
    const selInputTitle = "input[name=title]";
    cy.get(selInputTitle).type(BookEntry.bookTitle);
    const selInputDescr = "input[name=description]";
    cy.get(selInputDescr).type(BookEntry.bookDescr);
    const selInputAuthors = "input[name=authors]";
    cy.get(selInputAuthors).type(BookEntry.bookAuthors);

    if (isAddedToFavs === true) {

        const selCheckFavourite = "input[name=favorite]";
        cy.get(selCheckFavourite).click();
    };

    const selBtnSubmit = "button[type=submit]";
    cy.get(selBtnSubmit).click();
});
