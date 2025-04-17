/** Helper for interacting with garden brand notes. */
class GardenBrands {
  /**
   * Tag that identifies a garden brand, without #.
   * @type {string}
   */
  get tag() { return "gardenBrand"; }
  
  /**
   * Complete array of tags meant to be applied to all garden brands, without #.
   * @type {string[]}
   */
  get tags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.tag ]);
  }
}
