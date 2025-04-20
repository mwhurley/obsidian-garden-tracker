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

## Current Plantings
```dataviewjs
const { ArrayUtils, GardenBeds, GardenGrowingSeasons } = await cJS();

const plantings = GardenGrowingSeasons.plantings(dv, dv.current())
                                      .map(p => {
                                        let bed = null;
                                        if (p.bed) bed = GardenBeds.proxy(dv.page(p.bed));
                                        return { planting: p, bed: bed };
                                      });
if (plantings.length === 0) {
  dv.paragraph("No plantings have been added to this growing season yet.");
  return;
}

GardenBeds.groups.forEach(group => {
  const groupPlantings = plantings.where(p => {
    if (p.bed) return p.bed.bedGroup === group.name;
    return false;
  }).sort(x => x.planting.file.name);
  if (groupPlantings.length > 0) {
    const plantingsByBed = groupPlantings.groupBy(x => x.bed.file.name);
    const sortedBeds = plantingsByBed.map(x => x.key).sort(x => x);
    sortedBeds.forEach(bedName => {
      const bedPlantings = plantingsByBed.where(x => x.key === bedName).first().rows.sort(x => x.planting.file.name);
      const plantingLinks = bedPlantings.map(x => x.planting.file.link);
      ArrayUtils.insertDataviewCalloutFromArray(dv, "info", `[[${bedName}]]`, plantingLinks, false);
    });
  }
});
```

## Planning
```dataviewjs
const { ArrayUtils, GardenBeds, GardenGrowingSeasons, GardenPlantDefinitions, GardenPlantings } = await cJS();

if (!dv.current().startDate) {
  dv.paragraph("This growing season does not have a start date, so the planning helper cannot be used.");
  return;
}

const currentPlantings = GardenGrowingSeasons.plantings(dv, dv.current());
const currentPlanningPlantings = currentPlantings.where(x => x._status === "Planning");
if (currentPlantings.length >= 0 && currentPlanningPlantings === 0) {
  dv.paragraph("This growing season has plantings and none are in the 📋Planning status, so the planning helper is hidden to declutter this note.");
  return;
}

const maxRotateYears = Math.max(...Object.entries(GardenPlantDefinitions.families)
                                         .map(x => x[1].rotateYears || 0));
const currentStartDate = dv.current().startDate;
const relevantSeasons = dv.pages(`#${GardenGrowingSeasons.tag}`)
                          .where(x => x.startDate)
                          .where(x => x.startDate < currentStartDate)
                          .where(x => x.startDate.year >= (currentStartDate.year - maxRotateYears + 1))
const existingPlantings = relevantSeasons.flatMap(x => {
											 const plantings = GardenGrowingSeasons.plantings(dv, x)
																				   .where(p => p.crop && p.bed)
																				   .flatMap(p => {
																				     const crop = dv.page(p.crop);
																				     if (!crop._category) return [];
																				     return [{ planting: p, category: crop._category }];
																				   })
																				   .flatMap(p => {
																					 const family = GardenPlantDefinitions.categories[p.category].family;
																					 const familyInfo = GardenPlantDefinitions.families[family];
																					 if (!familyInfo.rotateYears) return [];
																					 const bed = dv.page(p.planting.bed);
																					 return [{ planting: p.planting, bed: GardenBeds.proxy(bed), family: family }];
																				   });
											if (plantings.length === 0) return [];
										    return [{ season: x, plantings: plantings }];
										  })
										  .flatMap(x => x.plantings.map(p => ({ ...p, startDate: x.season.startDate })));
const rotatedFamilies = Object.entries(GardenPlantDefinitions.families)
                              .filter(x => x[1].rotateYears)
const allBeds = dv.pages(`#${GardenBeds.gardenBedTag}`).map(x => GardenBeds.proxy(x));
const possibleBedPlantings = allBeds.flatMap(b => rotatedFamilies.map(f => ({ family: f, bed: b })));
const allowedBedPlantings = possibleBedPlantings.filter(bf => {
                                                  const collidingPlantings = existingPlantings.filter(p => p.startDate.year >= (currentStartDate.year - bf.family[1].rotateYears + 1))
                                                                                              .filter(p => p.family === bf.family[0])
                                                                                              .filter(p => p.bed.file.name === bf.bed.file.name);
                                                  return collidingPlantings.length === 0;
                                                });
if (allowedBedPlantings.length === 0) {
  dv.paragraph("No plantings of the rotated plant families can be made.");
  return;
}

dv.paragraph("This shows rotated plant families that can be planted in each bed for this growing season.");
const allowedByBedAndFamily = dv.array(allowedBedPlantings)
                                .groupBy(x => x.bed.file.name)
                                .map(x => {
                                  return ({ ...x, families: x.rows.map(r => r.family[1].displayName).distinct().sort() })
                                });
GardenBeds.groups.forEach(group => {
  const groupBeds = allBeds.where(x => x.bedGroup === group.name)
                           .map(x => x.file.name)
                           .sort();
  groupBeds.forEach(bedName => {
    const bedFamilies = allowedByBedAndFamily.where(x => x.key === bedName);
    if (bedFamilies.length === 0) return;
    const allowedFamilies = bedFamilies.first().families;
    if (allowedFamilies.length === 0) return;
    ArrayUtils.insertDataviewCalloutFromArray(dv, "info", `[[${bedName}]]`, allowedFamilies);
  });
});
```