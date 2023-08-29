const bookEntry1 = {
    bookTitle: "Задача трёх тел и одного пузыря",
    bookDescr: "Сборник новелл о том, почему в вековечной борьбе пьяного коллективного разума с основами бытия побеждает не дружба, а гравитация",
    bookAuthors: "Пирожков Н. В."
}

const bookEntry2 = {
    bookTitle: "Некро-Комик-Кон",
    bookDescr: "Иллюстрированный очерк об истории становления, расцвета и упадка культового косплейного фестиваля (18+), в лицах и со свидетельствами",
    bookAuthors: "Дж. Напье, Х. Квинцель"
}

const bookEntry3 = {
    bookTitle: "Что нам стоит DOM построить",
    bookDescr: "О гордости и предубеждениях *тупости и заблуждениях* тех самых 95% начинающих веб-дизайнеров на просторах СНГ",
    bookAuthors: "Работин С.П., Вратовский В.Г. Жгуч-Подветрыч Т.З. и др."
}

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

describe('testing main functionality around "Favourite" section', () => {

    beforeEach(function () {

        cy.visit('/');
        cy.login(`${defUser2Auth.email}`, `${defUser2Auth.password}`);
    });

    it("should create a book in 'Favourites' section", () => {

        cy.addNewBook(bookEntry1, true);
        cy.contains("Favorites").click();
        cy.contains(bookEntry1.bookTitle).should("be.visible");
    });

    it("should create a regular book and then add it to 'Favourites' with button", () => {
        // этот метод почему-то ломается при запуске командой `npx cypress run --config.file "файл конфига" `,
        // хотя в окне Cypress всё срабатывает как надо
        cy.addNewBook(bookEntry2, false);
        cy.contains(bookEntry2.bookTitle).should("be.visible");

        cy.contains(bookEntry2.bookTitle)
            .last()
            .children("div.card")
            .children("div.card-footer")
            .children("button[type=button]")
            .click();

        cy.contains(bookEntry2.bookTitle)
            .last()
            .children("div.card")
            .children("div.card-footer")
            .children("button[type=button]")
            .should("have.text", "Delete from favorite"); // не проходит этот ассёрт

        // а проблема, видимо, в том, что (по-хорошему) все книги надо добавлять в пустой раздел,
        // счистив всё из прошлых прогонов тестов вилкой, но функционала для полного удаления книги
        // со всех страниц в SUT нет, а перезапускать оную для каждого конфига больно велика честь,
        // посему при повторных запусках тесты падают - КОНЕЦ
        // *заставка с Папичем в Ералаше*.
    });

    it("should remove a previously added book form 'Favourites' with button", () => {

        cy.addNewBook(bookEntry3, true);
        cy.contains(bookEntry3.bookTitle).should("be.visible");

        cy.contains("Favorites").click();
        const selBookCard = "a.mt-3";
        let totalBookCards = 0;  // определяем число карточек с книгами на странице до удаления

        cy.get(selBookCard).then($cards => {
            totalBookCards = $cards.length;
        });
        
        cy.contains(bookEntry3.bookTitle)
            .last()
            .children("div.card")
            .children("div.card-footer")
            .children("button[type=button]")
            .click(); // удаляем книгу кнопкой в карточке
        
        let totalBookCardsLeft;
        cy.get(selBookCard).then($cards => {
            totalBookCardsLeft = $cards.length;
            expect(totalBookCardsLeft).to.be.lessThan(totalBookCards);
            // определяем конечное число карточек и сличаем его с изначальным
        });
    });
})