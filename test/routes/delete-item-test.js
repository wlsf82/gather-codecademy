const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

const { parseTextFromHTML, seedItemToDatabase } = require("../test-utils");
const { connectDatabaseAndDropData, diconnectDatabase } = require("../setup-teardown-utils");

describe("Server path items/:id/delete", () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe("POST", () => {
        it("does not show deleted item on the home page and returns '302' status code", async () => {
            const item = await seedItemToDatabase();

            const response = await request(app)
                .post(`/items/${item._id}/delete`)
                .send();

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, "/");
            // @TODO: fix failing assertion
            assert.notInclude(parseTextFromHTML(response.text, "#items-container"), item.title);
        });
    })
});
