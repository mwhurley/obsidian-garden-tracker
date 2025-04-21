---
<%-*
const { AbortedTemplaterTemplate, DateUtils, EmojiUtils, GardenBeds, GardenConfig, GardenGrowingSeasons, GardenSeeds, GardenPlantings, GardenPlantDefinitions, TemplaterUtils } = await cJS();

const name = await tp.system.prompt("Planting name:");
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, name)) return;

const dv = app.plugins.plugins.dataview.api;
const season = await tp.system.suggester((x => x.file.name), GardenGrowingSeasons.activeSeasons(dv), null, `Select the growing season for ${name}.`);
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, season)) return;

const seedsInStock = GardenSeeds.seedsInStock(dv).sort(x => x.file.name);
const seed = await tp.system.suggester(x => GardenSeeds.seedDisplayName(dv, x), seedsInStock, null, `Select the seeds grown for ${name}.`);
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, seed)) return;

const activeBeds = dv.pages(`#${GardenBeds.gardenBedTag}`)
                     .where(x => x.active)
                     .map(x => GardenBeds.proxy(x));
const activeBedsByGroup = dv.array(GardenBeds.groups.concat([null])).flatMap(group => { // wrap with dv.array to match flatMap DataArray result (needed for sort(func)).
							  const filterFunc = group ? (proxy => proxy.bedGroup === group.name) : (proxy => !proxy.bedGroup);
							  const groupBeds = activeBeds.filter(filterFunc);
							  return groupBeds.sort(b => b.file.name);
							});
const bed = await tp.system.suggester((x => x.file.name), activeBedsByGroup, null, `Select the garden bed for ${name}.`);
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
await dv.view("javascript/dataviewjs/garden-planting-show-warnings")
```
