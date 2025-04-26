/** Helper for interacting with garden planting notes. */
class GardenPlantings {
  static #plantingStatuses = {
    "Planning": { displayName: "📋Planning", showWarnings: true, showSeedWarnings: (p => true) },
    "GrowingSeedlings": { displayName: "🪴Growing Seedlings", showWarnings: true },
    "Planting": { displayName: "⛏️Planting In Garden", showWarnings: true, showSeedWarnings: (p => !p._lastGrowingSeedlingsDate) },
    "Growing": { displayName: "⌛Planted And Growing", isPlanted: true },
    "Harvested": { displayName: "🌽Harvested", isPlanted: true },
    "LostBeforeHarvest": { displayName: "😭Lost Before Harvest", isPlanted: true }
  };
  
  static #warnablePlantingStatuses = Object.entries(GardenPlantings.#plantingStatuses)
                                           .filter(x => x[1].showWarnings)
                                           .map(x => x[0]);
  static #plantedStatuses = Object.entries(GardenPlantings.#plantingStatuses)
                                  .filter(x => x[1].isPlanted)
                                  .map(x => x[0]);
  
  /**
   * Identifier for a planting status.
   * @typedef {string} PlantingStatusId
   */
  /**
   * Determines if a planting should get a type of warning when in this planting status.
   * @callback ShowSeedWarningsFunc
   * @param p The Dataview page object of the planting to check.
   * @returns {boolean} True if the planting in this planting status should return that type of warning, or false.
   */
  /**
   * Details about a planting status.
   * @typedef {Object.<string, *>} PlantingStatusDetails
   * @property {string} displayName - Name to use when displaying the status.
   * @property {?boolean} showWarnings - Indicates if planting warnings should be shown for plantings in this status.
   * @property {?ShowSeedWarningsFunc} showSeedWarnings - Function that determines if seed warnings should be shown for a planting.
   */
  /**
   * Planting status map.
   * @typedef {Object.<PlantingStatusId, PlantingStatusDetails>} PlantingStatusMap
   */
  
  /**
   * Plant family where the name key is part of the object.
   * @typedef {PlantFamilyDetails} PlantFamilyDetailsWithName
   * @property {PlantFamilyId} name
   */
  /**
   * Gets a planting's plant family.
   * @param dv - Dataview's dv object.
   * @param planting - Dataview page object of a planting.
   * @returns PlantFamilyDetailsWithName
   */
  family(dv, planting) {
    const { GardenPlantDefinitions } = customJS;
    
    const crop = dv.page(planting.crop);
    const category = GardenPlantDefinitions.categories[crop._category];
    const family = GardenPlantDefinitions.families[category.family];
    return { name: category.family, ...family };
  }
  
  /**
   * All planting statuses, in the order you'd use them when gardening.
   * @type {PlantingStatusMap}
   */
  get plantingStatuses() { return GardenPlantings.#plantingStatuses; }
  
  /**
   * Planting statuses that should show warnings for plantings set to them.
   * @type {PlantingStatusId[]}
   */
  get warnablePlantingStatuses() { return GardenPlantings.#warnablePlantingStatuses; }
  
  /**
   * Planting statuses that indicate a planting's plants are in the garden and growing.
   * @type {PlantingStatusId[]}
   */
  get plantedStatuses() { return GardenPlantings.#plantedStatuses; }
  
  /**
   * Tag that idenitifies a garden planting, without #.
   * @type {string}
   */
  get tag() { return "planting"; }
  
  /**
   * Complete array of tags meant to be used with plantings.
   * @type {string[]}
   */
  get tags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.tag ]);
  }
}
