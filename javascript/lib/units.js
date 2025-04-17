/**
 * Description
 * @param {type} parameterName - Description
 * @returns {type} Description
 */
/** Utilities for manipulating measurement units. */
class Units {
  /**
   * Formats a value with measurement units.
   * @param value - The value to be displayed.
   * @param {string} units - The measurement units.
   * @param {(number|string)} [exponent] - If given, it will be displayed superscript after the units.
   * @returns {string} A display string with the value, units, and any exponent.
   */
  formatValue(value, units, exponent) {
    let displayValue = value;
    if (typeof value === "number") {
      const numberFormatter = new Intl.NumberFormat();
      displayValue = numberFormatter.format(value);
    }
    const exponentHtml = exponent ? `<sup>${exponent}</sup>` : "";
    return `${displayValue} ${units}${exponentHtml}`;
  }
}
