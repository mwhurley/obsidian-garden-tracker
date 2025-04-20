const { ArrayUtils, WarningUtils } = await cJS();

const warnings = WarningUtils.findSeasonWarnings(dv, dv.current());
if (warnings.length > 0) {
  ArrayUtils.insertDataviewCalloutFromArray(dv, "warning", "Planting Warnings", warnings);
  dv.paragraph("");
}
