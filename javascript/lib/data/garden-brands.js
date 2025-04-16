class GardenBrands {
  static #frontmatterFields = {
    itemWebsiteSearch: "itemWebsiteSearch"
  }
  
  get frontmatterFields() { return GardenBrands.#frontmatterFields; }
  get tag() { return "gardenBrand"; }
  get tags() {
    const { GardenDefaults } = customJS;
    return GardenDefaults.tags.concat([ this.tag ]);
  }
}
