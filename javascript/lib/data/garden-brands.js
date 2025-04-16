class GardenBrands {
  get tag() { return "gardenBrand"; }
  get tags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.tag ]);
  }
}
