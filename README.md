## Intro
- plushogskolan.se
- teknikhogskolan.se
- affarshogskolan.se
- vardyrkeshogskolan.se

All four sites use the same code base, but with different themes.

## Dependencies
- Wordpress with an API-plugin `Plushogskolan-WordPress-Plugin`

## Install
```
npm install

npm run dev (change theme="ph/th/vh/ah" in package.json to use different themes)
```

### Build:
```
npm run build-all (to build single site: build-ph/th/vh/ah)

open http://localhost:1986
```

## Teman
Adjust less-variables for the sites in styles/[ah/ph/th/vh]-theme

## Config
- `/config.ah.js`
- `/config.ph.js`
- `/config.th.js`
- `/config.vh.js`
