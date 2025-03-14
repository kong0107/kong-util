/**
 * @module kongUtilDom
 */
import utilDom from "./core.mjs";
import {camelize, kebabize} from "./string.mjs";

export * from "./core.mjs";


/**
 * @typedef {Array} JsonML
 * @desc JSON Markup Language structure
 * @see {@link http://www.jsonml.org/ }
 * @property {string} 0 - HTML tag to create
 * @property {Object} 1 - attributes those to be set to the HTML element
 * @property {JsonML | string} [2] - first child of the element created
 * @property {JsonML | string} [3] - second child of the element created
 */

/**
 * @typedef {(undefined|null|false)} NullLike
 */

/**
 * @private
 * @func isLikeNull
 * @param {*} variable
 * @returns {boolean}
 */
function isLikeNull(variable) {
    return variable === undefined || variable === null || variable === false;
}


/**
 * @func $
 * @desc Shortcut to `querySelector`, but different if not given a string.
 *
 * @param {string | Array.<string> | Object | Element} s
 *  - `string`: leads this function works exactly as `querySelector`. The result would be `Element | null`.
 *  - `Array.<string>`: Each selector string in the array would be corresponding to the result `Array.<Element|null>`.
 *  - `Object.<string|Object>`: Each property would be corresponding to the result object, recursively.
 *  - `Element`: just returns itself.
 *
 * @param {Element | Document} [b = document]
 *  If not having `querySelector` method, then `document` is used.
 *  This is useful if you wanna pass this function as the argument in `Array.map`.
 *
 * @returns {null | Element} if `s` is a string or Element
 * @returns {Array.<null|Element>} if `s` is an Array
 * @returns {Object.<null|Element|Object>} if `s` is an Object
 *
 * @example /// get the first button by a string
    $("button, [type=button], [type=submit]");
 *
 * @example /// assign elements by respective selectors
    const [myForm, myTable, myTextArea] = $(["#myForm", ".myTable", "textarea"]);
 *
 * @example /// safe to use in `Array.map()`
    const [myForm, myTable, myTextArea] = ["#myForm", ".myTable", "textarea"].map($);
 *
 * @example /// nested object
    $({form: 'form', inputs: {text: '[type=text]', password: '[type=password]'}});
 *
 */
export function $(s, b = document) {
    if (! b?.querySelector) b = document;
    if (s instanceof Element) return s;
    if (typeof s === "string") return b.querySelector(s);
    if (s instanceof Array) return s.map(ss => $(ss, b));
    const r = {};
    for (let name in s) r[name] = $(s[name], b);
    return r;
}


/**
 * @func $$
 * @desc
 *  Shortcut to `querySelectorAll` but returns an array instead of `NodeList`.
 *  Different if not given a string, like `$` differs from `querySelector`;
 *  however, for selectors have no matches, empty array is returned instead of null.
 * @param {string | Array.<string> | Object} s - one or more CSS selector string
 * @param {Element | Document} [base = document] - if not an object having `querySelector` method, then it's ignored and `document` is used.
 * @returns {Array | Object}
 *
 * @example /// returns all trimmed values of <input>'s in `.myForm`.
    $$(".myForm input").map(input => input.value.trim());
 *
 */
export function $$(s, b = document) {
    if (! b?.querySelectorAll) b = document;
    if (typeof s === "string") return [...b.querySelectorAll(s)];
    else if (s instanceof Array) return s.map(ss => $$(ss, b));
    const r = {};
    for (let name in s) r[name] = $$(s[name], b);
    return r;
}


