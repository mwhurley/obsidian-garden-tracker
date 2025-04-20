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

// Show plantings grouped by bed, but show beds in bed group order.
GardenBeds.groups.forEach(group => {
  const groupPlantings = plantings.filter(p => {
    if (p.bed) return p.bed.bedGroup === group.name;
    return false;
  }).sort(x => x.planting.file.name);
  if (groupPlantings.length > 0) {
    const plantingsByBed = groupPlantings.groupBy(x => x.bed.file.name);
    const sortedBeds = plantingsByBed.map(x => x.key).sort();
    sortedBeds.forEach(bedName => {
      const bedPlantings = plantingsByBed.filter(x => x.key === bedName).first().rows.sort(x => x.planting.file.name);
      const plantingLinks = bedPlantings.map(x => x.planting.file.link);
      ArrayUtils.insertDataviewCalloutFromArray(dv, "info", `[[${bedName}]]`, plantingLinks, false);
    });
  }
});
