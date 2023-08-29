describe('testing that the book app page is displayed', () => {

    it("prints the URL in the address box (and rubs the lotion into its skin)", () => {

        cy.visit('/');
        const selHeader = "div#root nav.navbar";
        cy.get(selHeader).should('be.visible');
    })
})