/**
 * @func parseHTML
 * @desc Shortcut to `DOMParser.parseFromString` but returns the first element in `HTMLBodyElement` by default.
 * @param {string} html
 * @param {*} [selectors = body > *] -
 *  If given but not a string or array of strings, the whole `HTMLDocument` is returned.
 *  Otherwise, the first element in the DOM tree matching `selectors` is returned; if no such elements, `null` is returned.
 *  Defaults to return the first element in `document.body`.
 * @returns {HTMLDocument | Element | null}
 *
 *  Incomplete HTML string may lead to unexpected result.
 *  Browsers may unexpectedly add essential tags such as `<html>`, `<head>`, and `<body>`,
 *  even given `html` string contains no such tags.
 *
 *  It may also omit tags if the structure is not complete.
 *  For example, `<tr>` as the root node of the `html` string
 *  may cause browsers not creating elements but only the text nodes within them.
 *
 * @example
    /// returns an `Element` whose `tagName` is "em" and has string "hi!" as its text content.
    parseHTML("<EM>hi!</em>");

 * @example
    /// returns an `HTMLDocument` which could be represented by "<html><head></head><body><em>HI</em></body></html>".
    parseHTML("<EM>hi!</em>", null);

 * @example
    /// returns an `HTMLDocument` which could be represented by "<html><head><title>title</title></head><body><p>paragraph</p></body></html>".
    parseHTML("<title>title</title><p>paragraph</p>", {});

 * @example
    /// returns null because `<title>` is automatically inserted into `<head>` and thus nothing in `<body>`.
    parseHTML("<title>my title</title>");

 * @example
    /// returns null because `<tr>` is not allowed to exist outsied `<table>` and thus there is only a text node (which isn't an `Element`) in `<body>`.
    parseHTML("<tr><td>QQ</td></tr>");
 *
 */
export function parseHTML(html, selectors = "body > *") {
    if (typeof DOMParser === "undefined") throw ReferenceError("DOMParser is not defined");
    if (! parser) parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return (typeof selectors === "string") ? $(selectors, doc) : doc;
}
let parser;


/**
 * @func getNodes
 * @desc Get nodes within the specified node.
 * @param {string | string[] | Function} [accept = ()=>true] - fit nodes are included
 * @param {string | string[] | Function} [reject = ()=>false] - fit nodes are excluded
 * @param {Element | Document} [base = document] - root of the DOM tree to travere
 * @returns {Node[]} nodes which fit `accept` but not within those fit `reject`
 */
export function getNodes(
    accept = () => true,
    reject = () => false,
    base = document
) {
    /**
     * If none of selector is function, then only elements are considered and text nodes are ignored.
     * In this case, use `Element.querySelectorAll()`; otherwise, `TreeWalker` is the option.
     * `NodeIterator` is not considered here since it does not support `FILTER_REJECT`.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter }
     * @see {@link https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html }
     */
    if (typeof accept !== "function" && typeof reject !== "function") {
        if (accept instanceof Array) accept = accept.join(",");
        if (reject instanceof Array) reject = reject.join(",");
        return $$(accept, base).filter(elem => !$$(reject, base).includes(elem));
    }
    accept = createNodeSelector(accept, base);
    reject = createNodeSelector(reject, base);
    const filter = {
        acceptNode: node => {
            if (reject(node)) return NodeFilter.FILTER_REJECT;
            if (accept(node)) return NodeFilter.FILTER_ACCEPT;
            return NodeFilter.FILTER_SKIP;
        }
    };
    const walker = document.createTreeWalker(base, NodeFilter.SHOW_ALL, filter);

    let node, result = [];
    while(node = walker.nextNode()) result.push(node);
    return result;
}

/**
 * @private
 * @func createNodeSelector
 * @desc used in `getNodes`
 * @param {string | string[] | Function} filterRule
 * @param {Element | Document} base
 * @returns {Function} tests a node and returns a boolean
 */
function createNodeSelector(filterRule, base) {
    if (typeof filterRule === "function") return filterRule;
    if (typeof filterRule === "string") {
        const elements = $$(filterRule, base);
        return node => elements.includes(node);
    }
    if (filterRule instanceof Array) {
        filterRule = filterRule.map(tag => tag.toUpperCase());
        return node => filterRule.includes(node.tagName);
    }
    throw new TypeError("selector shall be a function, a CSS selector string, or an array of strings representing HTML tags.");
}


/**
 * @func createElementFromJsonML
 * @desc Use JsonML to create an HTML element. For attributes setting, see `setAttributes`.
 * @see {@link setAttributes}
 * @param {JsonML} jsonml
 * @param {string} [namespace] - set this to use `createElementNS()`
 * @returns {Element | TextNode}
 */
