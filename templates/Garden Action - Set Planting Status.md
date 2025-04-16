<%-*
const { DateUtils, GardenPlantings } = await cJS();

console.log("tp.file.tags");
console.log(tp.file.tags);
if (!tp.file.tags.includes(`#${GardenPlantings.tag}`)) throw new Error("This template should only be used on garden plantings.");

const existingStatus = tp.frontmatter[GardenPlantings.frontmatterFields.status];

const statuses = Object.entries(GardenPlantings.plantingStatuses);
const status = await tp.system.suggester((x => x[1].displayName), statuses, null, `Select the planting status for ${tp.file.title}.`);
if (!status) return;
if (status[0] === existingStatus) return;

tp.hooks.on_all_templates_executed(async () => {
  const file = tp.file.find_tfile(tp.file.path(true));
  await tp.app.fileManager.processFrontMatter(file, (frontmatter) => {
    frontmatter[GardenPlantings.frontmatterFields.status] = status[0];
    frontmatter[GardenPlantings.frontmatterFields.displayStatus] = status[1].displayName;
    frontmatter[GardenPlantings.frontmatterFields.statusDate] = DateUtils.toISODateString(new Date());
  });
});
%>