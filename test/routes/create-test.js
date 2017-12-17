const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const { parseTextFromHTML, buildItemObject, findImageElementBySource } = require('../test-utils');
const { connectDatabaseAndDropData, diconnectDatabase } = require('../setup-teardown-utils');

describe('Server path: /items/create', () => {
    const itemToCreate = buildItemObject();

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    describe('GET', () => {
        it('renders empty input fields', async () => {
            const response = await request(app).get('/items/create');

            assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
            assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
            assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
        });
    });

    describe('POST', () => {
        it('creates a new item and renders it', async () => {
            const itemToCreate = await buildItemObject();

            const response = await request(app)
                .post('/items/create')
                .type('form')
                .send(itemToCreate);

            const imageElement = findImageElementBySource(response.text, itemToCreate.imageUrl);

            assert.include(parseTextFromHTML(response.text, '.item-title'), itemToCreate.title);
            assert.equal(imageElement.src, itemToCreate.imageUrl);
        });
    });
});
