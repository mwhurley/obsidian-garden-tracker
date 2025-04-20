/** Utilities for interacting with arrays */
class ArrayUtils {
  /**
   * Uses Dataview to insert a callout made of data from an array.
   * @param dv - Dataview's dv object.
   * @param {string} calloutType - The type of callout, expected to be a value Obsidian allows in a callout's markdown.
   * @param {string} title - The callout's title.
   * @param {Array|DataArray} array - The data to put in a list in the callout.
   * @param {boolean} [defaultToExpanded=true] - Flag that indicates if the callout starts opened or closed.
   */
  insertDataviewCalloutFromArray(dv, calloutType, title, array, defaultToExpanded = true) {
    const { ObsidianUtils } = customJS;
    
    const markdown = dv.markdownList(array);
    const callout = ObsidianUtils.generateCalloutMarkdown(calloutType, title, markdown, defaultToExpanded);
    dv.paragraph(callout);
  }
}
