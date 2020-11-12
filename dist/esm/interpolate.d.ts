/**
 * Evaluate a piece of template string containing %{ } placeholders.
 * E.g.: 'Hi %{ user.name }' => 'Hi Bob'
 *
 * This is a vm.$interpolate alternative for Vue 2.
 * https://vuejs.org/v2/guide/migration.html#vm-interpolate-removed
 *
 * @param {String} msgid - The translation key containing %{ } placeholders
 * @param {Object} context - An object whose elements are put in their corresponding placeholders
 *
 * @return {String} The interpolated string
 */
declare let interpolate: any;
export default interpolate;
