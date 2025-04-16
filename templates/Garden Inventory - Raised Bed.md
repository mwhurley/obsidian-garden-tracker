---
<%-*
const { AbortedTemplaterTemplate, GardenConfig, GardenBeds, TemplaterUtils } = await cJS();

const name = await tp.system.prompt("Bed name:");
if(AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, name)) return;

const bedGroup = await tp.system.suggester(x => x.name, GardenBeds.groups, null, `Pick the bed group for ${name}.`);
const bedGroupName = bedGroup ? bedGroup.name : "";
const bedName = (bedGroup ? bedGroup.bedNamePrefix : tp.config.template_file.basename.replace("Garden Inventory - ", "")) + ` ${name}`
const finalName = GardenConfig.itemPrefixes.raisedBed + bedName;
await tp.file.rename(finalName);

const units = await tp.system.prompt(`Length units for ${finalName}:`, GardenConfig.lengthUnits);
const width = await TemplaterUtils.promptNumber(tp, `Width of ${finalName} (${units}):`);
const length = await TemplaterUtils.promptNumber(tp, `Length of ${finalName} (${units}):`);
const height = await TemplaterUtils.promptNumber(tp, `Height of ${finalName} (${units}):`);
%>
<% GardenBeds.frontmatterFields.active %>: true
<% GardenBeds.frontmatterFields.tags %>: [ <% GardenBeds.raisedBedTags.join(", ") %> ]
<% GardenBeds.frontmatterFields.lengthUnits %>: "<% units %>"
<% GardenBeds.frontmatterFields.bedGroup %>: "<% bedGroupName %>"
<% GardenBeds.frontmatterFields.width %>: <% width %>
<% GardenBeds.frontmatterFields.length %>: <% length %>
<% GardenBeds.frontmatterFields.height %>: <% height %>
<% GardenBeds.frontmatterFields.perimeter %>: <% (2 * width) + (2 * length) %>
<% GardenBeds.frontmatterFields.area %>: <% width * length %>
<% GardenBeds.frontmatterFields.volume %>: <% width * length * height %>
cssclasses:
  - hide-properties
---

```dataviewjs
await dv.view("javascript/dataviewjs/show-garden-frontmatter")
```
