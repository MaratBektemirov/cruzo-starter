# cruzo-starter

Starter project for the `cruzo` framework.

This repository contains a demo/docs site with examples of:
- `AbstractComponent`, `AbstractService`
- `Rx`, `RxFunc`, `RxScope`
- template engine features (`{{ }}`, `::rx`, `repeat`, `attached`, `inner-html`)
- built-in UI components (`input`, `select`, `button-group`, `upload`, `spinner`, `modal`)

## Framework

Main framework repository: [MaratBektemirov/cruzo](https://github.com/MaratBektemirov/cruzo)

## Scripts

- `npm run dev:site` - run local dev server
- `npm run build:site` - build production site into `dist-site`

## GitHub Pages

This starter is configured for deployment via GitHub Actions (`.github/workflows/deploy.yml`).

Before first deploy:
1. Enable Pages in repository settings (`Settings -> Pages`)
2. Set Source to `GitHub Actions`
3. Push to `master`

