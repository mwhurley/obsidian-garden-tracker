class GardenGrowingSeasons {
  static #frontmatterFields = {
    tags: "tags",
    startDate: "startDate",
    endDate: "endDate"
  };
  
  activeSeasons(dv) {
    const openSeasons = dv.pages(`#${this.tag}`)
                          .where(s => !s.endDate)
                          .sort(s => s.startDate, "desc");
    return openSeasons;
  }
  
  latestSeason(dv) {
    const openSeasons = this.activeSeasons(dv);
    if (openSeasons.length === 0) return null;
    return openSeasons.first();
  }
  
  plantingsFromAllOtherSeasonsWithInfo(dv, season) {
    const { GardenPlantings } = customJS;
    
    const seasonTag = this.seasonTag(season);
    const otherSeasonPlantings = dv.pages(`#${GardenPlantings.tag} and !#${seasonTag}`)
                                   .map(x => {
                                     const bed = dv.page(x[GardenPlantings.frontmatterFields.bed]);
                                     const family = GardenPlantings.family(dv, x);
                                     return { planting: x, bed: bed, family: family };
                                   });
    return otherSeasonPlantings;
  }
  
  plantings(dv, season) {
    const { GardenPlantings } = customJS;
    
    const seasonTag = this.seasonTag(season);
    return dv.pages(`#${GardenPlantings.tag} and #${seasonTag}`);
  }
  
  seasonTag(season) {
    const year = season.startDate.year;
    return `s${year}`;
  }
  
  get frontmatterFields() { return GardenGrowingSeasons.#frontmatterFields; }
  get tag() { return "growingSeason"; }
  get tags() {
    const { GardenDefaults } = customJS;
    return GardenDefaults.tags.concat([ this.tag ]);
  }
}
