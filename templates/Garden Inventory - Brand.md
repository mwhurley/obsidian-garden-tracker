---
<%-*
const { AbortedTemplaterTemplate, GardenBrands, GardenConfig } = await cJS();
const fs = require("fs");

const name = await tp.system.prompt("Brand's name:", null, true);
if (AbortedTemplaterTemplate.cleanupIfPromptAborted(tp, name)) return;
const prefixIndex = Date.now() % (GardenConfig.itemPrefixes.brand.length / 2);
const prefix = String.fromCodePoint(GardenConfig.itemPrefixes.brand.codePointAt(prefixIndex * 2));
const finalName = prefix + name;
await tp.file.rename(finalName);

async function createLogoResourcePath(logoPath) {
  const extension = logoPath.split(".").pop();
  const trackerResources = GardenConfig.trackerResourcesPath;
  logoResourcePath = `${trackerResources}/${name}-logo.${extension}`;
  await app.vault.adapter.mkdir(trackerResources);
  return logoResourcePath;
}

const logo = await tp.system.prompt(`${finalName} logo path or URL (will be copied or downloaded):`);
let logoPath = "";
if (logo) {  
  if (logo.startsWith("http")) {
    // Download the image to the vault.
    const url = new URL(logo);
    logoPath = await createLogoResourcePath(url.pathname);
    const response = await requestUrl(logo);
    if (parseInt(response.status / 100) === 2) {
      await app.vault.adapter.writeBinary(logoPath, response.arrayBuffer);
    } else console.error({ status: response.status, headers: response.headers, url: logo})
  } else {
    // Copy the image into the vault.
    logoPath = await createLogoResourcePath(logo);
    const logoDest = `${app.vault.adapter.basePath}/${logoPath}`;
    fs.copyFileSync(logo, logoDest);
  }
}

const website = (await tp.system.prompt(`${finalName} website URL:`));
const itemWebsiteSearch = (await tp.system.prompt(`${finalName} item search URL; use \${name} for the URL encoded item name.`));
%>
tags: [ <% GardenBrands.tags.join(", ") %> ]
<%-* if (logo) { %>
logoOrigin: "<% logo %>"
logo: "<% logoPath %>"
<%-* } %>
<%-* if (website) { %>
website: "<% website %>"
<%-* } %>
<%-* if (itemWebsiteSearch) { %>
itemWebsiteSearch: "<% itemWebsiteSearch %>"
<%-* } %>
cssclasses:
  - hide-properties
---

<%-* if (logo) { %>
![[<% logoPath %>|200]]
<%-* } %>
<%-* if (website) { %>
[Website](<% website %>)
<%-* } %>
