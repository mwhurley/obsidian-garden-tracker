/** Helper for interacting with garden planting notes. */
class GardenPlantings {
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
  
  /**
   * Identifier for a planting status.
   * @typedef {string} PlantingStatusId
   */
  /**
   * Details about a planting status.
   * @typedef {Object.<string, *>} PlantingStatusDetails
   * @property {string} displayName - Name to use when displaying the status.
   * @property {boolean} showWarnings - Indicates if planting warnings should be shown for plantings in this status.
   */
   /**
    * Planting status map.
    * @typedef {Object.<PlantingStatusId, PlantingStatusDetails>} PlantingStatusMap
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
   * @type {PlantingStatusMap}
   */
  get warnablePlantingStatuses() { return GardenPlantings.#warnablePlantingStatuses; }
  
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
