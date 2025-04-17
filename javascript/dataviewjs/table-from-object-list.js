/*
Expected input passed into dv.view: {
  data: [{
      fieldA: "value1A",
      fieldB: "value1B",
      ...
    }, {
      fieldA: "value2A",
      fieldB: 100,
      ...
    }, ...
  ],
  // `displayOrdering` is optional. Maps `data` fields to display names. Field name order will match property order in `displayOrdering`.
  // If it's falsy or empty, then the capitalized field names and field ordering from the first `data` item will be used.
  // If it's populated, then any missing fields will not be displayed. If the display name is falsy, the capitalized field name is used.
  displayOrdering: {
    "fieldA": "Display name for fieldA",
    "fieldB": "Display name for fieldB",
    ...
  }
}
*/

const data = input.data;
let displayOrdering = input.displayOrdering;

/**
 * Capitalizes a string.
 * @param {string} str
 * @returns {string} str, but capitalized.
 */
function capitalize(str) {
  if (str.length <= 1) return str.toUpperCase();
  const firstUpperChar = str[0].toUpperCase();
  return firstUpperChar + str.substring(1);
}

if (displayOrdering && Object.keys(displayOrdering).length > 0) {
  // Set any falsy display names to the capitalized field name.
  for (const key of Object.keys(displayOrdering)) {
    if (!displayOrdering[key]) displayOrdering[key] = capitalize(key);
  }
} else {
  // Use the capitalized field names as display names in the order found on the first data item.
  displayOrdering = {};
  for (const key of Object.keys(data[0])) {
    displayOrdering[key] = capitalize(key);
  }
}

const headers = Object.values(displayOrdering);

const rows = data.map(x => {
  const rowData = Object.keys(displayOrdering).map(key => x[key]);
  return rowData;
});

dv.table(headers, rows);
