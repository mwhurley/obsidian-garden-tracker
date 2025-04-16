class GardenBrands {
  static #frontmatterFields = {
    itemWebsiteSearch: "itemWebsiteSearch"
  }
  
  get frontmatterFields() { return GardenBrands.#frontmatterFields; }
  get tag() { return "gardenBrand"; }
  get tags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.tag ]);
  }
}
