<%-*
const { DateUtils, GardenPlantings } = await cJS();

if (!tp.file.tags.includes(`#${GardenPlantings.tag}`)) throw new Error("This template should only be used on garden plantings.");

const existingStatus = tp.frontmatter._status;

const statuses = Object.entries(GardenPlantings.plantingStatuses);
const status = await tp.system.suggester((x => x[1].displayName), statuses, null, `Select the planting status for ${tp.file.title}.`);
if (!status) return;
if (status[0] === existingStatus) return;

tp.hooks.on_all_templates_executed(async () => {
  const file = tp.file.find_tfile(tp.file.path(true));
  await tp.app.fileManager.processFrontMatter(file, (frontmatter) => {
    frontmatter._status = status[0];
    frontmatter.status = status[1].displayName;
    frontmatter.statusDate = DateUtils.toISODateString(new Date());
    if (status[0] === "GrowingSeedlings") frontmatter._lastGrowingSeedlingsDate = frontmatter.statusDate;
  });
});
%>