function getPercent(v, t) {
    return 100 / t * v;
}

function total(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i];

    return sum;
}

function indexOf(arr, maximum = true) {
    let res = arr[0];
    let resIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (maximum && arr[i] > res) {
            resIndex = i;
            res = arr[i];
        } else if (!maximum && arr[i] < res) {
            resIndex = i;
            res = arr[i];
        }
    }

    return resIndex;
}

function getNext(arr) {
    let nextIndex = 0;
    for (let i = 1; i < arr.length; i += 1) {
        if (arr[i] === arr[0]) {
            nextIndex = i;
            break;
        }
    }

    return nextIndex;
}

function getNotInArr(arr, notInArr) {
    let index = 0;
    for (let i = 0; i < arr.length; i += 1) {
        if (notInArr.indexOf(arr[i]) === -1) {
            index = i;
            break;
        }
    }

    return index;
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
        sorted.sort((a, b) => a - b);
        const minValue = getPercent(sorted[0], sum);
        hasMinValue = minValue < minPercent;

        if (hasMinValue) {
            extra = ((Math.round(sum / 100) * minPercent) || minPercent);
            sum += extra;
        }
    }

    let result = [];
    let sameValues = [];

    actual.forEach((val, index) => {
        let value = Math.round(getPercent(val, sum));
        if (value < minPercent) {
            value = 1;
        }
        if (actual.find((a, ic) => a === val && ic !== index)) {
            sameValues.push(value);
        }
        result.push(value);
    });

    let diff = 100 - total(result);

    if (diff) {
        if (sameValues.length > 1) {
            const plus = Math.floor(diff / sameValues.length);
            const newResult = [...result];
            let changed = false;

            if (Math.abs(diff) === 1 && !hasMinValue) {
                const uniqIndex = getNotInArr(result, sameValues);
                if (uniqIndex !== -1) {
                    result[uniqIndex] += diff;
                    return result;
                }
            }

            if (Math.abs(diff) === 2) {
                const nextIndex = getNext(result);
                result[0] += plus;
                result[nextIndex] += plus;
                return result;
            }

            for (let i = 0; i < result.length; i += 1) {
                const v = result[i];
                const ind = i;
                if (sameValues.includes(v) && newResult[ind] !== 1) {
                    newResult[ind] += plus;
                    diff -= plus;
                    changed = true;
                }
                if (diff === 0) {
                    break;
                }
            }
            if (changed) {
                return newResult;
            }
        }
        // increase max or min
        result[indexOf(result, hasMinValue)] += diff;
    }

    return result;
}

module.exports = percentize;
