const { assert } = require("chai");
const { buildItemObject } = require("../test-utils");

describe("User visits the create page", () => {
    describe("posts a new item", () => {
        it("is rendered", () => {
            const itemToCreate = buildItemObject();

            browser.url("/items/create");

            browser.setValue("#title-input", itemToCreate.title);
            browser.setValue("#description-input", itemToCreate.description);
            browser.setValue("#imageUrl-input", itemToCreate.imageUrl);
            browser.click("#submit-button");

            assert.include(browser.getText("#items-container"), itemToCreate.title);
            assert.include(browser.getAttribute("#items-container img", "src"), itemToCreate.imageUrl);
        });
    });
});
