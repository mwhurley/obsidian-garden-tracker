---
<%-*
const { AbortedTemplaterTemplate, DateUtils, GardenConfig, GardenGrowingSeasons, TemplaterUtils } = await cJS();

const now = new Date();
const isoToday = DateUtils.toISODateString(now);
const startDate = await tp.system.prompt("Growing season start date:", isoToday);
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, startDate, x => !Date.parse(x))) return;
const year = (new Date(startDate)).getUTCFullYear();
await tp.file.rename(`${GardenConfig.itemPrefixes.growingSeason}${year} Growing Season`);

let endDate = await tp.system.prompt("Growing season end date (if known):");
if (!Date.parse(endDate)) endDate = null;
%>
tags: [ <% GardenGrowingSeasons.tags.concat([`s${year}`]).join(", ") %> ]
startDate: <% startDate %>
endDate: <% endDate %>
---

```dataviewjs
const { ArrayUtils, WarningUtils } = await cJS();

const warnings = WarningUtils.findSeasonWarnings(dv, dv.current());
if (warnings.length > 0) ArrayUtils.insertDataviewCalloutFromArray(dv, "warning", "Planting Warnings", warnings);
```
