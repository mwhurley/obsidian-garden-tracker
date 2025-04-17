// Garden frontmatter attribute prefixes:
// - `g-`: A plain value.
// - `gl-`: A length value. Its value will be shown with the units defined in the `gu-LengthUnits` frontmatter attribute.
// - `glX-`: A length^X value (area, volume, etc). Its value will be shown with the units defined in
//   the `gu-LengthUnits` frontmatter attribute followed by a superscript of X.
// - `gu-`: A frontmatter attribute defining measurement units.

const { Units, GardenBeds } = await cJS();

/**
 * Garden attribute.
 * @typedef {Object.<string, string>} GardenAttribute
 * @property {string} key - Name of the attribute in the frontmatter.
 * @property {string} prefix - Found attribute prefix.
 * @property {string} name - The attribute name without the prefix.
 */
/**
 * Looks for frontmatter keys that are garden related attributes.
 * If it starts with `g`, eventually has a `-` and the start isn't `gu-`, it's a match.
 * The part before the dash is the prefix, and the part after the dash is the name.
 * @param {string} key - Name of the attribute in the frontmatter.
 * @returns {?GardenAttribute} The garden attribute if the key represents one, otherwise null.
 */
function toGardenAttribute(key) {
  if (key[0] !== "g" || key.startsWith("gu-")) return null;
  const dashIndex = key.indexOf("-");
  if (dashIndex == -1) return null;

  let name = key.substring(dashIndex + 1);
  name = name.replace("_", " ");
  return { key: key, prefix: key.substring(0, dashIndex), name: name };
}

/**
 * Formats a length value. It will be the numeric value plus the length units.
 * If the prefix is a `glX`, there will be a superscript X after the units.
 * @param {Proxy} fmProxy - Frontmatter wrapped by {@link GardenBeds#proxy}.
 * @param {GardenAttribute} gardenAttribute - Attribute being formatted.
 * @returns {string} Formatted length value with units.
 */
function toLengthValue(fmProxy, gardenAttribute) {
  const units = fmProxy.lengthUnits;
  const exponent = gardenAttribute.prefix.length > 2 ? gardenAttribute.prefix.slice(-1) : null;
  const value = fmProxy[gardenAttribute.key];
  if (value || typeof value === "number") {
    if (units) return Units.formatValue(value, units, exponent);
    else return value;
  }
  return "";
}

/**
 * Garden attribute as a data item.
 * @typedef {Object.<string, string>} DataItem
 * @property {string} name - Name to show for the attribute.
 * @property {string} value - Value of the attribute (with units if a length).
 */
/**
 * Formats a garden frontmatter attribute as a data item that will be displayed.
 * @param {Proxy} fmProxy - Frontmatter wrapped by {@link GardenBeds#proxy}.
 * @param {GardenAttribute} gardenAttribute - Attribute to transform.
 * @returns {DataItem} A data item with the attribute from the frontmatter.
 */
function toDataItem(fmProxy, gardenAttribute) {
  let value = fmProxy[gardenAttribute.key];
  if (gardenAttribute.prefix.startsWith("gl")) value = toLengthValue(fmProxy, gardenAttribute);
  return { name: gardenAttribute.name, value: value };
}

const gardenValues = Object.keys(dv.current().file.frontmatter)
                           .map(key => toGardenAttribute(key))
                           .filter(x => x) // Only keep frontmatter attributes that are garden related.
                           .map(attr => toDataItem(GardenBeds.proxy(dv.current().file.frontmatter), attr));
const data = dv.current().file.frontmatter.active == false ?
               [ { name: "<span class='inactive-indicator'>Inactive</span>", value: "" } ].concat(gardenValues)
               : gardenValues;

const tableInputs = {
  data: data,
  displayOrdering: {
    name: "Attribute",
    value: null
  }
};
dv.view("javascript/dataviewjs/table-from-object-list", tableInputs);
