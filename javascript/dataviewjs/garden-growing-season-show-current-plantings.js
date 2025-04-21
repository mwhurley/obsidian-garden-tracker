const { ArrayUtils, GardenBeds, GardenGrowingSeasons } = await cJS();

const plantings = GardenGrowingSeasons.plantings(dv, dv.current())
                                      .map(p => {
                                        let bed = null;
                                        if (p.bed) bed = GardenBeds.proxy(dv.page(p.bed));
                                        return { planting: p, bed: bed };
                                      });

const allBeds = dv.pages(`#${GardenBeds.gardenBedTag}`);

// Show plantings grouped by bed, but show beds in bed group order.
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
    ArrayUtils.insertDataviewCalloutFromArray(dv, "info", `[[${bedName}]]`, plantingLinks);
  });
});
