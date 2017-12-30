const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

describe("User visits a update item page", () => {
    const itemToCreate = buildItemObject();

    beforeEach(() => {
        browser.url("/items/create");

        browser.setValue("#title-input", itemToCreate.title);
        browser.setValue("#description-input", itemToCreate.description);
        browser.setValue("#imageUrl-input", itemToCreate.imageUrl);
        browser.click("#submit-button");
    });

    beforeEach(() => {
        browser.click(".item-view");
        browser.click(".update-button");
    });

    it("renders the update item form", () => {
        assert.equal(browser.getText("h2"), "Update item");
    });

    it("updates item title", () => {
        const updatedTitle = "foo";

        browser.setValue("#title-input", updatedTitle);
        browser.click("#submit-button");

        assert.equal(browser.getText("#items-container"), updatedTitle);
    });
});
