class AbortedTemplaterTemplate {
  cleanup(tp) {
    const abortedTFile = tp.config.target_file;
    tp.app.vault.delete(abortedTFile);
  }
  
  cleanupIfPromptAborted(tp, promptResponse, extraIsAborted = null) {
    if (promptResponse === null || (typeof promptResponse === "string" && promptResponse.length === 0) ||
      (extraIsAborted && extraIsAborted(promptResponse))) {
      this.cleanup(tp);
      return true;
    }
    return false;
  }
}
