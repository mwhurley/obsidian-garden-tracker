Helps use notes to track your garden. Licensed CC BY-NC-SA 4.0 (see [[LICENSE]]).

This README and that fact that I put JSDocs all over the Javascript code are the only real "product" aspects to this. Otherwise this is just a chunk of my vault uploaded to GitHub to share with others.

This README is written for Obsidian and may look off on GitHub.

## Prerequisites
- General familiarity with Obsidian.
  - Register the file `.obsidian/snippets/mike.css` as a CSS snippet, rename if you wish.
- Some familiarity with programming in Javascript.
- Some familiarity with using git for source control.
- Dataview plugin installed, plus some familiarity with it.
  - Used in a vault with the default configs. You may have to edit files in `templates` and `javascript` if you've customized the configs.
- Templater plugin installed, plus some familiarity with it.
  - Configured so its templates folder is the `templates` folder from this repo.
- CustomJS plugin installed, plus some familiarity with it.
  - Configured so its scripts folder is the `javascript/lib` folder from this repo.
- Frontmatter Markdown Links plugin installed.
  - This can be skipped if Obsidian now supports clickable markdown links in the frontmatter, or if you don't care about having external links clickable.
  - Some of the templates put external markdown links in the frontmatter. When I wrote this Obsidian only supported making wiki links in frontmatter clickable.

## Code Structure
- `.obsidian/snippets/`
  - Snippets useful for this garden tracker.
- `templates/`
  - Templater templates that can help create gardening related notes.
- `javascript/dataviewjs/`
  - View generation helpers for use with Dataview.
- `javascript/lib/`
  - Various Javascript utilities.
- `javascript/lib/data/`
  - Various Javascript utilities for each kind of garden concept supported by this tracker.

## Setup
1. Clone this repo. It's laid out so it can easily be cloned into your vault, or you can clone it elsewhere and copy its contents into your vault.
   - If you sync your vault to other devices, the in-vault clone or your copy from the clone should automatically sync like all your other notes. Not sure about Obsidian Sync since it may only sync supported file types.
1. Look over `javascript/lib/data/garden-config.js` and adjust any of the simple values (ie. properties returning literals/constants) as you like.
   - Pay attention to the tracker resources value if the root of your tracker is named differently, or not at the root of your vault.
