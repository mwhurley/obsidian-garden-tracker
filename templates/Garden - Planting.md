---
<%-*
const { AbortedTemplaterTemplate, DateUtils, EmojiUtils, GardenBeds, GardenDefaults, GardenGrowingSeasons, GardenSeeds, GardenPlantings, GardenPlantDefinitions, TemplaterUtils } = await cJS();

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
<% GardenPlantings.frontmatterFields.tags %>: [ <% GardenPlantings.tags.concat([GardenGrowingSeasons.seasonTag(season)]).join(", ") %> ]
<% GardenPlantings.frontmatterFields.growingSeason %>: "<% `[[${season.file.name}]]` %>"
<% GardenPlantings.frontmatterFields.bed %>: "<% `[[${bed.file.name}]]` %>"
<% GardenPlantings.frontmatterFields.crop %>: "<% `[[${seed.file.name}]]` %>"
<% GardenPlantings.frontmatterFields.status %>: <% status[0] %>
<% GardenPlantings.frontmatterFields.displayStatus %>: <% status[1].displayName %>
<% GardenPlantings.frontmatterFields.statusDate %>: <% DateUtils.toISODateString(new Date()) %>
---
```dataviewjs
const { ArrayUtils, GardenPlantings, WarningUtils } = await cJS();

const season = dv.page(dv.current()[GardenPlantings.frontmatterFields.growingSeason]);
const warnings = WarningUtils.findPlantingWarnings(dv, dv.current(), season);
if (warnings.length > 0) ArrayUtils.insertDataviewCalloutFromArray(dv, "warning", "Planting Warnings", warnings);
```
