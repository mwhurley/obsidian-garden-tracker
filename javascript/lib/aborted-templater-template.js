/** Utilities to interact with aborted Templater prompts. */
class AbortedTemplaterTemplate {
  /**
   * Cleans up a generated note.
   * @param tp - Templater's tp object.
   */
  cleanup(tp) {
    const abortedTFile = tp.config.target_file;
    tp.app.vault.delete(abortedTFile);
  }
  
  /**
   * Cleans up a generated note if a prompt was aborted.
   * @param tp - Templater's tp object.
   * @param {?*} promptResponse - The value returned by prompt() or suggester().
   * @param {?function} [extraIsAborted=null] - Optional function that returns true if the passed string indicates the template was aborted.
   * @returns {boolean} True if the prompt was aborted, otherwise false.
   */
  cleanupIfPromptAborted(tp, promptResponse, extraIsAborted = null) {
    if (promptResponse === null || (typeof promptResponse === "string" && promptResponse.length === 0) ||
      (extraIsAborted && extraIsAborted(promptResponse))) {
      this.cleanup(tp);
      return true;
    }
    return false;
  }
}
