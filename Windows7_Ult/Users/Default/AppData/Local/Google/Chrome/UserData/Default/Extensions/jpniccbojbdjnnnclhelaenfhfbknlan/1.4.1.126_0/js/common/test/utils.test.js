"use strict";
var utils = require('../utils').utils;
var assert = require('assert');
var _ = require('lodash');

describe('utils', function() {
    describe('#checkPhone()', function() {
        var phones = [
            ['+7 913 123 12 12', '913 123 12 12', true],
            ['+1-913-123-12-12', '913-123-12-12', true],
            ['+7 (913) 123-12-12', '913 123 12 12', true],
            ['8 913 123 12 12', '913 123 12 12', true],
            ['+1 562-455-6922', '562-455-6922', true]
        ];

        _.each(phones, function(item) {
            var eq = item[2] ? 'equal' : 'inequal';
            it('should treat ' + item[0] + ' and ' + item[1] + ' as ' + eq, function() {
                assert.equal(utils.checkPhone(item[0], item[1]), item[2]);
            });
        });
    });

    describe('#calculateDistance()', function() {
        var points = [
            {
                from: [54.95, 82.74],
                to: [55.08, 83.08],
                dist: 26.05
            },
            {
                from: [55.12, 82.80],
                to: [54.88, 83.03],
                dist: 30.45
            }
        ];
        _.each(points, function(point) {
            it('should calculate distance between [' + point.from + '] and [' + point.to + '] to be equal ' + point.dist, function () {
                assert.equal(utils.calculateDistance(point.from[0], point.from[1], point.to[0], point.to[1]).toFixed(2), point.dist);
            });
        });
    });

    describe('#wordForm()', function() {
        var words = {
            'single': 'кот',
            'plural1': 'кота',
            'plural2': 'котов'
        };

        var cases = {
            0: 'котов',
            1: 'кот',
            2: 'кота',
            4: 'кота',
            5: 'котов',
            10: 'котов',
            11: 'котов',
            12: 'котов',
            14: 'котов',
            21: 'кот',
            22: 'кота',
            24: 'кота',
            25: 'котов',
            100: 'котов',
            101: 'кот',
            102: 'кота',
            104: 'кота',
            105: 'котов'
        };

        _.each(cases, function(c, key) {
            it('should say "' + key + ' ' + c + '"', function() {
                assert.equal(utils.wordForm(key, words.single, words.plural1, words.plural2), c);
            });
        });
    });

    describe('#parseDomain()', function() {
        it('should return null on empty domain', function() {
            assert.equal(utils.parseDomain(''), null);
        });
        it('should work with http url', function() {
            assert.equal(utils.parseDomain('http://test.domain.com/some/path/?some=query'), 'test.domain.com');
        });
        it('should work with https url', function() {
            assert.equal(utils.parseDomain('https://test.domain.com/some/path/?some=query'), 'test.domain.com');
        });
        it('should work with port and hash', function() {
            assert.equal(utils.parseDomain('http://test.domain.com:3000/some/path/#hash'), 'test.domain.com');
        });
    });

    describe('#urlHasPath()', function() {
        it('should detect valid paths', function() {
            assert.equal(utils.urlHasPath('http://test.domain.com/valid/path/', 'test.domain.com'), true);
            assert.equal(utils.urlHasPath('http://test.domain.com:3000/valid/path/', 'test.domain.com'), true);
            assert.equal(utils.urlHasPath('https://test.domain.com:3000/valid/path/?query=some', 'test.domain.com'), true);
        });
        it('should not detect invalid paths', function() {
            assert.equal(utils.urlHasPath('http://test.domain.com/?q=invalid/path/', 'test.domain.com'), false);
            assert.equal(utils.urlHasPath('http://test.domain.com:3000/#invalid', 'test.domain.com'), false);
            assert.equal(utils.urlHasPath('https://test.domain.com/', 'test.domain.com'), false);
        });
        it('should fail on different domain', function() {
            assert.equal(utils.urlHasPath('http://test.domain.com/valid/path/', 'test2.domain.com'), false);
        });
    });

    describe('#checkWebsite()', function() {
        it('should match domains with different paths', function() {
            assert.equal(utils.checkWebsite('http://test.domain.com/asd/dfsg/', 'http://test.domain.com/fds/gfd'), true);
        });
        it('should match domains with different ports', function() {
            assert.equal(utils.checkWebsite('http://test.domain.com:3000/asd/dfsg/', 'http://test.domain.com/fds/gfd'), true);
        });
        it('should match domains with different protocols', function() {
            assert.equal(utils.checkWebsite('https://test.domain.com/asd/dfsg/', 'http://test.domain.com/fds/gfd'), true);
        });
        it('should match domains with and without www', function() {
            assert.equal(utils.checkWebsite('http://www.test.domain.com/asd/dfsg/', 'http://test.domain.com/fds/gfd'), true);
        });
        it('should match domains with different paths', function() {
            assert.equal(utils.checkWebsite('http://test.domain.com/asd/dfsg/', 'http://test.domain.com/fds/gfd'), true);
        });
        it('should not match different domains', function() {
            assert.equal(utils.checkWebsite('http://test2.domain.com/asd/dfsg/', 'http://test.domain.com/asd/dfsg/'), false);
        });
        it('should match website existing in found array', function() {
            assert.equal(utils.checkWebsite(['http://test.domain.com/', 'http://test.domain2.com/'], 'http://test.domain.com/fds/gfd'), true);
        });
        it('should not match website not existing in found array', function() {
            assert.equal(utils.checkWebsite(['http://test.domain2.com/', 'http://test.domain3.com/'], 'http://test.domain.com/fds/gfd'), false);
        });
    });

    describe('#checkPhone()', function() {
        it('should treat phones in different formats as the same', function() {
            assert.equal(utils.checkPhone('+7 (383) 123-12-23', '+7-383-123-1223'), true);
        });
        it('should treat +7- and 8- as the same', function() {
            assert.equal(utils.checkPhone('+7 (383) 123-12-23', '8-383-123-12-23'), true);
        });
        it('should treat phones as matching if one ends with another', function() {
            assert.equal(utils.checkPhone('+7 (383) 123-23-12', '123-23-12'), true);
            assert.equal(utils.checkPhone('123-23-12', '+7 (383) 123-23-12'), true);
        });
        it('should not match different phones', function() {
            assert.equal(utils.checkPhone('+7 (383) 123-12-23', '+7-383-321-1223'), false);
        });
        it('should match phone existing in found array', function() {
            assert.equal(utils.checkPhone(['+7 (383) 123-12-23', '+7 (383) 321-12-32'], '+7-383-123-1223'), true);
        });
        it('should not match phone not existing in found array', function() {
            assert.equal(utils.checkPhone(['+7 (383) 123-55-55', '+7-383-321-32-32'], '+7-383-123-1223'), false);
        });
    });

    describe('#checkShortPhoneSanity()', function() {
        it('should match short phone with city code', function() {
            assert.equal(utils.checkShortPhoneSanity(
                ['+7 (383) 123-23-23', '8 321 43-43-432'],
                '123-23-23'
            ), true);
        });
        it('should not match inexisting short phone with city code', function() {
            assert.equal(utils.checkShortPhoneSanity(
                ['+7 (383) 123-23-23', '8 321 43-43-432'],
                '123-11-11'
            ), false);
        });
    });
});

