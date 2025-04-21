const { ArrayUtils, GardenBeds, GardenGrowingSeasons, GardenPlantings } = await cJS();

let showPlanningHelper = true;
let plannerHiddenReason = null;
if (!dv.current().startDate) {
  plannerHiddenReason = "This growing season does not have a start date, so the planning helpers will not be shown.";
  showPlanningHelper = false;
}

const plantings = GardenGrowingSeasons.plantings(dv, dv.current())
                                      .map(p => {
                                        let bed = null;
                                        if (p.bed) bed = GardenBeds.proxy(dv.page(p.bed));
                                        return { planting: p, bed: bed };
                                      });

if (showPlanningHelper) {
  const warnablePlantings = plantings.filter(p => GardenPlantings.warnablePlantingStatuses.includes(p.planting._status));
  if (plantings.length > 0 && warnablePlantings.length === 0) {
    plannerHiddenReason = "This growing season doesn't have any unplanted plantings, so the planning helpers will not be shown.";
    showPlanningHelper = false;
  }
}

const allBeds = dv.pages(`#${GardenBeds.gardenBedTag}`);

let allowedFamiliesByBed = null;
if (showPlanningHelper) {
  allowedFamiliesByBed = GardenGrowingSeasons.allowedPossiblePlantFamiliesByBed(dv, dv.current());
}

// Show plantings grouped by bed, but show beds in bed group order.
if (!showPlanningHelper) {
  const reason = [ plannerHiddenReason ];
  ArrayUtils.insertDataviewCalloutFromArray(dv, "important", "Planning Helpers Hidden", reason, false);
}
GardenBeds.groups.forEach(group => {
  const groupPlantings = plantings.filter(p => {
    if (p.bed) return p.bed.bedGroup === group.name;
    return false;
  }).sort(x => x.planting.file.name);
  const plantingsByBed = groupPlantings.groupBy(x => x.bed.file.name);
  const sortedBeds = allBeds.filter(b => GardenBeds.proxy(b).bedGroup === group.name).map(b => b.file.name).sort();
  sortedBeds.forEach(bedName => {
    const bedPlantings = plantingsByBed.filter(x => x.key === bedName)
                                       .flatMap(x => x.rows.sort(p => p.planting.file.name))
    const plantingLinks = bedPlantings.map(x => {
                                        const status = x.planting.status || x.planting._status;
                                        const statusText = status ? ` (${status})` : "";
                                        return `[[${x.planting.file.name}]]${statusText}`;
                                      });
    let allowedFamilies = dv.array([]); // wrap it to allow concat
    if (showPlanningHelper) {
      const bedFamilies = allowedFamiliesByBed.find(x => x.bedName === bedName).families;
      allowedFamilies = dv.array([`Allowed rotated families: ${bedFamilies.join(", ")}`]); // wrap it to allow concat
    }
    ArrayUtils.insertDataviewCalloutFromArray(dv, "info", `[[${bedName}]]`, allowedFamilies.concat(plantingLinks));
  });
});
