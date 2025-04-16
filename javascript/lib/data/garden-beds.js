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

  get frontmatterFields() { return GardenBeds.#frontmatterFields; }
  get gardenBedTag() { return "gardenBed"; }
  get gardenBedTags() {
    const { GardenConfig } = customJS;
    return GardenConfig.tags.concat([ this.gardenBedTag ]);
  }
  get groups() { return GardenBeds.#groups; }
  get raisedBedTag() { return "raisedBed"; }
  get raisedBedTags() { return this.gardenBedTags.concat([ this.raisedBedTag ]); }
}
