const { ArrayUtils, WarningUtils } = await cJS();

const season = dv.page(dv.current().growingSeason);
const warnings = WarningUtils.findPlantingWarnings(dv, dv.current(), season);
if (warnings.length > 0) ArrayUtils.insertDataviewCalloutFromArray(dv, "warning", "Planting Warnings", warnings);
