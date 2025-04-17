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
    const year = season.startDate.year;
    return `s${year}`;
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
