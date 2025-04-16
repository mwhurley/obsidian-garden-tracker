class ArrayUtils {
  insertDataviewCalloutFromArray(dv, calloutType, title, array) {
    const { ObsidianUtils } = customJS;
    
    const markdown = dv.markdownList(array);
    const callout = ObsidianUtils.generateCalloutMarkdown(calloutType, title, markdown);
    dv.paragraph(callout);
  }
}
