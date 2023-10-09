var percentize = require('percentize');

let percents = percentize([55.755814,37.617635, 1]);
console.log(percents);
percents = percentize([55.755814,37.617635, 5], 5);
console.log(percents);
percents = percentize([55.755814,37.617635, 9], 9);
console.log(percents);
