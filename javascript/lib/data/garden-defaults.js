class GardenDefaults {
  static #tags = [ "garden" ];
  
  static #itemPrefixes = {
    raisedBed: "🟫",
    brand: "🌻🍓🫐🌺🌼🥬🌿",
    growingSeason: "📅",
    tableCategoryIndicator: "🍅",
    warning: "⚠️"
  };
  
  get lengthUnits() { return "ft"; }
  get itemPrefixes() { return GardenDefaults.#itemPrefixes; }
  get oldSeedsAgeYears() { return 5; }
  get tags() { return GardenDefaults.#tags; }
  get trackerResourcesPath() { return "2 Areas/Garden/🌱Tracker/_resources"; }
}
