/**
 * @module kongUtilHtmlElem
 */
import utilHtmlElem from "./core.mjs";
import {
    $, $$,
    setAttributesInElement,
    isEventInElement,
    setTextInElement,
    setAriaInElement
} from "./dom.mjs";

export * from "./core.mjs";


/**
 * @func createElement
 * @desc Use JsonML to create an HTML element. For attributes setting, see `setAttributes`.
 * @see {@link setAttributes}
 * @param {JsonML} jsonml
 * @param {string} [namespace] - set this to use `createElementNS()`
 * @returns {Element | TextNode}
 */
export function createElement(jsonml, namespace) {
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
        .map(c => createElement(c, ns))
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
 * @func createButton
 * @desc Shortcut for `createElement(['button', ...])` with default type 'button'
 * @param {Object} attrs
 * @param {string | JsonML} content
 * @returns {HTMLButtonElement}
 */
export function createButton(attrs, content) {
    return createElement(
        ['button',
            {type: 'button', ...attrs},
            content
        ]
    );
}


/**
 * @func addStyleSheet
 * @desc Add a `<link rel="stylesheet" href="...">` before `</head>`.
 * @param {string | URL} href
 * @param {Object} [otherAttrs={}] - other attributes of `<link>`. `rel` could be overwritten if you want to add different things.
 * @returns {undefined}
 *
 * @example /// basic usage
 *  addStyleSheet('https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.css');
 *
 * @example /// works but not recommended
 *  addStyleSheet('apple-icon-114.png', {rel: 'apple-touch-icon', size: '114x114', type: 'image/png'});
 */
export function addStyleSheet(href, otherAttrs = {}) {
    document.head.append(createElement(
        ['link', {
            rel: 'stylesheet',
            ...otherAttrs,
            href: href.toString()
        }]
    ));
}


/**
 * @func createInputComplex
 * @desc Create a container wrapping an input, a label, and maybe a datalist; with auto-generated UUID for linking to each other.
 * @param {Object} inputAttrs - attributes of \<input>
 * @param {string | JsonML | HTMLlabelContentent} labelContent - content of \<label> or itself
 * @param {string} [wrapClassName=''] - className for wrapping \<div>
 * @param {string} [labelPosition='before'] - 'before' or 'after'
 * @param {Array.<string>} [datalist=null] - content of \<datalist>. Empty array still results in creating \<datalist>. Use null/false/undefined to disable that.
 * @returns {HTMLDivElement}
 *
 * @example /// basic usage
 *  createInputComplex({type: 'text'}, 'labelHere~');
 *
 * @example /// checked checkbox
 *  createInputComplex(
 *      {type: 'checkbox', checked: true},
 *      'here is a checkbox',
 *      '',
 *      'after'
 *  );
 *
 * @example /// file selector
 *  createInputComplex(
 *      {type: 'file', style: 'display: none;'},
 *      ['span', {style: 'border: 1px solid #444;'}, 'File Selector']
 *  );
 */
export function createInputComplex(
    inputAttrs,
    labelContent,
    wrapClassName = '',
    labelPosition = 'before',
    datalist = null
) {
    const inputId = inputAttrs.id = inputAttrs.id || crypto.randomUUID();

    let jsonML = ['input', inputAttrs];
    if (inputAttrs.type === 'textarea') {
        const newAttrMap = Object.assign({}, inputAttrs);
        delete newAttrMap.type;
        let text = '';
        if (Object.hasOwn(inputAttrs, 'value')) {
            text = inputAttrs.value || '';
            delete newAttrMap.value;
        }
        inputAttrs = newAttrMap;
        jsonML = ['textarea', newAttrMap, text];
    }
    const inputElem = createElement(jsonML);

    if (typeof labelContent === 'string')
        labelContent = createElement(['label', {for: inputId}, labelContent]);
    else if (Array.isArray(labelContent)) {
        if (labelContent[0] !== 'label')
            labelContent = createElement(['label', {for: inputId}, labelContent]);
        else {
            labelContent = createElement(labelContent);
            labelContent.setAttribute('for', inputId);
        }
    }
    else if (!(labelContent instanceof Element))
        throw new TypeError('Unknown type ' + typeof labelContent);

    const container = createElement(['div', {class: wrapClassName}]);
    switch (labelPosition) {
        case 'after': {
            container.append(inputElem, labelContent);
            break;
        }
        case 'before': {
            container.append(labelContent, inputElem);
            break;
        }
        default:
            throw new RangeError(`Unknown position ${labelPosition}`);
    }

    if (datalist) {
        const listId = crypto.randomUUID();
        inputElem.setAttribute('list', listId);
        container.append(createElement(
            ['datalist', {id: listId}, ...datalist.map(value => ['option', {value}])]
        ));
    }

    return container;
}


/**
 * @func createSelectElement
 * @desc Create \<select> and \<option>s inside.
 * @param {Object} attrs - attributes of \<select>
 * @param {Array.<string> | Map | Object} options - key-value pairs of \<option>s; or strings for \<option>s with same value and textContent.
 * @param {string | Array.<string>} - value(s) of selected \<option>s
 * @returns {HTMLSelectElement}
 *
 * @example /// basic usage
 *  createSelectElement({}, ['a', 'b', 'c'], 'b');
 *
 * @example /// use object as key-value pairs. note "key"s would be shown texts.
 *  createSelectElement(
 *      {multiple: true, style: 'height: 6em'},
 *      {text1: 'value1', text2: 'value2', text3: 'value3'},
 *      ['value2', 'value3']
 *  );
 *
 */
export function createSelectElement(attrs, options, selected = []) {
    let optionMLs = [];
    if (typeof selected === 'string') selected = [selected];

    if (Array.isArray(options))
        optionMLs = options.map(value => ['option', {value}, value]);
    else if (options instanceof Map)
        options.forEach((value, key) => optionMLs.push(['option', {value}, key]));
    else for (const key in options)
        optionMLs.push(['option', {value: options[key]}, key]);

    optionMLs.forEach(jsonml => {
        if (selected.includes(jsonml[1].value)) jsonml[1].selected = true;
    });
    return createElement(['select', attrs, ...optionMLs]);
}


/**
 * @func createTable
 * @desc Shortcut to create a simple HTML table.
 *      For more complicated setting (ex. cell styling; resorting; transpose; filter), you should do it by yourself.
 * @param {Array.<Array | Object>} records - each element is either an array, or an object maps names to data
 * @param {Array.<string | JsonML> | Object} [columns] - each element is either a JsonML, or an object maps names to attributes of `<th>`
 * @param {Object} [tableAttrs={}] - attributes of `<table>`
 * @returns {HTMLTableElement}
 *
 * @example /// basic usage
 *  createTable([[1, 2, 3], [4, 5], ['', '', 6]]);
 *
 * @example /// with column names
 *  createTable(
 *      [
 *          [1, 2, 3],
 *          {a: 4, b: 5},
 *          {c: 6}
 *      ],
 *      ['a', 'b', 'c']
 *  );
 */
export function createTable(
    records,
    columns,
    tableAttrs = {}
) {
    const jsonml = ['table', tableAttrs];

    let columnNames = [];
    if (columns) {
        let ths = [];
        if (Array.isArray(columns)) {
            columnNames = columns;
            ths = columns.map(col => ['th', {scope: 'col'}, col]);
        }
        else for (const name in columns) {
            columnNames.push(name);
            const colInfo = columns[name];
            if (typeof colInfo === 'string' || Array.isArray(colInfo))
                ths.push(['th', {scope: 'col', title: name}, colInfo]);
            else {
                const content = colInfo.content || name;
                delete colInfo.content;
                ths.push(['th', {scope: 'col', title: name, ...colInfo}, content]);
            }
        }
        jsonml.push(['thead', ['tr', ...ths]]);
    }

    const trs = records.map(fields => {
        if (Array.isArray(fields)) return ['tr', ...fields.map(cellContent => ['td', cellContent])];
        return ['tr', ...columnNames.map(name => ['td', {title: name}, fields[name] || ''])];
    });
    jsonml.push(['tbody', ...trs]);

    return createElement(jsonml);
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
                return (node instanceof Array) ? createElement(node) : node;
            });
            return origin.apply(this, nodes);
        };
    });
};


Object.assign(utilHtmlElem, {
    addStyleSheet,
    createElement,
    createElementFromTemplate,
    createButton,
    createInputComplex,
    createSelectElement,
    createTable
});

export default utilHtmlElem;