1. Look over `javascript/lib/data/garden-beds.js` and adjust the values in `GardenBeds.#groups`. Pick groupings for your raised beds that make sense, probably based on location.
2. Look over `javascript/lib/data/garden-plant-definitions.js` and adjust plant categories and families, if you want. The safest changes are deleting categories, changing category display names, changing family display names, and changing family `rotateYears`.
3. Add [[#Inventory]] notes. Recommend placing them under `vault/🌱Tracker` in subfolders named `Brands`, `Raised Beds`, and `Seeds`.
4. If you want the first growing season using the tracker to be able to give you all warnings, you can add historical growing seasons. You can also add "seeds" for the historical plantings that are just placeholders for plant families. For instance, adding a seed named `Historical Cucurbits` with a squash plant category. Instead of making year folders described in my structure ideas in the next step, you could put all historical stuff in a flat historical folder if you're just going to do placeholders like that.
5. When you want to start planning or tracking a garden, add [[#Growing]] notes. Recommend placing them under `vault/🌱Tracker`. I don't have a recommended structure for this since I haven't used this tracker for real (as of 2025-04-18).
   - Idea A: Add a year subfolder (sibling to `Brands`). In it put the growing season and planting notes.
   - Idea B: The same as A, but the growing season notes are put in the `vault/🌱Tracker` folder.
   - Idea C: After I wrote ideas A & B I came up with something that seems to work based off real use. I use A's year folder and under it a `Plantings` folder for the plantings. The growing season still goes in the year folder. I found the plantings cluttered around the growing season with A. This is essentially B just pushed down a folder level.
	   - This also encourages you to interact with plantings via the growing seasons groupings by bed, especially if you keep the `Plantings` folder collapsed most of the time.

## Example Use
1. Follow the steps in [[#Setup]]. This example shows how to add the different note types. It assumes you're following the structure described in [[#Setup]] for [[#Inventory]] notes and Idea A for [[#Growing]] notes.
2. Use the [[Garden Inventory - Brand]] template to add a new brand, call it `Example Brand`.
3. Create a folder under `vault/🌱Tracker` named `Raised Beds`.
4. Use the [[Garden Inventory - Raised Bed]] template to make a raised bed note in `Raised Beds` named `Bed A`, and select whichever garden bed group.
5. Create a folder under `vault/🌱Tracker` named `Seeds`.
6. Use the [[Garden Inventory - Seeds]] template to add a packet of seeds in `Seeds` named `Pink Peas`. Pick one of the pea categories and the `Example Brand`.
7. Create a folder under `vault/🌱Tracker` named as some year.
8. Use the [[Garden - Growing Season]] template to add a note to that year folder.
9. Use the [[Garden - Planting]] template to add a planting note to the year folder. Name it `YEAR Pink Peas`. Select the `Pink Peas` seeds, `Bed A`, and the growing season you made. Select the planning status.
10. Cue the montage of you figuring out your garden plans and adding the rest of your plantings.
    - The growing season and planting notes will show warnings if something isn't right.
11. Since peas are direct sown, we can skip the growing seedlings status. Use Templater to apply the [[Garden Action - Set Planting Status]] template to the planting's note and select the ⛏️Planting In Garden status. You could add a line to the planting's note mentioning the date you started planting.
12. Go play in the dirt and plant the peas!
13. If you noted the planting start date, you could also mention the date you finished planting.
14. Use Templater to apply the [[Garden Action - Set Planting Status]] template to the planting's note and select the ⌛Planted And Growing status.
15. Water the peas and keep the weeds down. Eat and share as they ripen! You can add notes to the planting note while things are growing and being eaten. Maybe keep track of how many pounds you've harvested.
16. When the peas are done, use Templater to apply the [[Garden Action - Set Planting Status]] template to the planting's note and select the 🌽Harvested status. If you really loved or hated the peas, you can add notes to the `Pink Peas` seed note. You could also add `lovedIt` or `hatedIt` tags to the seed note frontmatter if you have strong opinions on that variety.
17. Edit the growing season's note and set the endDate, since gardening for the year is complete.

## Garden Concepts
### Inventory
- Raised Bed
  - Represents a raised garden bed.
  - Can be added with the template [[Garden Inventory - Raised Bed]].
  - Can be selected when the [[Garden - Planting]] template is used to add plantings.
- Brand
  - Represents a garden related brand, typically ones seeds and seedlings are bought from.
  - Can be added with the template [[Garden Inventory - Brand]].
  - Comes populated with several brands in `vault/🌱Tracker/Brands`.
  - Can be selected when the [[Garden Inventory - Seeds]] template is used to add seeds.
- Seeds
  - Represents garden seeds that will be planted in a raised bed.
  - Can be added with the template [[Garden Inventory - Seeds]].
  - Can be selected when the [[Garden - Planting]] template is used to add plantings.

### Growing
- Growing Season
  - Represents a growing season that will contain plantings in raised beds.
  - Can be added with the template [[Garden - Growing Season]].
  - Can be selected when the [[Garden - Planting]] template is used to add plantings.
  - The warnings described for plantings are also shown on the season note for all of its plantings.
  - You can see the season's current plantings. If there are no plantings or they are all unplanted some planning helpers will show up. At this point that means each bed will show which of the rotated plant families are allowed.
- Planting
  - Represents a planting of particular seeds in a particular bed in a growing season.
  - Can be added with the template [[Garden - Planting]].
  - Warnings are evaluated for plantings in a status configured to show warnings (see `javascript/lib/data/garden-plantings.js`, `GardenPlantings.#plantingStatuses`).
    - The planting's bed is inactive.
    - The planting's bed has another planting in this growing season growing the exact same seed.
    - The seed inventory doesn't have any packets of a planting's seeds.
    - The seeds being used for the planting are older than its use year by the configured amount (default 5 years).
    - This planting's seeds belong to a plant family planted in this bed within the crop rotation interval (default of 4 years for Legumes, Brassicas, Morning Glories, Cucurbits, and Nightshades).
  - Intended uses of planting statuses:
    - Adjust a planting's status with the [[Garden Action - Set Planting Status]] template since multiple frontmatter fields will get updated.
    - 📋Planning: You're planning out your garden.
    - 🪴Growing Seedlings: You're growing seedlings from this planting's seeds.
    - ⛏️Planting In Garden: You're currently planting the seeds or seedlings.
    - ⌛Planted And Growing: The plants are doing their thing.
    - 🌽Harvested: You've harvested this planting.
    - 😭Lost Before Harvest: Something bad happened so this planting couldn't be harvested.

## Miscellaneous
- Remember that each of these garden items is represented by a note, so you can take notes for each item!
- Callouts are commonly used because they can be expanded and collapsed when generated by Dataview. Headings generated by Dataview cannot be collapsed.

## Garden Hub
Here are some bits from my Garden Hub note that you may find useful. They're not included as notes or templates because I don't want it cluttering up my vault.
### Gardening Status
Shows the current growing season or a sad message about the lack of gardening.

````
```dataviewjs
const { GardenGrowingSeasons } = await cJS();

const latestSeason = GardenGrowingSeasons.latestSeason(dv);
if (latestSeason) {
  dv.paragraph(`Currently in the [[${latestSeason.file.name}]]!`);
} else {
  dv.paragraph("No gardening is happening. 😢");
}
```
````

### Garden Bed Summary
````
```dataviewjs
const { Units, GardenBeds, GardenConfig } = await cJS();

const isActive = x => x.active;
function isInBedGroup(groupName) {
  const groupNameMatches = x => {
    const proxy = GardenBeds.proxy(x);
    return proxy.bedGroup === groupName;
  };
  return x => isActive(x) && groupNameMatches(x);
}

function getBedStats(bedFilterFunc) {
	const activeBeds = dv.pages(`#${GardenBeds.gardenBedTag}`).where(bedFilterFunc);
	const bedCount = activeBeds.length;
	const activeRaisedBeds = dv.pages(`#${GardenBeds.raisedBedTag}`).where(bedFilterFunc);
	const raisedBedCount = activeRaisedBeds.length;
	
	const areaGroups = activeBeds.groupBy(x => {
	  const proxy = GardenBeds.proxy(x);
	  return proxy.lengthUnits;
	});
	const areas = areaGroups.map(x => {
	  const sum = x.rows.map(r => {
	    const proxy = GardenBeds.proxy(r);
	    return proxy.area;
	  }).sum();
	  return { units: x.key, sum: sum };
	});
	
	const volumeGroups = activeRaisedBeds.groupBy(x => {
	  const proxy = GardenBeds.proxy(x);
	  return proxy.lengthUnits;
	});
	const volumes = volumeGroups.map(x => {
	  const sum = x.rows.map(r => {
	    const proxy = GardenBeds.proxy(r);
	    return proxy.volume;
	  }).sum();
	  return { units: x.key, sum: sum };
	});

	const data = [
	  { key: "Bed Count", value: bedCount }
	].concat(
	  bedCount > 0 ? [{ key: "Raised Bed Count", value: raisedBedCount }] : []
	).concat(
	  areas.map(x => {
	    const displayArea = Units.formatValue(x.sum, x.units, "2");
	    return { key: "Area", value: displayArea };
	}).array()).concat(
	  volumes.map(x => {
	    const displayVolume = Units.formatValue(x.sum, x.units, "3");
	    return { key: "Volume", value: displayVolume };
	}).array());
	return data;
}

const groupings = [{ name: "All Beds", bedFilterFunc: isActive }]
                  .concat(GardenBeds.groups.map(x => ({ name: x.name, bedFilterFunc: isInBedGroup(x.name)})));
const data = groupings.map(x => {
  return [{ key: `${GardenConfig.itemPrefixes.tableCategoryIndicator}${x.name}`, value: "" }]
         .concat(getBedStats(x.bedFilterFunc));
}).flat();

const tableInputs = {
  data: data,
  displayOrdering: {
    key: "Attribute",
    value: null
  }
};
await dv.view("javascript/dataviewjs/table-from-object-list", tableInputs);
```
````

### Active Beds
Creates a callout for each garden bed group and shows a list of links to each active bed in that group. It uses callouts because they are collapsible and as of now (2025-04-18) headings generated by Dataview aren't collapsible.

````
```dataviewjs
const { ArrayUtils, GardenBeds } = await cJS();

const activeBeds = await dv.pages(`#${GardenBeds.gardenBedTag}`).where(x => x.active);
const groupCallouts = GardenBeds.groups.map(group => {
  const groupBeds = activeBeds.where(x => {
    const proxy = GardenBeds.proxy(x);
    return proxy.bedGroup === group.name;
  });
  ArrayUtils.insertDataviewCalloutFromArray(dv, "info", group.name, groupBeds.file.link);
}).sort(x => x.file.name);
```
````