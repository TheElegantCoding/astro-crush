<img src="./.github/asset/illustration/wave_header.svg" width="100%" />

<h1 id="top" align="center">
  <img src="./.github/asset/icon/astro.svg" width="28px" align="center" />
  Astro Crush
</h1>

<br />

<img src="./.github/asset/illustration/divider.svg" alt="divider" width="100%" />

<pre align="center">
  <a href="#installation">📦 SETUP</a> • <a href="#configuration">⚙️ CONFIGURATION</a>
</pre>

<img src="./.github/asset/illustration/divider.svg" alt="divider" width="100%" />

<img src="./.github/asset/illustration/astro_crush_cover.svg" width="100%" />

<br />

<div align="center">
  <img src="./.github/asset/illustration/eslint_badge.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/bun_badge.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/github_badge.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/typescript_badge.svg" height="34px" />&nbsp;&nbsp;&nbsp;
  <img src="./.github/asset/illustration/astro_badge.svg" height="34px" />&nbsp;&nbsp;&nbsp;
</div>

<img src="./.github/asset/illustration/divider.svg" alt="divider" width="100%" />

<h2 id="about">
  <img src="./.github/asset/icon/information.svg" width="24px" align="center"/>
  About
</h2>

<table border="0">
<tr>
<td>
Astro Crush is a specialized build-tool designed to aggressively optimize your Astro project's static output. It minifies CSS, HTML, and JS beyond standard defaults to ensure your site is as lightweight and fast as possible.
</td>
</tr>
</table>

<br />

<img src="./.github/asset/illustration/divider.svg" alt="divider" width="100%" />

<h2 id="table-of-content">
  <img src="./.github/asset/icon/book.svg" width="24px" align="center"/>
  Table of content
</h2>

- [<img src="./.github/asset/icon/information.svg" width="20px" align="center" /> About](#about)
- [<img src="./.github/asset/icon/thunder.svg" width="20px" align="center" /> Requirements](#requirements)
- [<img src="./.github/asset/icon/package.svg" width="20px" align="center" /> Installation](#installation)
- [<img src="./.github/asset/icon/rocket.svg" width="20px" align="center" /> Usage](#usage)
- [<img src="./.github/asset/icon/gear.svg" width="20px" align="center" /> Configuration](#configuration)

<br />

<img src="./.github/asset/illustration/divider.svg" alt="divider" width="100%" />

<h2 id="requirements">
  <img src="./.github/asset/icon/thunder.svg" width="24px" align="center" />
  Requirements
</h2>

- <img src="./.github/asset/icon/node.svg" width="20px" align="center" /> node >= **22.17.0**
- <img src="./.github/asset/icon/bun.svg" width="20px" align="center" /> bun >= **1.1.0**

<br />

<img src="./.github/asset/illustration/divider.svg" alt="divider" width="100%" align="center" />

<h2 id="installation">
  <img src="./.github/asset/icon/package.svg" width="24px" align="center" />
  Installation
</h2>

<h3><img src="./.github/asset/icon/bun.svg" width="24px" align="center" /> Bun</h3>

```bash
bun i -D astro-crush
```

<h3><img src="./.github/asset/icon/npm.svg" width="24px" align="center" /> Npm</h3>

```bash
npm i -D astro-crush
```

<h3><img src="./.github/asset/icon/pnpm.svg" width="24px" align="center" /> Pnpm</h3>

```bash
pnpm i -D astro-crush
```

<h3><img src="./.github/asset/icon/yarn.svg" width="24px" align="center" /> Yarn</h3>

```bash
yarn i -D astro-crush
```

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="usage">
  <img src="./.github/asset/icon/rocket.svg" width="24px" align="center" />
  Usage
</h2>

To use Astro Crush, simply add it to the astro config file:

```js
import { defineConfig } from 'astro/config';
import astroCrush from 'astro-crush'; 

export default defineConfig({
  integrations: [astroCrush()]
});
```

This will automatically minify your HTML, CSS, and JS files during the build process. For more advanced usage and configuration options, please refer to the [Configuration](#configuration) section below.

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<h2 id="configuration">
  <img src="./.github/asset/icon/gear.svg" width="24px" align="center" />
  Configuration
</h2>

you can customize the behavior of Astro Crush by passing options to the plugin function. Here are some of the available options:

```ts
import { defineConfig } from 'astro/config';
import astroCrush from 'astro-crush'; 

export default defineConfig({
  integrations: [astroCrush({
    disableCss: false, // Disable CSS minification
    disableHtml: false, // Disable HTML minification
    disableJavascript: false, // Disable JS minification
    cssOptions: {
      // CSS minification options (using lightningcss)
    },
    htmlOptions: {
      // HTML minification options (using html-minifier-terser)
    },
    jsOptions: {
      // JS minification options (using terser)
    }
  })]
});
```

<br />

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<pre align="center">
  <a href="#top">BACK TO TOP</a>
</pre>

<img 
  src="./.github/asset/illustration/divider.svg" 
  alt="divider" 
  width="100%" 
/>

<pre align="center">
  Copyright © All rights reserved,
  developed by LuisdaByte and
</pre>
<div align="center">
  <img src="./.github/asset/illustration/astralys_logo.svg" width="120px" align="center" />
</div>

<img src="./.github/asset/illustration/wave_footer.svg" width="100%" />