/** Utilities for checking for garden warnings. */
class WarningUtils {
  /**
   * Finds warnings for a single planting.
   * @param dv - Dataview's dv object.
   * @param planting - Dataview page object for a planting.
   * @param season - Dataview page object for the planting's growing season.
   * @returns {string[]} Array of unique warnings for this planting.
   */
  findPlantingWarnings(dv, planting, season) {
    const result = this.#findPlantingWarnings(dv, planting, season);
    return dv.array(result.warnings.sort()).distinct().array();
  }

  /**
   * Finds warnings for all plantings part of a growing season.
   * @param dv - Dataview's dv object.
   * @param season - Dataview page object for growing season.
   * @returns {string[]} Array of unique warnings for this growing season.
   */
  findSeasonWarnings(dv, season) {
    const { GardenGrowingSeasons } = customJS;
    
    const plantings = GardenGrowingSeasons.plantings(dv, season);
    let state = null;
    let warnings = [];
    for (let i = 0; i < plantings.length; i++) {
      const result = this.#findPlantingWarnings(dv, plantings[i], season, state);
      warnings = warnings.concat(result.warnings);
      state = result.state;
    }
    return dv.array(warnings.sort()).distinct().array();
  }
  
  #findPlantingWarnings(dv, planting, season, state) {
    const { GardenGrowingSeasons, GardenPlantings } = customJS;
    
    const currentStatus = planting._status;
    if (!GardenPlantings.warnablePlantingStatuses.includes(currentStatus)) return { warnings: [], state: state };
    
    let savedState = state;
    if (!savedState) {
      savedState = {
        otherSeasonPlantings: GardenGrowingSeasons.plantingsFromAllOtherSeasonsWithInfo(dv, season),
        otherSeasonPlantingsByBed: {}
      };
    }
    
    const family = GardenPlantings.family(dv, planting);
    const bed = dv.page(planting.bed);
    let familyWarnings = [];
    if (family.rotateYears) familyWarnings = this.#findPlantingFamilyWarnings(dv, planting, bed, season, family, savedState);
    const seedWarnings = this.#findPlantingSeedWarnings(dv, planting, bed);
    const bedWarnings = this.#findPlantingBedWarnings(dv, planting, bed, season);
    const allWarnings = bedWarnings.concat(seedWarnings).concat(familyWarnings);
    return { warnings: allWarnings, state: savedState };
  }
  
  #findPlantingBedWarnings(dv, planting, bed, season) {
    const { GardenBeds, GardenGrowingSeasons, GardenPlantings } = customJS;
    
    const checks = [
      function() {
        if (bed.active) return [];
        return [`[[${bed.file.name}]] is inactive.`];
      },
      function() {
        const seed = dv.page(planting.crop);
        const sameSeedInBed = GardenGrowingSeasons.plantings(dv, season)
                                                  // Don't compare the target planting with itself.
                                                  .where(p => planting.file.name !== p.file.name)
                                                  // Only look at plantings in the same garden bed.
                                                  .where(p => {
                                                    const otherBed = dv.page(p.bed);
                                                    return bed.file.name === otherBed.file.name;
                                                  })
                                                  // Only look at plantings using the same seeds.
                                                  .where(p => {
                                                    const otherSeed = dv.page(p.crop);
                                                    return seed.file.name === otherSeed.file.name;
                                                  });
        const warnings = sameSeedInBed.array().map(p => {
          // Sort the plantings so we only get one message for this pair.
          // When run for a growing season, plantings A and B using the same seed will both be looked at and find each other as a problem.
          const collidingPlantings = [ planting.file.name, p.file.name ].sort();
          const brand = dv.page(seed.brand);
          return `In [[${bed.file.name}]], both [[${collidingPlantings[0]}]] and [[${collidingPlantings[1]}]] are using [[${seed.file.name}]] from [[${brand.file.name}]].`;
        });
        return warnings;
      }
    ];
    
    return checks.flatMap(f => f());
  }
  
  #findPlantingSeedWarnings(dv, planting, bed) {
    const { GardenConfig, GardenPlantings, GardenSeeds } = customJS;
    
    const crop = dv.page(planting.crop);
    if (!crop.file.tags.includes(`#${GardenSeeds.tag}`)) return [];
    const brand = dv.page(crop.brand);
    const checks = [
      function() {
        if (crop.openedPackets || crop.unopenedPackets) return [];
        return [`You have no packets of [[${crop.file.name}]] from [[${brand.file.name}]].`];
      },
      function() {
        const thisYear = new Date().getFullYear();
        if (thisYear - crop.year < GardenConfig.oldSeedsAgeYears) return [];
        return [`Your packet(s) of [[${crop.file.name}]] from [[${brand.file.name}]] are ${GardenConfig.oldSeedsAgeYears} or more years past their use year.`];
      }
    ];
    return checks.flatMap(f => f());
  }
  
  #findPlantingFamilyWarnings(dv, planting, bed, season, family, state) {
    const { GardenGrowingSeasons, GardenPlantings } = customJS;
    
    if (!state.otherSeasonPlantingsByBed[bed.file.name]) {
      // Only look up each bed's plantings once.
      const bedPlantings = state.otherSeasonPlantings
                                .where(x => x.bed.file.name === bed.file.name);
      state.otherSeasonPlantingsByBed[bed.file.name] = bedPlantings;
    }
    const warnings = state.otherSeasonPlantingsByBed[bed.file.name]
                          // Don't compare the planting to itself.
                          .where(x => x.planting.file.name !== planting.file.name)
                          // Only look at plantings of the same plant family.
                          .where(x => x.family.name === family.name)
                          .flatMap(x => {
                            const thisYear = season.startDate.year;
                            const otherSeason = dv.page(x.planting.growingSeason);
                            const otherYear = otherSeason.startDate.year;
                            // Warn only if the other planting is older and within the rotation window.
                            if (otherYear < thisYear && otherYear >= (thisYear - family.rotateYears + 1)) {
                              return [`[[${bed.file.name}]] had ${family.displayName} planted in [[${otherSeason.file.name}]].`];
                            }
                            return [];
                          });
    return warnings.array();
  }
}