export function createElementFromJsonML(jsonml, namespace) {
    if (typeof namespace !== 'string') namespace = null; // make this function safe for functions such as `Array.map()`.

    if (jsonml instanceof Node)
        return jsonml.cloneNode(true);

    if (jsonml === null || jsonml === undefined || typeof jsonml === 'boolean')
        return document.createTextNode('');

    if (! (jsonml instanceof Array))
        return document.createTextNode(jsonml);

    let [tag, attributes, ...children] = jsonml;
    if (jsonml[1] === null || typeof jsonml[1] !== 'object' || jsonml[1] instanceof Array) {
        attributes = {};
        [tag, ...children] = jsonml;
    }

    if (tag === 'svg') namespace = 'http://www.w3.org/2000/svg';
    const ns = attributes.namespace ?? namespace;
    const elem = ns ? document.createElementNS(ns, tag) : document.createElement(tag);

    delete attributes.namespace;
    setAttributesInElement(attributes, elem);

    children = children
        .reduce((acc, cur) => { // filter out empty node and merge text nodes
            if (cur === null || cur === undefined || typeof cur === 'boolean' || cur === '') return acc;
            if (acc.length) {
                const last = acc.length - 1;
                if (typeof acc[last] === 'string' && typeof cur === 'string') {
                    acc[last] += cur;
                    return acc;
                }
            }
            acc.push(cur);
            return acc;
        }, [])
        .map(c => createElementFromJsonML(c, ns))
    ;

    elem.append(...children);
    return elem;
}


/**
 * @func createElementFromTemplate
 * @desc Use `HTMLTemplateElement` to create an HTML element.
 * @see {@link https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/template }
 *
 * @param {string | Node | HTMLTemplateElement} template
 *  - string: selector of the template element
 *  - Node: the node to be cloned
 *  - HTMLTemplateElement: the template where the first element is to be cloned
 *
 * @returns {Node}
 */
export function createElementFromTemplate(template) {
    if (typeof template === 'string') template = document.querySelector(template);
    if (! (template instanceof Node)) throw new TypeError('`template` shall be a `Node` or a string selector to an `Element`.');

    let clone;
    if (template instanceof HTMLTemplateElement) {
        if (template.content.childElementCount !== 1)
            console.warn('only the first element is cloned');
        clone = document.importNode(template.content, true).firstElementChild;
    }
    else clone = template.cloneNode(true);

    $$('[id]', clone).forEach(elem => elem.removeAttribute('id'));
    return clone;
}


/**
 * @deprecated
 * @func createElement
 * @desc my old JSON format to represent DOM; shall be replaced by `createElementFromJsonML`.
 * @see {@link https://github.com/kong0107/jsml }
 */
export function createElement() {
    console.error('`kongUtilDom.createElement()` has been removed. Use `kongUtilDom.createElementFromJsonML` instead.');
}


/**
 * @deprecated
 * @func clearElement
 * @desc call `Element.replaceChildren()` without any argument specified.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren#emptying_a_node }
 * @param {Element} [elem=this]
 * @returns {void}
 */
export function clearElement(elem = this) {
    console.warn('`kongUtilDom.clearElement()` has been deprecated. Use `Element.replaceChildren()` instead.');
    elem.replaceChildren();
}


/**
 * @func isEventInElement
 * @desc
 *  Check wheather a mouse event happens inside an element, even its target is not the element.
 *  Could be assign to `Element.prototype`.
 * @param {MouseEvent} event
 * @param {Element|string} [elem=this] the Element or the query selector to it
 * @returns {boolean}
 */
export function isEventInElement(event, elem = this) {
    const {clientX: x, clientY: y} = event;
    if (typeof elem === 'string') elem = $(elem);
    return [...elem.getClientRects()].some(r =>
        x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
    );
}


/**
 * @func downloadURL
 * @desc Make the borowser download the given URL to the local filesystem.
 * @param {URL | string} href
 * @param {string} filename
 * @returns {undefined}
 */
export function downloadURL(href, filename) {
    createElementFromJsonML(
        ['a', {href, download: filename}]
    ).click();
}


/**
 * @func downloadData
 * @desc Download the given data.
 * @param {string | ArrayBuffer | TypedArray | DataView | Blob} data
 * @param {string} filename
 * @param {string} [mimeType='']
 * @returns {string}
 */
export function downloadData(data, filename, mimeType = '') {
    const blob = new Blob([data], {type: mimeType});
    const url = URL.createObjectURL(blob);
    downloadURL(url, filename);
    return url;
}


