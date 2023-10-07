function perc(v, t) {
    return 100 / t * v;
}

function total(arr) {
    return arr.reduce(function (prev, cur) {
        return prev + cur;
    });
}

/**
 * @param numbers array of numbers
 * @param minPercent to avoid min values
 * @return array
 */
function percentize(numbers, minPercent = 0) {
    // prepare and return
    if (!numbers || !Array.isArray(numbers)) return [];
    const actual = numbers.filter(n => n).filter(Number);
    const len = actual.length;
    if (len === 0) return [];
    if (len === 1) return [100];
    const isSame = actual.join('') === Array(len).fill(actual[0]).join('');
    if (isSame) {
        if (len === 2) return [50, 50];
        return Array(len).fill(Math.round(100 / 3));
    }

    let sum = total(actual), extra = 0, hasMinValue = false;
    if (minPercent) {
        const sorted = [...actual];
        sorted.sort();
        const minValue = perc(sorted[0], sum);
        hasMinValue = minValue < minPercent;
        if (hasMinValue) {
            extra = ((Math.round(sum / 100) * minPercent) || minPercent);
            sum += extra;
        }
    }

    let result = [];
    let sameValues = [];

    actual.forEach(val => {
        let value = Math.round(perc(val, sum));
        if (value < minPercent) {
            value = minPercent;
        } else if (hasMinValue) {
            if (sameValues.length === 0) {
                sameValues.push(value);
            } else if (sameValues.includes(value)) {
                sameValues.push(value);
            }
        }

        result.push(value);
    });
    let diff = 100 - total(result);
    if (diff) {
        let minus = Math.floor(diff/sameValues.length);

        if (sameValues.length) {
            const newResult = [...result];
            result.forEach((v, ind) => {
                if (sameValues.includes(v)) {
                    newResult[ind] += minus;
                    diff -= minus;
                }
            });
            diff = 0;

            return newResult;
        }
    }

    return result;
}

module.exports = percentize;