/** Utilities for generating Obsidian friendly content. */
class ObsidianUtils {
  /**
   * Generates markdown for the wanted type of callout showing the given text.
   * @param {string} calloutType - The type of callout, expected to be a value Obsidian allows in a callout's markdown.
   * @param {string} title - The callout's title.
   * @param {string} multilineText - The text to put in the callout. This can be markdown.
   * @param {boolean} [defaultToExpanded=true] - Flag that indicates if the callout starts opened or closed.
   * @returns {string} The callout's markdown.
   */
  generateCalloutMarkdown(calloutType, title, multilineText, defaultToExpanded = true) {
    const adjustedText = multilineText.split("\n")
                                      .map(line => `> ${line}`)
                                      .join("\n");
    const expandIndicator = defaultToExpanded ? "+" : "-";
    return `> [!${calloutType}]${expandIndicator} ${title}\n${adjustedText}`;
  }
}
