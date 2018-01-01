const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

describe("User visits the update item page", () => {
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

    describe("Happy path", () => {
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

    describe("Mandatory fields", () => {
        it("shows an error when trying to update an item with empty title", () => {
            const updatedTitle = "";

            browser.setValue("#title-input", updatedTitle);
            browser.click("#submit-button");

            assert.include(browser.getText(".create-container form"), "Path `title` is required.");
        });

        it("shows an error when trying to update an item with empty description", () => {
            const updatedDescription = "";

            browser.setValue("#description-input", updatedDescription);
            browser.click("#submit-button");

            assert.include(browser.getText(".create-container form"), "Path `description` is required.");
        });

        it("shows an error when trying to update an item with empty image URL", () => {
            const updatedImageUrl = "";

            browser.setValue("#imageUrl-input", updatedImageUrl);
            browser.click("#submit-button");

            assert.include(browser.getText(".create-container form"), "Path `imageUrl` is required.");
        });
    });
});
