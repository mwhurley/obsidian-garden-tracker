class ObsidianUtils {
  generateCalloutMarkdown(calloutType, title, multilineText, defaultToExpanded = true) {
    const adjustedText = multilineText.split("\n")
                                      .map(line => `> ${line}`)
                                      .join("\n");
    const expandIndicator = defaultToExpanded ? "+" : "-";
    return `> [!${calloutType}]${expandIndicator} ${title}\n${adjustedText}`;
  }
}
