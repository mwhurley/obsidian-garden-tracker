class GardenSeeds {
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

  seedsInStock(dv) {
    return dv.pages(`#${this.tag}`)
             .where(x => (x.unopenedPackets || x.openedPackets));
  }
  
  get tag() { return "gardenSeeds"; }
  get tags() {
    const { GardenDefaults, GardenPlantDefinitions } = customJS;
    return GardenDefaults.tags.concat([ GardenPlantDefinitions.plantTag, this.tag ]);
  }
}
