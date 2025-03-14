/**
 * @module kongUtilImage
 */
import utilImage from './core.mjs';
import {base64ToBlob} from './string.mjs';
import {fetchStrict} from './web.mjs';

export * from './core.mjs';

/**
 * @func readImage
 * @desc Support more than createImageBitmap().
 * @param {*} source - string and those supported by `createImageBitmap()` in Web API
 * @param {string} [option] - used only if `source` is pure base64 string (instead of dataURL)
 * @param {Object} [option] - passed as the 2nd argument of `fetch()`
 * @returns {Promise<ImageBitmap>}
 */
export async function readImage(source, option) {
    if (source instanceof ImageBitmap) return source;
    if (typeof source === 'string') {
        if (/^https?:\/\//.test(source)) {
            const res = await fetchStrict(source, option);
            source = await res.blob();
        }
        else source = base64ToBlob(source, option);
    }
    return await createImageBitmap(source);
}


/**
 * @func canvasTo
 * @param {HTMLCanvasElement} canvas
 * @param {string} returnType - `bitmap`, `blob`, `dataURL`, or `canvas`
 * @returns {Promise<*>}
 */
export async function canvasTo(canvas, returnType, format, quality) {
    switch (returnType) {
        case 'canvas': return canvas;
        case 'dataURL': return canvas.toDataURL(format, quality);
        case 'bitmap': return await createImageBitmap(canvas);
        case 'blob': {
            return new Promise((resolve, reject) => {
                canvas.toBlob(blob => {
                    if (blob) return resolve(blob);
                    reject("the image cannot be created");
                }, format, quality);
            });
        }
        default: throw new TypeError('unknown returnType');
    }
}


/**
 * @func resizeImage
 * @desc Load and resize an image to specified format.
 *
 * Safari does not support `options.resize*` in `createImageBitmap()`;
 * therefore we must draw the bitmap to canvas, instead of resizing it by calling `creatImageBitmap()`.
 *
 * @param {*} source
 * @param {Object} settings
 * @param {number} [settings.scale] - conflicts with `width` and `height`
 * @param {number} [settings.width] - conflicts with `scale`
 * @param {number} [settings.height] - conflicts with `scale`
 * @param {string} [settings.fit=contain] - `fill`, `contain`, `cover`, `scaleDown`. Only useful if both `width` and `height` are given.
 * @param {string} [settings.format=image/png] - MIME
 * @param {number} [settings.quality] - between `0` and `1`
 * @param {string} [settings.returnType=canvas] - `canvas`, `blob`, or `dataURL`
 * @returns {Promise<*>}
 *
 * @example /// resize the chosen file and then show it
    resizeImage($('[type=file]').files[0], {scale: .5, returnType: 'dataURL'})
    .then(url => location = url);
 *
 */
export async function resizeImage(source, settings) {
    let bitmap = await readImage(source);
    let width = bitmap.width, height = bitmap.height;
    const source_ratio = bitmap.width / bitmap.height;

    // Calculate width and height.
    if (settings.scale > 0) {
        width = bitmap.width * settings.scale;
        height = bitmap.height * settings.scale;
    }
    else if (! settings.width || settings.width < 0) {
        if (settings.fit !== 'scaleDown' || settings.height < bitmap.height) {
            width = settings.height * source_ratio;
            height = settings.height;
        }
        // else: do not resize
    }
    else if (! settings.height || settings.height < 0) {
        if (settings.fit !== 'scaleDown' || settings.width < bitmap.width) {
            width = settings.width;
            height = settings.width / source_ratio;
        }
        // else: do not resize
    }
    else { // Both `settings.width` and `settings.height` are given.
        switch (settings.fit ?? 'contain') {
            case 'scaleDown':
            case 'contain': {
                if (settings.width / settings.height > source_ratio) {
                    width = settings.height * source_ratio;
                    height = settings.height;
                }
                else {
                    width = settings.width;
                    height = settings.width / source_ratio;
                }

                if (settings.fit !== 'scaleDown') break; // !!
                if (width > bitmap.width || height > bitmap.height) {
                    width = bitmap.width;
                    height = bitmap.height;
                }
                break;
            }
            case 'cover':
            case 'fill': {
                width = settings.width;
                height = settings.height;
                if (settings.fit === 'fill') break; // !!

                // For `cover`, crop the source image.
                let cx, cy, cw, ch; // stands for "cropped x", ...
                const target_ratio = settings.width / settings.height;
                if (target_ratio > source_ratio) {
                    cw = bitmap.width;
                    ch = cw / target_ratio;
                    cx = 0;
                    cy = (bitmap.height - ch) / 2;
                }
                else {
                    ch = bitmap.height;
                    cw = ch * target_ratio;
                    cx = (bitmap.width - cw) / 2;
                    cy = 0;
                }
                [cx, cy, cw, ch] = [cx, cy, cw, ch].map(Math.round);
                bitmap = await createImageBitmap(bitmap, cx, cy, cw, ch);
                break;
            }
            default:
                throw new TypeError('unknown fit method', settings.fit);
        }
    }
    width = Math.round(width);
    height = Math.round(height);

    // Create canvas and draw.
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, width, height);

    let format = settings.format ?? 'png';
    if (! format.startsWith('image/')) format = ('image/' + format).toLowerCase();

    return canvasTo(
        canvas,
        settings.returnType ?? 'canvas',
        format,
        settings.quality
    );
}


Object.assign(utilImage, {
    readImage, canvasTo, resizeImage
});

export default utilImage;
