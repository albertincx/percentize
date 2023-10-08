function getPercent(v, t) {
    return 100 / t * v;
}

function total(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i];

    return sum;
}

function indexOfMax(arr) {
    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

/**
 * @param numbers array of numbers
 * @param minPercent to avoid min values
 * @return array
 */
function percentize(numbers, minPercent = 1) {
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
        const minValue = getPercent(sorted[0], sum);
        hasMinValue = minValue < minPercent;
        if (hasMinValue) {
            extra = ((Math.round(sum / 100) * minPercent) || minPercent);
            sum += extra;
        }
    }

    let result = [];
    let sameValues = [];

    actual.forEach(val => {
        let value = Math.round(getPercent(val, sum));
        if (value < minPercent) {
            value = minPercent;
        } else if (hasMinValue && (sameValues.length === 0 || sameValues.includes(value))) {
            sameValues.push(value);
        }

        result.push(value);
    });

    let diff = 100 - total(result);

    if (diff) {
        if (sameValues.length) {
            const plus = Math.floor(diff / sameValues.length);

            const newResult = [...result];

            result.forEach((v, ind) => {
                if (sameValues.includes(v)) newResult[ind] += plus;
            });

            return newResult;
        }
        result[indexOfMax(result)] += diff;
    }

    return result;
}

module.exports = percentize;
