/** Helper for interacting with garden seed notes. */
class GardenSeeds {
  /**
   * Formats a seed name for display.
   * @param dv Dataview's dv object.
   * @param seed Dataview page object for the seed.
   * @returns {string} The display name.
   */
  seedDisplayName(dv, seed) {
    const { GardenPlantDefinitions } = customJS;
    const seedName = seed.file.name;
    const brand = dv.page(seed.brand);
    const brandName = brand.file.name;
    const category = GardenPlantDefinitions.categories[seed._category];
    const family = GardenPlantDefinitions.families[category?.family];

    const brandStr = brandName ? `${brandName}` : "";
    const categoryStr = category ? `, ${category.displayName}` : "";
    const familyStr = family ? `, ${family.displayName}` : "";
    const suffix = `${brandStr}${categoryStr}${familyStr}`;
    return `${seedName}${suffix ? " - " : ""}${suffix}`;
  }

  /**
   * Returns page objects of seeds that are in stock.
   * @param dv Dataview's dv object.
   * @returns {DataArray} Array of seeds.
   */
  seedsInStock(dv) {
    return dv.pages(`#${this.tag}`)
             .where(x => (x.unopenedPackets || x.openedPackets));
  }
  
  /**
   * Tag that identifies garden seeds, without #.
   * @type {string}
   */
  get tag() { return "gardenSeeds"; }
  
  /**
   * Complete array of tags to be applied to garden seeds, without #.
   * @type {string[]}
   */
  get tags() {
    const { GardenConfig, GardenPlantDefinitions } = customJS;
    return GardenConfig.tags.concat([ GardenPlantDefinitions.plantTag, this.tag ]);
  }
}
