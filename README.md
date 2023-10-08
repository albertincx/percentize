
Description
===========

percentize module helps to calculate percent from numbers array

Install
=======

`npm install percentize`

Examples
========

```javascript
import percentize from 'percentize';

const percentArray = percentize([1,20,20], 3);
// [3, 48, 48]

const percentArray = percentize([200, 1, 500], 4);
// [27, 4, 69]

const percentArray = percentize([200, 1, 500]);
// [28, 1, 71]

const percentArray = percentize([200, 0, 500]);
// [29, 71]

```
