const { assert } = require('chai');

describe('User visits root', () => {
    describe('without existing items', () => {
        it('starts blank', () => {
            browser.url('/');
            assert.equal(browser.getText('#items-container'), '');
        });
    });

    describe('navigation', () => {
        it('go to create page', () => {
            browser.url('/');

            browser.click('a[href="items/create"]');

            assert.equal(browser.getText('h2'), 'Create');
        });
    });
});
