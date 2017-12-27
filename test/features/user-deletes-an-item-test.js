const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

// @TODO: fix tests
describe("User visits the deletes item confirmation page", () => {
    const itemToCreate = buildItemObject();

    beforeEach(() => {
        browser.url("/items/create");

        browser.setValue("#title-input", itemToCreate.title);
        browser.setValue("#description-input", itemToCreate.description);
        browser.setValue("#imageUrl-input", itemToCreate.imageUrl);
        browser.click("#submit-button");
    });

    beforeEach(() => browser.click(".delete-button img"));

    it("renders a confirmation paragraph, a 'yes' button and a 'no' link", () => {
        assert.equal(browser.getText(".delete-item-confirmation p"), "Are you sure you want to delete this item?");
        assert.equal(browser.getText(".delete-item-confirmation button"), "Yes");
        assert.equal(browser.getText(".delete-item-confirmation a", "src"), "No");
    });

    describe("Confirmation buttons", () => {
        it("goes back to home page when clicking the 'no' link", () => {
            browser.click(".delete-item-confirmation a");

            assert.include(browser.getText("#items-container"), itemToCreate.title);
        });

        it("goes back to home page when clicking the 'yes' button and the deleted item is not shown anymore", () => {
            browser.click(".delete-item-confirmation button");

            assert.notInclude(browser.getText("#items-container"), itemToCreate.title);
        });
    });
});
