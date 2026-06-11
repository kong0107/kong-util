/**
 * @module kongUtilBootstrap
 */
import utilBootstrap from "./core.mjs";
import {
    createInputComplex,
    createSelectElement
} from "./html-elem.mjs";

export * from "./core.mjs";

/**
 * @func bsInputBasic
 * @desc Basic Bootstrap \<input> or \<textarea> with a prepending \<label>.
 * @see {@link https://getbootstrap.com/docs/5.3/forms/form-control/ }
 * @param {Object} inputAttrs
 * @param {string | JsonML | HTMLlabelContentent} labelContent
 * @param {Array.<string>} [datalist=null]
 * @returns {HTMLDivElement}
 */
export function bsInputBasic(
    inputAttrs,
    labelContent,
    datalist = null
) {
    const container = createInputComplex(inputAttrs, labelContent, '', 'before', datalist);
    const [label, control] = container.childNodes;
    label.classList.add('form-label');
    control.classList.add('form-control');
    return container;
}


/**
 * @func bsInputFloatingLabel
 * @desc Bootstrap \<input> or \<textarea> with a floating \<label>.
 * @see {@link https://getbootstrap.com/docs/5.3/forms/floating-labels }
 * @param {Object} inputAttrs - attribute `placeholder` shall exist for floating mechanism to work, but its value is not important.
 * @param {string | JsonML | HTMLlabelContentent} labelContent
 * @param {Array.<string>} [datalist=null]
 * @returns {HTMLDivElement}
 */
export function bsInputFloatingLabel(
    inputAttrs,
    labelContent,
    datalist = null
) {
    inputAttrs = {...inputAttrs, placeholder: inputAttrs.placeholder || 'placeholder'};
    const container = createInputComplex(
        inputAttrs,
        labelContent,
        'form-floating',
        'after',
        datalist
    );
    container.childNodes[0].classList.add('form-control');
    return container;
}


/**
 * @func bsCheckbox
 * @desc Bootstrap \<input type="checkbox"> with an appending \<label>; would be radio or switch if explicitly specified.
 * @see {@link https://getbootstrap.com/docs/5.3/forms/checks-radios/}
 * @param {Object} inputAttrs
 * @param {string | JsonML | HTMLlabelContentent} labelContent
 * @returns {HTMLDivElement}
 */
export function bsCheckbox(
    inputAttrs,
    labelContent
) {
    inputAttrs = {...inputAttrs, type: inputAttrs.type || 'checkbox'};
    const container = createInputComplex(inputAttrs, labelContent, 'form-check', 'after');
    const [input, label] = container.childNodes;
    input.classList.add('form-check-input');
    label.classList.add('form-check-label');
    return container;
}


/**
 * @func bsRadio
 * @desc Bootstrap \<input type="radio"> with an appending \<label>.
 * @see {@link https://getbootstrap.com/docs/5.3/forms/checks-radios/#radios }
 * @param {Object} inputAttrs
 * @param {string | JsonML | HTMLlabelContentent} labelContent
 * @returns {HTMLDivElement}
 */
export function bsRadio(inputAttrs, labelContent) {
    return bsCheckbox(
        {...inputAttrs, type: 'radio'},
        labelContent
    );
}


/**
 * @func bsSwitch
 * @desc Bootstrap \<input type="checkbox" role="switch"> with an appending \<label>.
 * @see {@link https://getbootstrap.com/docs/5.3/forms/checks-radios/#switches }
 * @param {Object} inputAttrs
 * @param {string | JsonML | HTMLlabelContentent} labelContent
 * @returns {HTMLDivElement}
 */
export function bsSwitch(inputAttrs, labelContent) {
    const container = bsCheckbox(
        {...inputAttrs, type: 'checkbox', role: 'switch'},
        labelContent
    );
    container.classList.add('form-switch');
    return container;
}


/**
 * @func bsSelectFloatingLabel
 * @see {@link https://getbootstrap.com/docs/5.3/forms/floating-labels/#selects }
 * @param {Object} selectAttrs
 * @param {string | JsonML | HTMLlabelContentent} labelContent
 * @param {Array.<string> | Map | Object} options
 * @param {string | Array.<string>} selected
 * @returns {HTMLDivElement}
 *
 * @example
 *  bsSelectFloatingLabel({}, 'floating label', ['a1', 'a2', 'a3'], 'a3')
 */
export function bsSelectFloatingLabel(
    selectAttrs,
    labelContent,
    options,
    selected = []
) {
    const main = createSelectElement(selectAttrs, options, selected);
    main.classList.add('form-select');

    const container = createInputComplex({}, labelContent, 'form-floating', 'after');
    const [input, label] = container.childNodes;
    input.replaceWith(main);
    label.setAttribute('for', main.id = main.id || crypto.randomUUID());

    return container;
}


Object.assign(utilBootstrap, {
    bsInputBasic,
    bsInputFloatingLabel,
    bsCheckbox,
    bsRadio,
    bsSwitch,
    bsSelectFloatingLabel
});

export default utilBootstrap;
