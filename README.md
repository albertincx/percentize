
Description
===========

Percentize helps to calculate percent from numbers array
with minValue to show. Useful for labels. Avoid zero labels

Install
=======

`npm install percentize`

Examples
========

```javascript
import percentize from 'percentize';

const percentArray = percentize([0.1, 20, 20]);
// [1, 49, 49]

const percentArray = percentize([200, 1, 500], 4);
// [27, 1, 72]

const percentArray = percentize([200, 1, 500]);
// [28, 1, 71]

const percentArray = percentize([200, 0, 500]);
// [29, 71]

const percentArray = percentize([55.755814,37.617635, 5, 33]);
// [42, 29, 4, 25]

```
