import OpcodeLabels from './opcode-labels.js';

const PADDING = 5;
const MONITOR_HEIGHT = 23;

const isUndefined = a => typeof a === 'undefined';

/**
 * Convert monitors from VM format to what the GUI needs to render.
 * - Convert opcode to a label and a category
 * - Add missing XY position data if needed
 * @param {object} block - The monitor block
 * @param {string} block.id - The id of the monitor block
 * @param {number} block.index - The index of the monitor
 * @param {string} block.opcode - The opcode of the monitor
 * @param {object} block.params - Extra params to the monitor block
 * @param {string} block.value - The monitor value
 * @param {number} x - The monitor x position
 * @param {number} y - The monitor y position
 * @return {object} The adapted monitor with label and category
 */
export default function ({id, index, opcode, params, value, x, y}) {
    let {label, category, labelFn} = OpcodeLabels(opcode);

    // Use labelFn if provided for dynamic labelling (e.g. variables)
    if (!isUndefined(labelFn)) label = labelFn(params);

    // Simple layout if x or y are undefined
    // @todo scratch2 has a more complex layout behavior we may want to adopt
    // @todo e.g. this does not work well when monitors have already been moved
    if (isUndefined(x)) x = PADDING;
    if (isUndefined(y)) y = PADDING + (index * (PADDING + MONITOR_HEIGHT));

    return {id, label, category, value, x, y};
}