---
<%-*
const { AbortedTemplaterTemplate, EmojiUtils, GardenBrands, GardenSeeds, GardenPlantDefinitions, PromptUtils } = await cJS();

function possessivize(name) {
  return name.endsWith("'s") ? name : name + "'s";
}

const name = await tp.system.prompt("Seed name:");
let namePrefix = "";
if (AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, name)) return;

const dv = app.plugins.plugins.dataview.api;
const brands = dv.pages(`#${GardenBrands.tag}`).sort(x => x.file.name).array();
const brand = await tp.system.suggester(x => x.file.name, brands, null, `Select the brand of ${name}.`);
const brandPossessive = brand ? possessivize(brand.file.name) : null;

let itemUrl = "";
if (brand && brand.itemWebsiteSearch) {
  const urlEncodedName = encodeURIComponent(name);
  const itemUrlTemplate = brand.itemWebsiteSearch;
  itemUrl = itemUrlTemplate.replace("${name}", urlEncodedName);
}

const categories = Object.entries(GardenPlantDefinitions.categories);
const category = await tp.system.suggester((x => x[1].displayName), categories, null, `Select the plant category of ${name}.`);
if (category) {
  const firstChar = EmojiUtils.getCharIfEmoji(category[1].displayName);
  if (firstChar) namePrefix = firstChar;
}
const finalName = namePrefix + name;
const namePossessive = possessivize(finalName);
await tp.file.rename(finalName);

const rawYear = await tp.system.prompt(`${namePossessive} 'plant by' year; prefix with 'h' if it's a harvest year (will assume its 'plant by' is the next year).`);
const strYear = rawYear && rawYear.startsWith("h") && rawYear.length == 5 ? rawYear.substring(1) : rawYear;
const parsedYear = PromptUtils.toNumberOrZero(strYear);
const year = parsedYear && rawYear.startsWith("h") ? parsedYear + 1 : parsedYear;
%>
_category: "<% category?.[0] || null %>"
category: "<% category?.[1]?.displayName || "" %>"
tags: [ <% GardenSeeds.tags.join(", ") %> ]
unopenedPackets: 1
openedPackets: 0
<%-* if (year) { %>
year: <% year %>
<%-* } %>
<%-* if (brand) { %>
brand: "[[<% brand.file.name %>]]"
<%-* } %>
<%-* if (itemUrl) { %>
info: "[See on <% brandPossessive %> website](<% itemUrl %>)"
<%-* } %>
---
