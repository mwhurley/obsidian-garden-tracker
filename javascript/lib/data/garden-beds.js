/** Helper for interacting with garden bed notes. */
class GardenBeds {
  static #frontmatterFields = {
    active: "active",
    tags: "tags",
    bedGroup: "g-Bed_Group",
    lengthUnits: "gu-LengthUnits",
    length: "gl-Length",
    width: "gl-Width",
    height: "gl-Height",
    perimeter: "gl-Perimeter",
    area: "gl2-Area",
    volume: "gl3-Volume"
  };
  
  static #groups = [
    // Generally will be displayed in this order.
    { name: "Lower Patio", bedNamePrefix: "LP" },
    { name: "Behind Garage", bedNamePrefix: "BG" },
    { name: "Near Shed", bedNamePrefix: "NS" }
  ];

  /**
   * Creates a proxy around a Dataview bed object.
   * Allows interacting with frontmatter via "normal" names instead of the semantically loaded actual names.
   * See {@link GardenBeds##frontmatterFields} for the "normal" property names.
   * Trying to access a property not in the mapping will return the property looked up against the bed object.
   * @param dvBed - Dataview page object for the garden bed.
   * @returns {Proxy} Proxy wrapping the bed's page object.
   */
  proxy(dvBed) {
    const handler = {
      get(target, prop, receiver) {
        const frontmatterProperty = GardenBeds.#frontmatterFields[prop];
        if (frontmatterProperty) return target[frontmatterProperty];
        return target[prop];
      }
    };
    return new Proxy(dvBed, handler);
  }

  /**
   * Real field name.
   * @typedef {string} RealFieldName
   */
  /**
   * Frontmatter field name.
   * @typedef {string} FrontmatterFieldName
   */
  /**
   * Mapping of "normal" frontmatter field names to acctual names.
   * @type {Object.<RealFieldName, FrontmatterFieldName>}
   */
  get frontmatterFields() { return GardenBeds.#frontmatterFields; }
  
  /**
   * Tag that identifies a garden bed, without #.
   * @type {string}
   */
  get gardenBedTag() { return "gardenBed"; }
  
  /**
   * Complete array of tags meant to be applied to all garden beds, without #.
   * @type {string[]}
   */
  get gardenBedTags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.gardenBedTag ]);
  }
  
  /**
   * A garden bed group.
   * @typedef {Object.<string, string>} GardenBedGroup
   * @property {string} name - Name of the group.
   * @property {string} bedNamePrefix - Prefix that by default is added to garden bed names when they're added in this group.
   */
  /**
   * Groups that garden beds can be assigned to.
   * @type {GardenBedGroup[]}
   */
  get groups() { return GardenBeds.#groups; }
  
  /**
   * Tag that identifies a raised bed, without #.
   * @type {string}
   */
  get raisedBedTag() { return "raisedBed"; }
  
  /**
   * Complete array of tags meant to be applied to all raised beds, without #.
   * @type {string[]}
   */
  get raisedBedTags() { return this.gardenBedTags.concat([ this.raisedBedTag ]); }
}
