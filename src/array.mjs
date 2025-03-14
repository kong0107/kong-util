/**
 * @module kongUtilArray
 * @desc
 *  Functions in this file could be assigned to `Array.prototype`,
 *  and then you can use them as methods of an array.
 *  Assign what you want by yourself or call `extendArrayPrototype()`
 *  to add them all.
 *
 *  These functions are designed to run sequentially.
 *  If you want to run every async functions at the same time,
 *  consider static methods of `Promise`, such as `all`, `any`, `race`, and `allSettled`.
 *
 *  Note: to make `this` work, don't use arrow functions here.
 *
 * @example
    // sequentially fetch resources and then resolves to responses.
    Array.prototype.mapAsync = kongUtilArray.mapAsync; // run once
    [url1, url2].mapAsync(fetch);
 *
 * @example
    // same as above
    kongUtilArray.mapAsync(fetch, [url1, url2])
 *
 */
import utilArray from "./core.mjs";

export * from "./core.mjs";


/**
 * @func shuffle
 * @desc randomize the order of the array in place
 * @param {Array} [target=this]
 * @see {@link https://shubo.io/javascript-random-shuffle/ }
 * @returns {Array}
 */
export function shuffle(target = this) {
    for (let i = target.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1));
        [target[i], target[j]] = [target[j], target[i]];
    }
    return target;
}

/**
 * @func everyAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @returns {Promise<boolean>}
 */
export async function everyAsync(callback, target = this) {
    return (await mapAsync(callback, target)).every(x => x);
}

/**
 * @func filterAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @returns {Promise<Array>}
 */
export async function filterAsync(callback, target = this) {
    const results = [];
    for (let i = 0; i < target.length; ++i)
        if (await callback(target[i], i, target))
            results.push(target[i]);
    return results;
}

/**
 * @func findAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @param {boolean} [returnIndex=false]
 * @returns {Promise<*>}
 */
export async function findAsync(callback, target = this, returnIndex = false) {
    for (let i = 0; i < target.length; ++i)
        if (await callback(target[i], i, target))
            return returnIndex ? i : target[i];
    return returnIndex ? -1 : undefined;
}

/**
 * @func findIndexAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @returns {Promise<integer>}
 */
export function findIndexAsync(callback, target = this) {
    return findAsync(callback, target, true);
}

/**
 * @func findLastAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @param {boolean} [returnIndex=false]
 * @returns {Promise<*>}
 */
export async function findLastAsync(callback, target = this, returnIndex = false) {
    for (let i = target.length - 1; i >= 0; --i)
        if (await callback(target[i], i, target))
            return returnIndex ? i : target[i];
    return returnIndex ? -1 : undefined;
}

/**
 * @func findLastIndexAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @returns {Promise<integer>}
 */
export function findLastIndexAsync(callback, target = this) {
    return findLastAsync(callback, target, true);
}

/**
 * @func forEachAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @returns {Promise<undefined>}
 */
export async function forEachAsync(callback, target = this) {
    return mapAsync(callback, target, true);
}

/**
 * @func mapAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 * @param {boolean} [skipReturn=false]
 * @returns {Promise<Array>}
 */
export async function mapAsync(callback, target = this, skipReturn = false) {
    const results = skipReturn ? undefined : [];
    for (let i = 0; i < target.length; ++i) {
        const r = await callback(target[i], i, target);
        results?.push(r);
    }
    return results;
}

/**
 * @func reduceAsync
 * @param {Function} callback
 * @param {*} initial
 * @param {Array} [target=this]
 * @returns {Promise<*>}
 */
export async function reduceAsync(callback, initial, target = this) {
    let acc = initial, startingIndex = 0;
    if (typeof initial === "undefined") {
        if (!target.length) throw new TypeError("Reduce of empty array with no initial value");
        acc = target[0];
        startingIndex = 1;
    }
    for (let i = startingIndex; i < target.length; ++i)
        acc = await callback(acc, target[i], i, target);
    return acc;
}

/**
 * @func reduceRightAsync
 * @param {Function} callback
 * @param {*} initial
 * @param {Array} [target=this]
 * @returns {Promise<*>}
 */
export async function reduceRightAsync(callback, initial, target = this) {
    let acc = initial, startingIndex = target.length - 1;
    if (typeof initial === "undefined") {
        if (!target.length) throw new TypeError("Reduce of empty array with no initial value");
        acc = target[startingIndex];
        --startingIndex;
    }
    for (let i = startingIndex; i >= 0; --i)
        acc = await callback(acc, target[i], i, target);
    return acc;
}

/**
 * @func someAsync
 * @param {Function} callback
 * @param {Array} [target=this]
 */
export async function someAsync(callback, target = this) {
    return findIndexAsync(callback, target).then(r => r !== -1);
}

/**
 * @func mapToObject
 * @param {Function} callback
 * @param {Array} [target=this]
 * @returns {Object} keys are the values of the array; values are what callback returns on each element.
 */
export function mapToObject(callback, target = this) {
    const result = {};
    target.forEach((v, i) =>
        result[v] = callback(v, i, target)
    );
    return result;
}

/**
 * @func extendArrayPrototype
 * @desc Add methods in this file to `Array` class.
 */
const arrayPrototypeExtended = {
    shuffle,
    everyAsync, filterAsync,
    findAsync, findIndexAsync, findLastAsync, findLastIndexAsync,
    forEachAsync, mapAsync, reduceAsync, reduceRightAsync,
    someAsync,
    mapToObject
};
export const extendArrayPrototype = () => Object.assign(Array.prototype, arrayPrototypeExtended);


Object.assign(utilArray,
    arrayPrototypeExtended,
    {extendArrayPrototype}
);

export default utilArray;
