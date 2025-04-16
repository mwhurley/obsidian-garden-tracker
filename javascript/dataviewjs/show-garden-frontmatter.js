// Garden frontmatter attribute prefixes:
// - `g-`: A plain value.
// - `gl-`: A length value. Its value will be shown with the units defined in the `gu-LengthUnits` frontmatter attribute.
// - `glX-`: A length^X value (area, volume, etc). Its value will be shown with the units defined in
//   the `gu-LengthUnits` frontmatter attribute followed by a superscript of X.
// - `gu-`: A frontmatter attribute defining measurement units.

const { Units, GardenBeds } = await cJS();

// Looks for frontmatter keys that are garden related attributes.
// If it starts with `g`, eventually has a `-` and the start isn't `gu-`, it's a match.
// The part before the dash is the prefix, and the part after the dash is the name.
function toGardenAttribute(key) {
  if (key[0] !== "g" || key.startsWith("gu-")) return null;
  const dashIndex = key.indexOf("-");
  if (dashIndex == -1) return null;

  let name = key.substring(dashIndex + 1);
  name = name.replace("_", " ");
  return { key: key, prefix: key.substring(0, dashIndex), name: name };
}

// // Gets a field out of the frontmatter and makes sure it isn't falsy.
// // Throws an error if it is falsy.
// function getRequiredFrontmatter(frontmatter, attributeName) {
  // const foundValue = frontmatter[attributeName];
  // return foundValue ? foundValue : (() => { throw new Error(`Missing required frontmatter value ${attributeName}.`); })();
// }

// Formats a length value. It will be the numeric value plus the length units.
// If the prefix is a `glX`, there will be a superscript X after the units.
function toLengthValue(frontmatter, gardenAttribute) {
  const units = frontmatter[GardenBeds.frontmatterFields.lengthUnits];
  const exponent = gardenAttribute.prefix.length > 2 ? gardenAttribute.prefix.slice(-1) : null;
  const value = frontmatter[gardenAttribute.key];
  if (value || typeof value === "number") {
    if (units) return Units.formatValue(value, units, exponent);
    else return value;
  }
  return "";s
}

// Formats a garden frontmatter attribute as a data item that will be displayed.
function toDataItem(frontmatter, gardenAttribute) {
  let value = frontmatter[gardenAttribute.key];
  if (gardenAttribute.prefix.startsWith("gl")) value = toLengthValue(frontmatter, gardenAttribute);
  return { name: gardenAttribute.name, value: value };
}

const gardenValues = Object.keys(dv.current().file.frontmatter)
                           .map(key => toGardenAttribute(key))
                           .filter(x => x) // Only keep frontmatter attributes that are garden related.
                           .map(attr => toDataItem(dv.current().file.frontmatter, attr));
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
