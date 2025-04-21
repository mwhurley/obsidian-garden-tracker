/** Helper for interacting with garden growing season notes. */
class GardenGrowingSeasons {
  /**
   * Gets the currently active (endDate is null) growing seasons.
   * @param dv Dataview's dv object.
   * @returns {DataArray} Array of Dataview page objects for the active seasons, newest (by startDate) first.
   */
  activeSeasons(dv) {
    const openSeasons = dv.pages(`#${this.tag}`)
                          .where(s => !s.endDate)
                          .sort(s => s.startDate, "desc");
    return openSeasons;
  }
  
/**
 * @typedef {Object.<string, *>} PossiblePlantFamiliesByBed
 * @property {string} bedName - Name of the garden bed.
 * @property {string[]} families - Array of plant family display names allowed in the bed for the given growing season.
 */
/**
 * Gets the allowed possible plant families for the given growing season.
 * Meant to help show useful info to help plan garden beds for a growing season.
 * @param dv - Dataview's dv object.
 * @param season - Dataview page object representing the growing season being planned.
 * @returns {PossiblePlantFamiliesByBed}
 */
allowedPossiblePlantFamiliesByBed(dv, season) {
  const { GardenBeds, GardenPlantDefinitions } = customJS;

  const maxRotateYears = Math.max(...Object.entries(GardenPlantDefinitions.families)
                                       .map(x => x[1].rotateYears || 0));
  const currentStartDate = dv.current().startDate;
  const relevantSeasons = dv.pages(`#${this.tag}`)
                            .filter(x => x.startDate)
                            .filter(x => x.startDate < currentStartDate)
                            .filter(x => x.startDate.year >= (currentStartDate.year - maxRotateYears + 1))
  const existingPlantings = relevantSeasons.flatMap(x => {
                          const plantings = this.plantings(dv, x)
                                               .filter(p => p.crop && p.bed)
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
                                                    // Previously the longest rotation period was used to find relevant seasons.
                                                    // To compare plantings we need to use the rotation period from the planting's family.
                                                    const collidingPlantings = existingPlantings.filter(p => p.startDate.year >= (currentStartDate.year - bf.family[1].rotateYears + 1))
                                                                                                .filter(p => p.family === bf.family[0])
                                                                                                .filter(p => p.bed.file.name === bf.bed.file.name);
                                                    return collidingPlantings.length === 0;
                                                  });
  const allowedFamiliesByBed = dv.array(allowedBedPlantings)
                                 .groupBy(x => x.bed.file.name)
                                 .map(x => ({
                                   bedName: x.key,
                                   families: x.rows.distinct(r => r.family[1].displayName)
                                                   .sort(r => r.family[0])
                                                   .map(r => r.family[1].displayName)
                                 }));
  return allowedFamiliesByBed;
}
  
  /**
   * Gets the latest (by startDate) active (endDate is null) growing season.
   * @param dv Dataview's dv object.
   * @returns Dataview page object for the latest growing season.
   */
  latestSeason(dv) {
    const openSeasons = this.activeSeasons(dv);
    if (openSeasons.length === 0) return null;
    return openSeasons.first();
  }
  
  /**
   * Gets plantings from all seasons except the one passed in.
   * @param dv Dataview's dv object.
   * @param season Dataview page object for the season used to anchor the query.
   * @returns {DataArray} Array of Dataview page objects of plantings for the other seasons.
   */
  plantingsFromAllOtherSeasonsWithInfo(dv, season) {
    const { GardenPlantings } = customJS;
    
    const seasonTag = this.seasonTag(season);
    const otherSeasonPlantings = dv.pages(`#${GardenPlantings.tag} and !#${seasonTag}`)
                                   .map(x => {
                                     const bed = dv.page(x.bed);
                                     const family = GardenPlantings.family(dv, x);
                                     return { planting: x, bed: bed, family: family };
                                   });
    return otherSeasonPlantings;
  }
  
  /**
   * Gets plantings for the given season.
   * @param dv Dataview's dv object.
   * @param season Dataview page object for the target season.
   * @returns {DataArray} Array of Dataview page objects of the season's plantings.
   */
  plantings(dv, season) {
    const { GardenPlantings } = customJS;
    
    const seasonTag = this.seasonTag(season);
    return dv.pages(`#${GardenPlantings.tag} and #${seasonTag}`);
  }
  
  /**
   * Tag that associates other garden items with the given season.
   * @param season The Dataview page object of a growing season.
   * @returns {string} The season's tag.
   */
  seasonTag(season) {
    return season.tags.find(x => x.startsWith("s") && x.length == 5);
  }
  
  /**
   * Tag that identifies a growing season, without #.
   * @type {string}
   */
  get tag() { return "growingSeason"; }
  
  /**
   * Complete array of tags meant to be used with growing seasons.
   * @type {string[]}
   */
  get tags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.tag ]);
  }
}
