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

    describe("Try to create an item with missing mandatory fields", () => {
        it("missing title", () => {
            const itemToCreate = buildItemObject({
                description: "foobarbaz",
                imageUrl: "https://foo.bah"
            });

            browser.url("/items/create");

            browser.setValue("#description-input", itemToCreate.description);
            browser.setValue("#imageUrl-input", itemToCreate.imageUrl);
            browser.click("#submit-button");

            assert.include(browser.getText(".create-container form"), "Path `title` is required.");
            assert.include(browser.getText("#description-input"), itemToCreate.description);
            assert.include(browser.getAttribute("#imageUrl-input", "value"), itemToCreate.imageUrl);
        });

        it("missing description", () => {
            const itemToCreate = buildItemObject({
                title: "foo",
                imageUrl: "https://foo.bah"
            });

            browser.url("/items/create");

            browser.setValue("#title-input", itemToCreate.title);
            browser.setValue("#imageUrl-input", itemToCreate.imageUrl);
            browser.click("#submit-button");

            assert.include(browser.getText(".create-container form"), "Path `description` is required.");
            assert.include(browser.getAttribute("#title-input", "value"), itemToCreate.title);
            assert.include(browser.getAttribute("#imageUrl-input", "value"), itemToCreate.imageUrl);
        });

        it("missing image URL", () => {
            const itemToCreate = buildItemObject({
                title: "bar",
                description: "foobarbaz"
            });

            browser.url("/items/create");

            browser.setValue("#title-input", itemToCreate.title);
            browser.setValue("#description-input", itemToCreate.description);
            browser.click("#submit-button");

            assert.include(browser.getText(".create-container form"), "Path `imageUrl` is required.");
            assert.include(browser.getAttribute("#title-input", "value"), itemToCreate.title);
            assert.include(browser.getText("#description-input"), itemToCreate.description);
        });
    });
});
