const { assert } = require('chai');
const { buildItemObject } = require('../test-utils');

describe('User visits a single item', () => {
    const itemToCreate = buildItemObject();

    beforeEach(() => {
        browser.url('/items/create');

        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
    });

    it('renders item title, description and image', () => {
        browser.click('.item-card a');

        assert.equal(browser.getText('#item-title'), itemToCreate.title);
        assert.equal(browser.getText('#item-description'), itemToCreate.description);
        assert.include(browser.getAttribute('.single-item-container img', 'src'), itemToCreate.imageUrl);
    });
});
