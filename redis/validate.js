/**
 * Function that checks if data input is a string or a number
 *
 * @param {Any} data - a param that will return 'true' if a 'string' or 'number' 
 */
const dataCheck = (data) => typeof data == 'string' || typeof data == 'number';

/**
 * Function that removes all special characters from a string or number
 *
 * @param {String|HTMLElement} data - a string or number, will return with special chars removed. 
 */
const cleanData = (data) => data.replace(/[^a-zA-Z0-9]/g, '');

module.exports = { dataCheck, cleanData };
