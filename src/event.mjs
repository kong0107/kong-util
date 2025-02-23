/**
 * @module kongUtilEvent
 */
import utilEvent from "./core.mjs";

export * from "./core.mjs";

/**
 * @func listen
 * @desc Shortcut to `EventTarget.addEventListner`.
 * @param {EventTarget | string} target - target itself, or a CSS selector which matches an Element
 * @param  {...any} args - arguments for `addEventListener`
 * @returns {undefined}
 */
export function listen(target, ...args) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.addEventListener(...args);
};

/**
 * @func unlisten
 * @desc Shortcut to `EventTarget.removeEventListener`
 * @param {EventTarget | string} target
 * @param  {...any} args - arguments for `removeEventListener`
 * @returns {undefined}
 */
export function unlisten(target, ...args) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.removeEventListener(...args);
};


/**
 * @func listenMulti
 * @desc Add multi listener to multi events on multi targets
 * @param {string | Element | NodeList | Array.<EventTarget> } targets
 * @param {string | Array.<string>} eventTypes
 * @param {Function | Array.<Function>} listeners
 * @param {boolean | Object} [options]
 * @returns {undefined}
 */
export function listenMulti(targets, eventTypes, listeners, options) {
    if (typeof targets === 'string') targets = document.querySelectorAll(targets);
    if (! ('forEach' in targets)) targets = [targets];
    if (typeof eventTypes === 'string') eventTypes = eventTypes.split(',').map(s => s.trim());
    if (! ('forEach' in listeners)) listeners = [listeners];
    targets.forEach(target => {
        eventTypes.forEach(eventType => {
            listeners.forEach(listener => {
                target.addEventListener(eventType, listener, options);
            });
        });
    });
}

/**
 * @deprecated
 * @func listens
 */
export function listens() {
    console.warn('`listens()` is deprecated due to its name is too similar to `listen()`. Please change to `listenMulti()`, which has the same behavior.');
    listenMulti(...arguments);
}


/**
 * @func unlistenMulti
 * @desc Remove multi listener to multi events on multi targets
 * @param {string | NodeList | Array.<EventTarget> } targets
 * @param {string | Array.<string>} eventTypes
 * @param {Function | Array.<Function>} listener
 * @param {boolean | Object} [options]
 * @returns {undefined}
 */
export function unlistenMulti(targets, eventTypes, listeners, options) {
    if (typeof targets === 'string') targets = document.querySelectorAll(targets);
    if (typeof eventTypes === 'string') eventTypes = eventTypes.split(',').map(s => s.trim());
    if (typeof listeners === 'function') listeners = [listeners];
    targets.forEach(target => {
        eventTypes.forEach(eventType => {
            listeners.forEach(listener => {
                target.removeEventListener(eventType, listener, options);
            });
        });
    });
}

/**
 * @deprecated
 * @func listens
 */
export function unlistens() {
    console.warn('`unlistens()` is deprecated due to its name is too similar to `unlisten()`. Please change to `unlistenMulti()`, which has the same behavior.');
    unlistenMulti(...arguments);
}


/**
 * @func waitForEvent
 * @desc Resolves to the event, or rejects if `timeout` milliseconds passed.
 * @param {EventTarget | string} target
 * @param {string} type
 * @param {number | string | boolean | Object} [options]
 *  If omitted or being a non-positive number, the promise would never reject.
 *  If it's a positive number or a numeric string, the value is treated as the timeout.
 *  If it's a boolean, the value is used as `useCapture` for `EventTarget.addEventListener`.
 *  If it's an object, the property except the followings are used as `options` for `EventTarget.addEventListener`.
 * @param {number | string} [options.timeout] - timeout in milliseconds
 * @param {boolean} [options.preventDefault] - wheather to call `Event.preventDefault`
 * @param {boolean} [options.stopPropagation] - wheather to call `Event.stopPropagation`
 * @param {boolean} [options.stopImmediatePropagation] - wheather to call `Event.stopImmediatePropagation`
 *
 * @returns {Promise.<Event>}
 *
 * @example /// rejects if no click to `document.body` in 1 second
    waitForEvent(document.body, "click", 1000)
    .then(() => console.log("a click event in 1 second is detected"));
 *
 */
export function waitForEvent(target, type, options) {
    let timeout;
    switch (typeof options) {
        case "undefined":   timeout = 0;                options = {};   break;
        case "number":      timeout = options;          options = {};   break;
        case "string":      timeout = parseInt(options);options = {};   break;
        case "boolean":     timeout = 0;                options = {capture: options}; break;
        case "object":      timeout = options.timeout;                  break;
        default: throw TypeError('unknown `option` format');
    }
    options.once = true;
    return new Promise((resolve, reject) => {
        const listener = event => {
            if (options.preventDefault) event.preventDefault();
            if (options.stopPropagation) event.stopPropagation();
            if (options.stopImmediatePropagation) event.stopImmediatePropagation();
            resolve();
        };
        listen(target, type, listener, options);
        if (timeout > 0) setTimeout(() => {
            unlisten(target, listener, options);
            const event = new Event("abort");
            target.dispatchEvent(event);
            reject(event);
        }, timeout);
    });
};

/**
 * @func extendEventTargetPrototype
 * @desc Add above methods to `EventTarget` class.
 */
export const extendEventTargetPrototype = () =>
    Object.assign(EventTarget.prototype, {
        listen: EventTarget.prototype.addEventListener,
        unlisten: EventTarget.prototype.removeEventListener,
        listenMulti: function() { listenMulti(this, ...arguments); },
        unlistenMulti: function() { unlistenMulti(this, ...arguments); },
        waitFor: function() { return waitForEvent(this, ...arguments); }
    })
;


Object.assign(utilEvent, {
    listen, unlisten,
    listens, unlistens,
    listenMulti, unlistenMulti,
    waitForEvent,
    extendEventTargetPrototype
});

export default utilEvent;