/**
 * @private
 * @func setTextInElement
 * @desc Set `textContent` of the Element. Skip arguments to remove children.
 * @param {string} [text='']
 * @param {Element} [elem=this]
 * @returns {undefined}
 */
function setTextInElement(text = '', elem = this) {
    if (text) elem.textContent = text;
    else elem.replaceChildren();
}

/**
 * @func setText
 * @desc Set `textContent` of the first Element, if found any. Useful if you are not sure about its existence.
 * @param {string | Element} s CSS selector string, or an Element
 * @param {string} [text='']
 * @returns {null | Element} the first found Element, or null if not found.
 */
export function setText(s, text) {
    const elem = $(s);
    if (elem === null) return null;
    setTextInElement(text, elem);
    return elem;
}


/**
 * @private
 * @func setAriaInElement
 * @desc Set one of ARIA attribute
 * @param {string} attr
 * @param {NullLike | true | string} [value=null]
 * @param {Element} [elem=this]
 * @returns {undefined}
 */
function setAriaInElement(attr, value = null, elem = this) {
    if (attr != 'role' && ! attr.startsWith('aria-')) attr = `aria-${attr}`;
    if (isLikeNull(value)) elem.removeAttribute(attr);
    else elem.setAttribute(attr, (value === true) ? '' : value);
}

/**
 * @func setAria
 * @desc Set ARIA attribute of the first Element, if found any.
 * @param {string | Element} s CSS selector string, or an Element
 * @param {string} attr ARIA attribute name, `aria-` is auto-prefixed.
 * @param {NullLike | true | string} [value=null] NullLike value removes the attribute; true set it as empty string; others treated as string value.
 * @returns {null | Element} the first found Element, or null.
 */
export function setAria(s, attr, value = null) {
    const elem = $(s);
    if (elem === null) return null;
    setAriaInElement(attr, value, elem);
    return elem;
}


/**
 * @private
 * @func setAttributesInElement
 * @param {Object} attributes
 * @param {Element} [elem=this]
 * @returns {undefined}
 */
function setAttributesInElement(attributes, elem = this) {
    if (isLikeNull(attributes)) return;

    const nameSpaces = {};
    for (let name in attributes) {
        if (name.startsWith('xmlns:')) {
            nameSpaces[name.slice(6)] = attributes[name];
            elem.setAttribute(name, attributes[name]);
        }
    }

    if ('aria' in attributes) {
        const value = attributes.aria;
        attributes = Object.assign({}, attributes); // copy to avoid modification of origin argument
        if (isLikeNull(value)) { // remove all ARIA attributes
            [...elem.attributes].forEach(a => {
                if (a === 'role' || a.startsWith('aria-')) elem.removeAttribute(a);
            });
        }
        else for (let aa in value) { // treat them as normal attributes later
            const name = (aa === 'role') ? 'role' : `aria-${aa.toLowerCase()}`;
            attributes[name] = value[aa];
        }
        delete attributes.aria;
    }

    for (let name in attributes) {
        if (name.startsWith('xmlns:')) continue;
        const value = attributes[name];

        const pos = name.indexOf(':');
        if (pos !== -1) {
            const prefix = name.slice(0, pos);
            const ns = nameSpaces[prefix] ?? null;
            if (isLikeNull(value)) elem.removeAttributeNS(ns, name);
            else if (value === true) elem.setAttributeNS(ns, name, '');
            else elem.setAttributeNS(ns, name, value);
            continue;
        }

        name = name.toLowerCase();
        if (name.startsWith('on')) {
            listenMulti(elem, name.slice(2), value);
            continue;
        }
        switch (name) {
            case 'class': // for class name: either undefined, null, empty array, empty string leads to no class attribute.
            case 'classname': {
                if (value?.length) {// this handles either null, array, string
                    elem.setAttribute('class',
                        (typeof value === 'string') ? value : value.join(' ')
                    );
                }
                else elem.removeAttribute('class');
                break;
            }
            case 'css': // for style: undefined, null, string, and Object.<string, (string|null)> are acceptable.
            case 'style': {
                if (! value) elem.removeAttribute('style');
                else if (typeof value === 'string') elem.style.cssText = value;
                else for (let sp in value) {
                    /**
                     * Empty value is different from property without setting.
                     * So we might use `removeProperty()`, which uses kekbab-case.
                     */
                    const s = elem.style;
                    const prop = kebabize(sp);
                    if (isLikeNull(value[sp])) s.removeProperty(prop);
                    else if (value[sp].endsWith('!important'))
                        s.setProperty(prop, value[sp].slice(0, -10).trim(), 'important');
                    else s.setProperty(prop, value[sp]);
                }
                break;
            }
            case 'data': // for dataset: undefined, null and Object.<string, (string|null|undefined)> are acceptable.
            case 'dataset': {
                const d = elem.dataset;
                if (isLikeNull(value)) // this delete the whole dataset
                    for (let key in d) delete d[key];
                else for (let ds in value) {
                    const key = camelize(ds);
                    if (isLikeNull(value[ds])) delete d[key];
                    else if (value[ds] === true) d[key] = '';
                    else d[key] = value[ds];
                }
                break;
            }
            case 'text': {
                setTextInElement(value, elem);
                break;
            }
            // case 'aria': break; // shall has been delete before this for-loop
            // case 'namespace': break; // shall has been deleted within createElementFromJsonML
            default: {
                if (isLikeNull(value)) elem.removeAttribute(name);
                else if (value === true) elem.setAttribute(name, '');
                else elem.setAttribute(name, value);
            }
        }
    }
}


