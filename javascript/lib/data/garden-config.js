/** General configuration for garden tracker code. */
class GardenConfig {
  static #tags = [ "garden" ];
  
  static #itemPrefixes = {
    raisedBed: "🟫", // Brown square.
    brand: "🛒",
    growingSeason: "📅",
    tableCategoryIndicator: "🍅",
    warning: "⚠️"
  };
  
  /**
   * Default length units used for garden beds.
   * @type {string}
   */
  get lengthUnits() { return "ft"; }
  
  /**
   * Text to use as item prefixes, intended to be emoji.
   * @type {Object.<string, string>}
   */
  get itemPrefixes() { return GardenConfig.#itemPrefixes; }
  
  /**
   * Number of years that indicates a packet of seeds is concerningly old.
   * @type {number}
   */
  get oldSeedsAgeYears() { return 5; }
  
  /**
   * Tags meant to be applied to all garden notes, without #.
   * @type {string[]}
   */
  get tags() { return GardenConfig.#tags; }
  
  /**
   * In-vault path to keep downloaded resources like brand logos.
   * @type {string}
   */
  get trackerResourcesPath() { return "🌱Tracker/_resources"; }
}
