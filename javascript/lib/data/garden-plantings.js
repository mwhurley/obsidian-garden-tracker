class GardenPlantings {
  static #frontmatterFields = {
    tags: "tags",
    growingSeason: "growingSeason",
    bed: "bed",
    crop: "crop",
    status: "_status",
    displayStatus: "status",
    statusDate: "statusDate"
  };
  
  static #plantingStatuses = {
    "Planning": { displayName: "📋Planning", showWarnings: true },
    "GrowingSeedlings": { displayName: "🪴Growing Seedlings", showWarnings: true },
    "Planting": { displayName: "⛏️Planting In Garden", showWarnings: true },
    "Growing": { displayName: "⌛Planted And Growing" },
    "Harvested": { displayName: "🌽Harvested" },
    "LostBeforeHarvest": { displayName: "😭Lost Before Harvest" }
  };
  
  static #warnablePlantingStatuses = Object.entries(GardenPlantings.#plantingStatuses)
                                           .filter(x => x[1].showWarnings)
                                           .map(x => x[0]);
  
  family(dv, planting) {
    const { GardenPlantDefinitions } = customJS;
    
    const crop = dv.page(planting[this.frontmatterFields.crop]);
    const category = GardenPlantDefinitions.categories[crop._category];
    const family = GardenPlantDefinitions.families[category.family];
    return { name: category.family, ...family };
  }
  
  get frontmatterFields() { return GardenPlantings.#frontmatterFields; }
  get plantingStatuses() { return GardenPlantings.#plantingStatuses; }
  get warnablePlantingStatuses() { return GardenPlantings.#warnablePlantingStatuses; }
  get tag() { return "planting"; }
  get tags() {
    const { GardenDefaults } = customJS;
    return GardenDefaults.tags.concat([ this.tag ]);
  }
}
