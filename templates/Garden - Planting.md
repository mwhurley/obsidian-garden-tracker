---
<%-*
const { AbortedTemplaterTemplate, DateUtils, EmojiUtils, GardenBeds, GardenConfig, GardenGrowingSeasons, GardenSeeds, GardenPlantings, GardenPlantDefinitions, TemplaterUtils } = await cJS();

const name = await tp.system.prompt("Planting name:");
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, name)) return;

const dv = app.plugins.plugins.dataview.api;
const season = await tp.system.suggester((x => x.file.name), GardenGrowingSeasons.activeSeasons(dv), null, `Select the growing season for ${name}.`);
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, season)) return;

const seed = await tp.system.suggester(x => GardenSeeds.seedDisplayName(dv, x), GardenSeeds.seedsInStock(dv), null, `Select the seeds grown for ${name}.`);
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, seed)) return;

const activeBeds = dv.pages(`#${GardenBeds.gardenBedTag}`)
                     .where(x => x.active)
                     .sort(x => x.file.name);
const bed = await tp.system.suggester((x => x.file.name), activeBeds, null, `Select the garden bed for ${name}.`);
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, bed)) return;

let namePrefix = "";
const emoji = EmojiUtils.getCharIfEmoji(seed.category);
if (emoji) namePrefix = emoji;
const finalName = namePrefix + name;
await tp.file.rename(finalName);

const statuses = Object.entries(GardenPlantings.plantingStatuses);
let status = await tp.system.suggester((x => x[1].displayName), statuses, null, `Select the planting status for ${finalName}.`);
if (!status) status = statuses.find(x => x[0] === "Planning");
%>
tags: [ <% GardenPlantings.tags.concat([GardenGrowingSeasons.seasonTag(season)]).join(", ") %> ]
growingSeason: "<% `[[${season.file.name}]]` %>"
bed: "<% `[[${bed.file.name}]]` %>"
crop: "<% `[[${seed.file.name}]]` %>"
_status: <% status[0] %>
status: <% status[1].displayName %>
statusDate: <% DateUtils.toISODateString(new Date()) %>
---

```dataviewjs
const { ArrayUtils, WarningUtils } = await cJS();

const season = dv.page(dv.current().growingSeason);
const warnings = WarningUtils.findPlantingWarnings(dv, dv.current(), season);
if (warnings.length > 0) ArrayUtils.insertDataviewCalloutFromArray(dv, "warning", "Planting Warnings", warnings);
```
