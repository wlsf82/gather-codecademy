const { assert } = require('chai');
const { buildItemObject } = require('../test-utils');

describe('User visits create', () => {
    describe('post a new item', () => {
        it('render the new post item after posting', () => {
            const newItem = buildItemObject();

            browser.url('create.html');

            browser.setValue('#title-input', newItem.title);
            browser.setValue('#description-input', newItem.description);
            browser.setValue('#imageUrl-input', newItem.imageUrl);
            browser.click('#submit-button');

            assert.include(browser.getText('#items-container'), newItem.title);
            assert.include(browser.getText('#items-container'), newItem.description);
            assert.equal(browser.getAttribute('#items-container img', 'src'), newItem.imageUrl);
        });
    });
});
