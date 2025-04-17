/** Utilities for use with Templater. */
class TemplaterUtils {
  /**
   * Shows a prompt and returns the value as a number.
   * @param tp - Templater's tp object.
   * @param promptText - The text to show in the prompt.
   * @returns {number} The prompt response parsed as a number, or 0 if the response is unparseable.
   */
  async promptNumber(tp, promptText) {
    const answer = await tp.system.prompt(promptText);
    return Number(answer) || 0;
  }
}