/**
 * @func setAttributes
 * @desc Set attributes of an Element by an object as a map.
 *
 * Attributes with namespace prefix are also supported.
 *
 * Attributes with undefined, null, or false value in the first argument would be removed in the Element, except event listeners.
 *
 * Event listeners are added by "on*"" such as "onclick" (case-insensitive).
 *
 * CSS class could be assigned by string or `Array.<string>`.
 *
 * Inline style could be assigned by string or `Object.<string>`.
 *
 * Set `text` property of the first argument would assign the element's `textContent`, though it's not an attribute.
 *
 * @param {string | Element} s CSS selector string, or an Element
 * @param {Object} attributes
 * @param {Function} [attributes.onClick]
 * @param {NullLike | string | Array.<string>} [attributes.class]
 * @param {NullLike | string | Object.<string, (string|NullLike)>} [attributes.style]
 * @param {NullLike | Object.<string, (string|NullLike)>} [attributes.data]
 * @param {NullLike | Object.<string, (string|NullLike)>} [attributes.aria]
 * @returns {null | Element} the first found Element, or null if not found.
 *
 * @example /// set body background to red
    setAttributes('#some-input', {
        type: 'text',
        value: 'my string'
    });
 *
 * @example /// set body background to red and text to white
    setAttributes('body', {style: 'background-color: red; color: white'});
 *
 * @example /// set body background to red
    setAttributes('body', {style: {
        backgroundColor: 'red',
        color: 'white'
    }});
 *
 * @example /// set body class
    setAttributes('body', {class: 'my-class your-class'});
 *
 * @example /// set body class
    setAttributes('body', {class: ['my-class', 'your-class']});
 *
 */
export function setAttributes(s, attributes) {
    const elem = $(s);
    if (elem === null) return null;
    setAttributesInElement(attributes, elem);
    return elem;
}


/**
 * @func extendElementPrototype
 * @desc Add some methods to `Element` class.
 */
export const extendElementPrototype = () => {
    const p = Element.prototype;
    Object.assign(p, {
        clear: p.replaceChildren,
        hasEventIn: isEventInElement,
        setText: setTextInElement,
        setAria: setAriaInElement,
        set: setAttributesInElement
    });
    [
        'after',
        'append',
        'before',
        'prepend',
        'replaceChildren',
        'replaceWith'
    ].forEach(method => {
        const origin = p[method];
        p[method] = function () {
            const nodes = [...arguments].map(node => {
                return (node instanceof Array) ? createElementFromJsonML(node) : node;
            });
            return origin.apply(this, nodes);
        };
    });
};


Object.assign(utilDom, {
    $, $$, parseHTML, getNodes,
    createElementFromTemplate,
    createElementFromJsonML,
    createElement,
    clearElement,
    isEventInElement,
    downloadURL, downloadData,
    setText,
    setAria,
    setAttributes,
    extendElementPrototype
});

export default utilDom;
