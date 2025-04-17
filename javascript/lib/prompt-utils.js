/** Utilities for dealing with prompts. */
class PromptUtils {
  /**
   * Parses a string as number and returns zero if the string is badly formed.
   * @param {string} str - The string to parse.
   * @returns {number} The number represented by str, or zero if str is not parseable.
   */
  toNumberOrZero(str) { return Number(str) || 0; }
}
