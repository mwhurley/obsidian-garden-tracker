/** Utilities for interacting with Date objects. */
class DateUtils {
  /**
   * Formats a date as an ISO date: yyyy-mm-dd.
   * @param {Date} date - The date object to format as a string.
   * @returns {string} The ISO form of the date.
   */
  toISODateString(date) {
    return date.toLocaleDateString("sv");
  }
}
