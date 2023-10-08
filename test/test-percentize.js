var percentize = require('../lib/percentize');

var path = require('path'),
    assert = require('assert'),
    inspect = require('util').inspect;

var group = path.basename(__filename, '.js') + '/';
[
    {data: 'empty', expected: []},
    {data: [0, 0, 0], expected: []},
    {data: ['', '', ''], expected: []},
    {data: ['a', 'b', 'c'], expected: []},
    {data: ['a', 'b', 3], expected: [100]},
    {data: ['a', 3, 3], expected: [50, 50]},
    {data: [1, 1, 1], expected: [33, 33, 33]},
    {data: [1, 20, 20], expected: [2, 49, 49]},
    {data: [1, 20, 20], min: 1, expected: [2, 49, 49]},
    {data: [1, 20, 20], min: 2, expected: [2, 49, 49]},
    {data: [1, 20, 20], min: 3, expected: [3, 48, 48]},
    {data: [0.5, 20, 20], min: 3, expected: [3, 48, 48]},
    {data: [0.5, 20, 20, 20], min: 3, expected: [3, 32, 32, 32]},
    {data: [0.5, 20, 20, 20, 20], min: 3, expected: [3, 24, 24, 24, 24]},
    {data: [0, 20, 5000], min: 3, expected: [3, 97]},
    {data: [0.001, 20, 30, 500], min: 1, expected: [1, 4, 5, 90]},
    {data: [0.001, 20, 30, 500], min: 3, expected: [3, 4, 5, 88]},
    {data: [200, 1, 500], min: 4, expected: [27, 4, 69]},
    {data: [200, 1, 500], expected: [28, 1, 71]},
    {data: [200, 0, 500], expected: [29, 71]},
].forEach(function (v) {
    var result = percentize(v.data, v.min);

    var msg = '[' + group + ']: output mismatch.\n'
        + 'Saw: ' + inspect(result) + '\n'
        + 'Expected: ' + inspect(v.expected);

    assert.deepEqual(result, v.expected, msg);
});
