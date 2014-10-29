'use strict';
var Page = require('./page');

/**
 * Represents a chapter.
 * @class
 * @param {string} address
 * @param {!Array.<string>} identifier
 * @param {number} number
 * @param {?string} title
 * @param {number} volume
 */
function Chapter(address, identifier, number, title, volume) {
    this.address = address + '?supress_webtoon=t';
    this.identifier = identifier ? parseInt(identifier[1], 10) : undefined;
    this.number = number;
    this.title = title;
    this.volume = volume;
}

/**
 * Retrieves each child.
 * @param {?} $
 * @return {!Array.<Page>}
 */
Chapter.prototype.children = function ($) {
    var select = $('select[name=page_select]').first();
    return select.find('option').map(function (i, el) {
        var value = $(el).attr('value');
        var page = value ? new Page(value) : undefined;
        if (i === 0 && page) {
            page.imageAddress = page.imageAddress($);
            page.address = undefined;
        }
        return page;
    }).get();
};

if (typeof module !== 'undefined') {
    module.exports = Chapter;
}
